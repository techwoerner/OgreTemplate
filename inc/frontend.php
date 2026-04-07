<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.1.0
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

class Frontend {

    public static function load() {
        add_action('init', [__CLASS__, 'fix_59']);
        add_action('pre_get_posts', [__CLASS__, 'page_for_posts_query']);
        add_action('ogretemplate/wp_head', [__CLASS__, 'meta_tags'], 50);
        add_action('ogretemplate/wp_head', 'wp_head', 100);
    }

    private static $handle = 'global-styles';
    private static $priority = 0;
    static function fix_59() {
        // WP 5.9 only and not supporting theme.json
        if (!function_exists('wp_get_global_stylesheet') || get_theme_support('ogre/theme-json')) return;

        remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
        add_action('wp_enqueue_scripts', [__CLASS__, 'fix_59_enqueue'], (int)self::$priority);
        add_filter('block_editor_settings_all', [__CLASS__, 'fix_59_get_editor_settings_mod']);
    }
    static function fix_59_enqueue() {
        $stylesheet = self::fix_59_get_css_mod(wp_get_global_stylesheet());
        if (empty($stylesheet)) return;

        wp_register_style(self::$handle, false);
        wp_add_inline_style(self::$handle, $stylesheet);
        wp_enqueue_style(self::$handle);
    }
    static function fix_59_get_editor_settings_mod(array $editor_settings):array {
        if (empty($editor_settings['styles']) || !is_array($editor_settings['styles'])) return $editor_settings;

        $editor_settings['styles'] = array_map(static function ($style) {
            if (!empty($style['css'])) $style['css'] = self::fix_59_get_css_mod($style['css']);
            return $style;
        }, $editor_settings['styles']);

        return $editor_settings;
    }
    private static function fix_59_get_css_mod(string $css):string {
        return str_replace(
            ['body', '!important', ' ;'],
            [':root', '', ';'],
            $css
        );
    }

    static function page_for_posts_query($query) {
        if (!$query->is_main_query() || !$query->is_home()) return;

        if ('page' != get_option('show_on_front')) return;

        if (!get_theme_support('ogre/query-block')) return;

        $post_id = get_option('page_for_posts');
        if (!is_numeric($post_id)) return;
        $post_id = intval($post_id);

        $query->parse_query([
            'post_type' => 'page',
            'p' => $post_id,
            'page_id' => $post_id,
        ]);
        $query->is_page = true;
        $query->is_home = false;
        $query->is_posts_page = false;
        $query->is_single = false;
    }

    static function meta_tags() {
        if (apply_filters('ogretemplate/wp_head/output_charset', true)) {
            printf(
                '<meta charset="%s">',
                esc_attr(get_bloginfo('charset'))
            );
        }

        if (apply_filters('ogretemplate/wp_head/output_viewport', true)) {
            printf(
                '<meta name="viewport" content="%s">',
                esc_attr(apply_filters('ogretemplate/wp_head/viewport', 'width=device-width, height=device-height, initial-scale=1'))
            );
        }

        echo '<link rel="profile" href="http://gmpg.org/xfn/11">';

        if (is_singular() && pings_open(get_queried_object())) {
            printf(
                '<link rel="pingback" href="%s">',
                esc_attr(get_bloginfo('pingback_url'))
            );
        }
    }

}

Frontend::load();
