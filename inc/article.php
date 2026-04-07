<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.2
 * @since 0.3.0
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

class Article {

    public static function load() {
        add_filter('ogretemplate/article_header_classes', [__CLASS__, 'header_classes'], 10, 4);
        add_filter('ogretemplate/palette_field_keys', [__CLASS__, 'register_palette_fields'], 10, 1);
        add_action('wp_head', [__CLASS__, 'output_style'], 9);
        add_filter('body_class', [__CLASS__, 'body_classes'], 10, 1);
        add_filter('ogretemplate/article_header_subtitle', [__CLASS__, 'page_subtitle'], 10, 2);
        add_filter('ogretemplate/article_header_link', [__CLASS__, 'page_link'], 10, 2);
        add_filter('ogretemplate/article_header_image', [__CLASS__, 'header_image'], 10, 2);
        add_filter('ogretemplate/article_header_image_args', [__CLASS__, 'header_image_args'], 10, 3);
        add_action('wp_head', [__CLASS__, 'disable_header'], 20);
    }

    static function header_classes($classes, $post_id, $post_type, $post) {
        if (!in_array('has-image', $classes) && !empty(self::has_header_image($post_id))) $classes[] = 'has-image';
        return $classes;
    }

    // Background/Text Color

    static function register_palette_fields($keys) {
        $keys[] = 'field_60f97b2c11c8b'; // page_background_color
        $keys[] = 'field_618d3402f6de6'; // page_text_color
        return $keys;
    }

    static function output_style() {
        if (is_admin() || !is_page()) return;

        $background_color = get_field('page_background_color');
        $text_color = get_field('page_text_color');
        if (empty($background_color) && empty($text_color)) return;

        printf('<style type="text/css" id="%s-page">:root {', wp_get_theme(get_template())->get('TextDomain'));
        if (!empty($background_color)) printf('--global--color-background: var(--global--color-%1$s); --global--color-background-rgb: var(--global--color-%1$s-rgb);', $background_color);
        if (!empty($text_color)) printf('--global--color-text: var(--global--color-%1$s); --global--color-text-rgb: var(--global--color-%1$s-rgb)', $text_color);
        echo '}</style>';
    }

    static function body_classes($classes) {
        if (is_admin() || !is_page()) return $classes;

        $background_color = get_field('page_background_color');
        if (!empty($background_color)) {
            $classes[] = 'has-page-text-color';
            $classes[] = sprintf('has-%s-page-color', $background_color);
        }

        $text_color = get_field('page_text_color');
        if (!empty($background_color)) {
            $classes[] = 'has-page-background-color';
            $classes[] = sprintf('has-%s-page-background-color', $background_color);
        }

        return $classes;
    }

    // Subtitle

    static function page_subtitle($subtitle, $post_id) {
        if (is_singular(self::get_subtitle_post_types()) || (is_404() && get_post_type($post_id) == 'page')) $subtitle = get_field('page_subtitle', $post_id);
        if (is_home() && in_array('page', self::get_subtitle_post_types())) $subtitle = get_field('page_subtitle', intval(get_option('page_for_posts')));
        return $subtitle;
    }

    // Link

    static function page_link($link, $post_id) {
        if (is_singular(\OgreCore\Editor::get_settings_post_types()) || (is_404() && get_post_type($post_id) == 'page')) $link = get_field('page_link', $post_id);
        if (is_home()) $link = get_field('page_link', intval(get_option('page_for_posts')));
        return $link;
    }

    // Header Image

    static function header_image($image, $post_id) {
        $_image = get_field('page_image', $post_id);
        if (((!is_single() && !is_page() && !is_404()) || !empty($image)) && empty($_image)) return $image;
        if (!empty($_image)) $image = $_image;
        return $image;
    }

    static function header_image_args($args, $image, $post_id) {
        if (!isset($args['class'])) $args['class'] = '';
        if (!isset($args['style'])) $args['style'] = '';

        $opacity = get_field('page_image_opacity', $post_id);
        $opacity = apply_filters('ogretemplate/article_image_opacity', $opacity, $image, $post_id);
        if (is_numeric($opacity) && intval($opacity) < 100 && intval($opacity) > 0) {
            $args['class'] .= sprintf(' has-opacity has-opacity-%d', intval($opacity));
            $args['style'] .= sprintf(' --article--image--opacity: %.2f;', floatval($opacity) / 100);
        }

        return $args;
    }

    // Remove Article Header

    static function disable_header() {
        if (!!self::header_enabled()) return;
        \Ogre::remove_actions('ogre/article', 0, 99);
    }

    // Public Functions

    public static function get_meta($post_id = false) {
        if ($post_id === false) $post_id = get_the_ID();
        if (is_a($post_id, 'WP_Post')) $post_id = $post_id->ID;
        if (is_string($post_id) && is_numeric($post_id)) $post_id = intval($post_id);
        if (!is_int($post_id)) return false;

        $items = [];

        // Terms
        $taxonomies = self::get_meta_taxonomies($post_id);

        $terms = [];
        if (is_array($taxonomies) && !empty($taxonomies)) {
            foreach ($taxonomies as $taxonomy) {
                if (!taxonomy_exists($taxonomy)) continue;
                $_terms = wp_get_post_terms($post_id, $taxonomy);
                $_terms = apply_filters('ogretemplate/article_meta_terms', $_terms, $taxonomy, $post_id);
                if (!is_wp_error($_terms) && is_array($_terms) && !empty($_terms)) {
                    $terms = array_merge($terms, $_terms);
                }
            }
        }
        if (empty($terms)) $terms = false;

        if ($terms !== false && is_array($terms) && !empty($terms)) {
            foreach ($terms as $term) {
                if (!is_a($term, 'WP_Term')) continue;
                $items[$term->slug] = apply_filters('ogretemplate/article_meta_term_item', [
                    'class' => 'term',
                    'text' => $term->name,
                    'url' => get_term_link($term),
                    'title' => sprintf(__('View all posts in %s', wp_get_theme(get_template())->get('TextDomain')), $term->name),
                    'target' => '_self',
                ], $term, $post_id);
            }
        }

        // Date
        if (apply_filters('ogretemplate/article_meta_include_date_archive', get_post_type($post_id) != 'page', $post_id)) {
            $items['date'] = [
                'class' => 'date',
                'text' => get_the_time(get_option('date_format'), $post_id),
                'url' => get_month_link(get_the_time('Y', $post_id), get_the_time('m', $post_id)),
                'title' => __('View other posts in this month', wp_get_theme(get_template())->get('TextDomain')),
                'target' => '_self',
            ];
        }

        $items = apply_filters('ogretemplate/article_meta_items', $items, $post_id);
        $items = array_filter($items);

        return !empty($items) ? $items : false;
    }
    public static function the_meta($post_id = false, $class = false, $echo = true) {
        $meta = false;
        if (is_array($post_id)) {
            $meta = $post_id;
        } else {
            $meta = self::get_meta($post_id);
        }
        if (!is_array($meta) || empty($meta)) return false;

        $html = sprintf('<ul class="entry-meta%s">', !empty($class) ? ' ' . $class : '');
        foreach ($meta as $key => $item) {
            if (is_array($item)) {
                $class = sanitize_title($item['class']);
                $classes = isset($item['classes']) && is_array($item['classes']) && !empty($item['classes']) ? ' ' . implode(' ', array_map('sanitize_title', $item['classes'])) : '';
                if (isset($item['url']) && wp_http_validate_url($item['url'])) {
                    $html .= sprintf(
                        '<li class="entry-meta__item entry-%s"><a class="entry-meta__link entry-link%s" href="%s" title="%s" target="%s">%s</a></li>',
                        esc_attr($class),
                        esc_attr($classes),
                        esc_url($item['url']),
                        esc_attr($item['title']),
                        esc_attr(isset($item['target']) && !empty($item['target']) ? $item['target'] : '_self'),
                        wp_kses_post($item['text'])
                    );
                } else {
                    $html .= sprintf(
                        '<li class="entry-meta__item entry-%s%s">%s</li>',
                        esc_attr($class),
                        esc_attr($classes),
                        wp_kses_post($item['text'])
                    );
                }
            } else if (is_string($key) && is_string($item)) {
                $html .= sprintf(
                    '<li class="entry-meta__item entry-%s">%s</li>',
                    esc_attr(sanitize_title($key)),
                    wp_kses_post($item)
                );
            } else if (is_string($item)) {
                $html .= sprintf(
                    '<li class="entry-meta__item">%s</li>',
                    wp_kses_post($item)
                );
            }
        }
        $html .= '</ul>';

        if (!!$echo) {
            echo $html;
            return true;
        } else {
            return $html;
        }
    }

    public static function header_enabled() {
        if (is_admin() && !defined('DOING_AJAX')) return false;

        $enabled = true;
        if (is_singular(\OgreCore\Editor::get_settings_post_types())) $enabled = get_field('page_title_display') === true || is_null(get_field('page_title_display'));
        $enabled = apply_filters('ogretemplate/article_header_enabled', $enabled);

        return $enabled;
    }

    public static function get_navigation_items($post_id = false) {
        if (is_a($post_id, '\WP_Post')) $post_id = $post_id->ID;
        if (is_string($post_id) && is_numeric($post_id)) $post_id = intval($post_id);
        if ($post_id === false) $post_id = get_the_ID();
        if (!is_int($post_id)) return false;

        $items = [
            'previous' => self::get_previous_post_link($post_id),
            'next' => self::get_next_post_link($post_id),
        ];
        $items = array_filter($items);

        return apply_filters('ogretemplate/article_navigation_items', $items, $post_id);
    }

    public static function get_related($post_id = false, $count = 3, $args = []) {
        if (is_a($post_id, '\WP_Post')) $post_id = $post_id->ID;
        if (is_string($post_id) && is_numeric($post_id)) $post_id = intval($post_id);
        if ($post_id === false) $post_id = get_the_ID();
        if (!is_int($post_id)) return false;

        $args = array_merge([
            'post_type' => get_post_type($post_id),
            'post__not_in' => [$post_id],
            'offset' => 0,
            'posts_per_page' => $count,
            'order' => 'ASC',
            'orderby' => 'rand',
        ], $args);
        $posts = [];

        $terms = self::get_meta_terms($post_id);
        if (!empty($taxonomies)) {
            $args['tax_query'] = ['relation' => 'OR'];
            foreach ($terms as $taxonomy => $_terms) {
                $args['tax_query'][] = [
                    'taxonomy' => $taxonomy,
                    'field' => 'term_id',
                    'terms' => wp_list_pluck($_terms, 'term_id'),
                    'include_children' => true
                ];
            }
            $posts = get_posts($tax_args);
        }

        if (count($posts) < $count) {
            if (isset($args['tax_query'])) unset($args['tax_query']);
            $args['posts_per_page'] = $count - count($posts);
            $posts = array_merge($posts, get_posts($args));
        }

        return !empty($posts) ? $posts : false;
    }

    public static function get_meta_taxonomies($post_id = false) {
        if ($post_id === false) $post_id = get_the_ID();
        $taxonomies = apply_filters('ogretemplate/article_meta_taxonomy', get_post_type($post_id) != 'post' ? get_post_type($post_id) . '_category' : 'category', $post_id);
        if (is_string($taxonomies) && !empty($taxonomies)) $taxonomies = [$taxonomies];
        if (!is_array($taxonomies)) return false;
        return $taxonomies;
    }
    public static function get_meta_taxonomy($post_id = false) {
        $taxonomies = self::get_meta_taxonomies($post_id);
        if (is_string($taxonomies) && !empty($taxonomies)) return $taxonomies;
        if (is_array($taxonomies) && !empty($taxonomies)) return array_values($taxonomies)[0];
        return false;
    }
    public static function get_meta_terms($post_id = false) {
        if ($post_id === false) $post_id = get_the_ID();

        $taxonomies = self::get_meta_taxonomies($post_id);
        if (!is_array($taxonomies) || empty($taxonomies)) return false;

        $terms = [];
        foreach ($taxonomies as $taxonomy) {
            if (!taxonomy_exists($taxonomy)) continue;

            $terms[$taxonomy] = apply_filters('ogretemplate/article_meta_terms', wp_get_post_terms($post_id, $taxonomy), $taxonomy, $post_id);
        }

        $terms = array_filter($terms, function ($terms) {
            return !is_wp_error($terms) && is_array($terms) && !empty($terms);
        });
        if (empty($terms)) return false;

        return $terms;
    }

    public static function get_header_image($post_id = false, $image = false) {
        if (is_a($post_id, '\WP_Post')) $post_id = $post_id->ID;
        if (is_string($post_id) && is_numeric($post_id)) $post_id = intval($post_id);
        if ($post_id === false) {
            global $post;
            if (!is_null($post) && is_a($post, 'WP_Post')) $post_id = $post->ID;
            if (is_home() && is_numeric(get_option('page_for_posts'))) $post_id = intval(get_option('page_for_posts'));
        }
        if (!is_int($post_id) || $post_id <= 0) return $image;

        if ((!isset($image) || empty($image)) && (is_singular() || is_404()) && !!apply_filters('ogretemplate/article_header_image/use_thumbnail', true, $post_id)) {
            if (!has_post_thumbnail() || !class_exists('\Ogre')) $image = false;
            else $image = \Ogre::get_post_thumbnail_acf();
        }

        $image = apply_filters('ogretemplate/article_header_image', $image, $post_id);
        if (empty($image)) return false;

        return $image;
    }
    public static function has_header_image($post_id = false, $image = false) {
        return !empty(self::get_header_image($post_id, $image));
    }

    public static function get_subtitle_post_types() {
        return apply_filters('ogretemplate/article_subtitle_post_types', \OgreCore\Editor::get_settings_post_types());
    }

    // Private Functions

    private static function get_previous_post_link($post_id = false, $taxonomy = false) {
        if ($post_id === false) $post_id = get_the_ID();
        if ($taxonomy === false) $taxonomy = self::get_meta_taxonomy($post_id);

        $format = apply_filters('ogretemplate/article_previous_post_link_format', '%title', $post_id);
        return apply_filters('ogretemplate/article_previous_post_link', get_previous_post_link(
            '%link',
            $format,
            apply_filters('ogretemplate/article_post_link_in_same_term', true, $post_id, $taxonomy),
            '',
            $taxonomy
        ), $post_id);
    }
    private static function get_next_post_link($post_id = false, $taxonomy = false) {
        if ($post_id === false) $post_id = get_the_ID();
        if ($taxonomy === false) $taxonomy = self::get_meta_taxonomy($post_id);

        $format = apply_filters('ogretemplate/article_next_post_link_format', '%title', $post_id);
        return apply_filters('ogretemplate/article_next_post_link', get_next_post_link(
            '%link',
            $format,
            apply_filters('ogretemplate/article_post_link_in_same_term', true, $post_id, $taxonomy),
            '',
            $taxonomy
        ), $post_id);
    }

}

\OgreTemplate\Article::load();
