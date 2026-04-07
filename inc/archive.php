<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.3
 * @since 0.3.0
 */

namespace OgreTemplate;

use \OgreTemplate\Article;

if (!defined('ABSPATH')) exit;

class Archive {

    public static function load() {
        add_filter('ogretemplate/archive_header_classes', [__CLASS__, 'header_classes'], 10, 4);
        add_filter('ogretemplate/archive/get_term_image', [__CLASS__, 'term_image_fallback'], 10, 3);
        add_filter('ogretemplate/article_image_opacity', [__CLASS__, 'term_opacity_fallback'], 10, 3);
    }

    static function header_classes($classes, $post_id, $post_type, $post) {
        if (!empty(self::get_image())) $classes[] = 'has-image';
        return $classes;
    }

    static function term_image_fallback($image, $term_id, $term) {
        if (empty($image) && !!($post_id = self::get_page_id(false))) {
            $image = Article::get_header_image($post_id);
        }
        return $image;
    }

    static function term_opacity_fallback($opacity, $image, $post_id) {
        if (!!($post_id = self::get_page_id(false)) && is_numeric(get_field('page_image_opacity', $post_id))) {
            $opacity = get_field('page_image_opacity', $post_id);
        }
        if ((is_category() || is_tax() || is_tag()) && is_object($term = get_queried_object()) && is_a($term, 'WP_Term')) {
            if (is_numeric(get_field('page_image_opacity', $term))) {
                $opacity = get_field('page_image_opacity', $term);
            } else if (!!($post_id = self::get_page_id(true)) && is_numeric(get_field('page_image_opacity', $post_id))) {
                $opacity = get_field('page_image_opacity', $post_id);
            }
        }
        return $opacity;
    }

    // Public Functions

    public static function get_type() {
        $type = 'default';

        if (is_category()) $type = 'category';
        if (is_tax()) $type = 'taxonomy';
        if (is_tag()) $type = 'tag';
        if (is_search()) $type = 'search';
        if (is_author()) $type = 'author';
        if (is_home()) $type = 'home';
        if (is_singular() || is_404()) $type = 'single';

        return apply_filters('ogretemplate/archive/get_type', $type);
    }

    public static function get_title() {
        $title = \Ogre::get_the_archive_title();
        return apply_filters('ogretemplate/archive/get_title', $title);
    }

    public static function get_subtitle() {
        $subtitle = \Ogre::get_the_archive_subtitle();
        return apply_filters('ogretemplate/archive/get_subtitle', $subtitle);
    }

    public static function get_link() {
        return apply_filters('ogretemplate/archive/get_link', []);
    }

    public static function get_image() {
        $image = false;

        $type = self::get_type();
        switch ($type) {
            case 'category':
            case 'taxonomy':
            case 'tag':
                $image = self::get_term_image();
                break;
            case 'author':
                $image = get_field('image', 'user_' . get_queried_object_id());
                break;
            case 'home':
                $post_id = self::get_page_id(true);
                $image = get_field('page_image', $post_id);
                if (empty($image)) $image = \Ogre::get_post_thumbnail_acf($post_id);
                break;
        }

        return apply_filters('ogretemplate/archive/get_image', $image, $type);
    }

    private static function get_term_image($term_id = false) {
        if ($term_id === false) $term_id = get_queried_object_id();

        $term = get_term($term_id);
        if (!$term) return false;

        $image = get_field('image', sprintf('term_%d', $term_id));

        if (empty($image) && $term->parent > 0) $image = self::get_term_image($term->parent);

        return apply_filters('ogretemplate/archive/get_term_image', $image, $term_id, $term);
    }

    public static function get_tag_id() {
        $id = 'archive-0';

        $type = self::get_type();
        switch ($type) {
            case 'category':
            case 'taxonomy':
            case 'tag':
                $id = 'term-' . get_queried_object_id();
                break;
            case 'author':
                $id = 'user-' . get_queried_object_id();
                break;
            case 'home':
                $id = 'post-' . intval(get_option('page_for_posts'));
                break;
        }

        return apply_filters('ogretemplate/archive/get_tag_id', $id, $type);
    }

    public static function get_content() {
        $content = '';

        $type = self::get_type();
        switch ($type) {
            case 'category':
            case 'taxonomy':
            case 'tag':
                $content = term_description();
                break;
            case 'author':
                $content = get_the_author_meta('description', get_queried_object_id());
                break;
            case 'home':
                if (!is_paged()) {
                    global $post;
                    $post = get_post(intval(get_option('page_for_posts')));
                    setup_postdata($post);
                    ob_start();
                    the_content();
                    $content = ob_get_contents();
                    ob_end_clean();
                    wp_reset_postdata();
                }
                break;
        }

        return apply_filters('ogretemplate/archive/get_content', $content, $type);
    }

    public static function get_active_sidebar() {
        return apply_filters('ogretemplate/archive/active_sidebar', 'primary');
    }

    public static function has_aside() {
        $sidebar_id = self::get_active_sidebar();
        return apply_filters('ogretemplate/archive/has_aside', is_active_sidebar($sidebar_id));
    }

    public static function the_sidebar(bool $force = false):bool {
        if (!\OgreTemplate\Archive::has_aside() && !$force) return false;
        if (get_sidebar(\OgreTemplate\Archive::get_active_sidebar()) === false) return false;
        return true;
    }

    public static function get_page_id($force_home = false, $post_id = false) {
        if ($post_id !== false && get_post_type($post_id) === 'page') return $post_id; // For passthrough

        global $post;
        if (!isset($post_id)) $post_id = false;
        if (!is_null($post) && is_a($post, 'WP_Post')) $post_id = $post->ID;

        if ((is_home() || !!$force_home) && is_numeric(get_option('page_for_posts'))) {
            $post_id = intval(get_option('page_for_posts'));
        }

        $post_id = apply_filters('ogretemplate/archive/get_page_id', $post_id, $force_home);
        return is_numeric($post_id) && get_post_type($post_id) === 'page' ? intval($post_id) : false;
    }

    public static function get_sidebar($sidebar_id = '', $classes = [], $id = '', $echo = true) {
        if (empty($sidebar_id)) $sidebar_id = self::get_active_sidebar();
        if (!is_active_sidebar($sidebar_id)) return !!$echo ? false : '';

        if (is_string($classes)) $classes = [$classes];
        if (!is_array($classes)) $classes = [];
        $classes = array_merge([
            'sidebar',
            sprintf('sidebar-%s', $sidebar_id),
            'widget-area',
        ], $classes);
        $classes = apply_filters('ogretemplate/archive/sidebar_classes', $classes, $sidebar_id);
        $classes = array_map('sanitize_html_class', $classes);
        
        ob_start();
        dynamic_sidebar($sidebar_id);
        $html = ob_get_clean();
        if (empty($html)) return !!$echo ? false : '';

        $attrs = [
            'class' => implode(' ', $classes),
            'role' => 'complimentary',
        ];
        if (!empty($id)) $attrs['id'] = $id;
        $attrs = apply_filters('ogretemplate/archive/sidebar_attributes', $attrs, $sidebar_id);
        $attrs = implode(' ', array_map(function ($name, $value) {
            return sprintf('%s="%s"', esc_attr(sanitize_title($name)), esc_attr($value));
        }, array_keys($attrs), array_values($attrs)));

        $html = apply_filters('ogretemplate/archive/sidebar_output', sprintf(
            '<aside %s>%s</aside>',
            $attrs,
            $html
        ));

        if (!!$echo) echo $html;
        return !!$echo ? true : $html;
    }

}

\OgreTemplate\Archive::load();
