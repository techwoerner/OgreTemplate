<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.3
 * @since 0.1.0
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

use \OgreTemplate\Article;

class Blocks {

    public static function load() {
        add_action('after_setup_theme', [__CLASS__, 'setup']);
        add_filter('ogre/blocks', [__CLASS__, 'blocks'], 10, 1);
        add_action('enqueue_block_editor_assets', [__CLASS__, 'editor_style'], 22);
        add_action('enqueue_block_editor_assets', [__CLASS__, 'editor_script'], 23);
        add_filter('upload_mimes', [__CLASS__, 'allow_js']);

        // Image Ratio Control
        add_action('enqueue_block_editor_assets', [__CLASS__, 'ratio_editor_script'], 24);

        // Subtitle Block
        add_action('init', [__CLASS__, 'register_subtitle_block']);
        add_filter('ogre/editor_field_group', [__CLASS__, 'remove_subtitle_field'], 10, 2);
        add_filter('register_post_type_args', [__CLASS__, 'page_subtitle_template'], 10, 2);

        // Icon Block
        add_filter('ogre/font_size_field_keys', [__CLASS__, 'add_icon_font_size_key'], 10, 1);

        // Sidebar Block
        add_filter('acf/load_field/key=field_6346e0d3f05aa', [__CLASS__, 'load_sidebar_choices'], 10, 1);

        add_filter('ogre/scripts', [__CLASS__, 'add_maplibre_gl_script'], 10, 1);
    }

    static function setup() {
        add_theme_support('customize-selective-refresh-widgets');
        add_theme_support('wp-block-styles');
        add_theme_support('align-wide');
        add_theme_support('responsive-embeds');

        add_theme_support('editor-styles');
        //add_editor_style('./assets/sass/style-editor.css');

        // NOTE: Experimental support
        add_theme_support('custom-line-height', false);
        add_theme_support('disable-custom-gradients', true);
        add_theme_support('disable-custom-colors', true);
        add_theme_support('disable-custom-font-sizes', true);
        add_theme_support('experimental-link-color', false);
        add_theme_support('custom-spacing', false);
    }

    static function blocks($blocks) {
        $block_names = wp_list_pluck($blocks, 'name');

        if (!in_array('map', $block_names)) {
            $blocks[] = [
                'name' => 'map',
                'title' => __('Map (Leaflet)', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'admin-site',
                'description' => __('Display a leaflet either as a single location marker with address information or using geojson data.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => false,
                'mode' => false,
            ];
        }

        if (!in_array('map-gl', $block_names)) {
            $blocks[] = [
                'name' => 'map-gl',
                'title' => __('Map (GL)', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'admin-site',
                'description' => __('Display a MapLibre GL map.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => false,
                'mode' => false,
            ];
        }

        if (!in_array('menu', $block_names)) {
            $blocks[] = [
                'name' => 'menu',
                'title' => __('Navigation Menu', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'list-view',
                'description' => __('Display a navigation menu in your content.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => false,
                'mode' => 'preview',
            ];
        }

        if (!in_array('texture', $block_names)) {
            $blocks[] = [
                'name' => 'texture',
                'title' => __('Texture', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'editor-unlink',
                'description' => __('Displays a transparent image over the content styled using the settings selected.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => false,
                'mode' => 'preview',
            ];
        }

        if (!in_array('reveal', $block_names)) {
            $blocks[] = [
                'name' => 'reveal',
                'title' => __('Reveal', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'admin-appearance',
                'description' => __('Use simple reveal animations with a group of blocks.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => true,
                'mode' => 'preview',
                'inner_blocks' => true,
                /* // Non-functioning in ACF 5.9.6
                'transforms' => [[
                    'blocks' => '*',
                    'isMultiBlock' => true,
                    'function' => 'transformToReveal',
                ]], */
            ];
        }

        if (!in_array('parallax', $block_names)) {
            $blocks[] = [
                'name' => 'parallax',
                'title' => __('Parallax', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'image-flip-vertical',
                'description' => __('Apply parallax scrolling on content. Acts as a group', wp_get_theme(get_template())->get('TextDomain')),
                'align' => true,
                'mode' => 'preview',
                'inner_blocks' => true,
            ];
        }

        if (!in_array('parallax-image', $block_names)) {
            $blocks[] = [
                'name' => 'parallax-image',
                'title' => __('Parallax Background', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'format-image',
                'description' => __('Display an image with parallax scrolling in the background.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => true,
                'mode' => 'preview',
            ];
        }

        if (!in_array('pico-8', $block_names)) {
            $blocks[] = [
                'name' => 'pico-8',
                'title' => __('PICO-8', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'games',
                'align' => true,
                'aligncontent' => true,
                'mode' => false,
            ];
        }

        if (!in_array('icon', $block_names)) {
            $blocks[] = [
                'name' => 'icon',
                'title' => __('Icon', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'buddicons-tracking',
                'align' => true,
                'align_text' => true,
                'color' => true,
                'mode' => false,
            ];
        }

        if (!in_array('sidebar', $block_names)) {
            $blocks[] = [
                'name' => 'sidebar',
                'title' => __('Sidebar', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'welcome-widgets-menus',
                'description' => __('Display a widgets area.', wp_get_theme(get_template())->get('TextDomain')),
                'align' => false,
                'align_text' => false,
                'mode' => 'preview',
            ];
        }

        if (!in_array('slider', $block_names)) {
            $blocks[] = [
                'name' => 'slider',
                'title' => __('Slider', wp_get_theme(get_template())->get('TextDomain')),
                'icon' => 'slides',
                'description' => __('Group elements into a slider!', wp_get_theme(get_template())->get('TextDomain')),
                'align' => true,
                'mode' => 'preview',
                'inner_blocks' => true,
            ];
        }

        return $blocks;
    }

    static function editor_style() {
        wp_enqueue_style(
            wp_get_theme(get_template())->get('TextDomain') . '-editor',
            get_template_directory_uri() . '/assets/sass/style-editor.css',
            [
                'ogrecore-editor',
            ],
            wp_get_theme(get_template())->get('Version'),
            'all'
        );
    }

    static function editor_script() {
        wp_enqueue_script(
            wp_get_theme(get_template())->get('TextDomain') . '-editor',
            get_template_directory_uri() . '/assets/js/editor.js',
            [
                'wp-blocks',
                'ogrecore-editor',
            ],
            wp_get_theme(get_template())->get('Version'),
            true
        );
    }

    static function allow_js($mimes) {
        $mimes['js'] = 'text/plain'; // Required to upload PICO-8 games
        return $mimes;
    }

    static function ratio_editor_script() {
        $dep_editor = 'wp-editor';
        if (function_exists('get_current_screen') && is_a($screen = get_current_screen(), '\WP_Screen')) {
            if (!$screen->is_block_editor) return;
            if ($screen->id == 'widgets') {
                $dep_editor = 'wp-edit-widgets';
            }
        }
        $deps = [
            'wp-blocks',
            'wp-i18n',
            'wp-element',
            'wp-components',
            $dep_editor,
            'ogrecore-editor',
            wp_get_theme(get_template())->get('TextDomain') . '-editor',
        ];

        wp_enqueue_script(
            wp_get_theme(get_template())->get('TextDomain') . '-editor-ratio',
            get_template_directory_uri() . '/assets/js/editor-ratio.js',
            $deps,
            wp_get_theme(get_template())->get('Version'),
            true
        );
    }

    static function register_subtitle_block() {
        if (!function_exists('register_block_type')) return;

        $post_types = Article::get_subtitle_post_types();
        foreach ($post_types as $post_type) {
            add_post_type_support($post_type, 'custom-fields');
            register_post_meta($post_type, 'page_subtitle', [
                'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
            ]);
        }

        if (strpos($_SERVER['REQUEST_URI'], '/wp-admin/post.php') === 0 && isset($_REQUEST['post']) && !in_array(get_post_type(intval($_REQUEST['post'])), $post_types)) {
            return;
        }

        wp_register_script(
            wp_get_theme(get_template())->get('TextDomain') . '-block-subtitle',
            get_template_directory_uri() . '/assets/js/block-subtitle.js',
            [
                'wp-blocks',
                'wp-element',
                'wp-data',
                'wp-core-data',
                'wp-i18n',
                'ogrecore-editor',
                wp_get_theme(get_template())->get('TextDomain') . '-editor',
            ],
            wp_get_theme(get_template())->get('Version'),
            true
        );

        register_block_type(wp_get_theme(get_template())->get('TextDomain') . '/subtitle', [
            'api_version' => 2,
            'editor_script' => wp_get_theme(get_template())->get('TextDomain') . '-block-subtitle',
            'render_callback' => '__return_false',
        ]);
    }

    static function remove_subtitle_field($field_group, $post_types) {
        if (!function_exists('register_block_type') || !isset($field_group['fields'])) return;
        foreach ($field_group['fields'] as $key => $field) {
            if ($field['name'] !== 'page_subtitle') continue;
            unset($field_group['fields'][$key]);
            break;
        }
        $field_group['fields'] = array_values($field_group['fields']);
        return $field_group;
    }

    static function page_subtitle_template($args, $post_type) {
        $post_types = Article::get_subtitle_post_types();
        if (!in_array($post_type, $post_types)) return $args;

        if (!isset($args['template'])) $args['template'] = [];
        if (!in_array('ogretemplate/subtitle', wp_list_pluck($args['template'], 0))) {
            $args['template'] = [['ogretemplate/subtitle'], ['core/paragraph']] + $args['template'];
        }

        if (!isset($args['template_lock'])) $args['template_lock'] = false;

        return $args;
    }

    static function add_icon_font_size_key($field_keys) {
        if (!in_array('field_62ffd7088f050', $field_keys)) $field_keys[] = 'field_62ffd7088f050';
        return $field_keys;
    }

    private static function get_sidebars() {
        if (!isset($GLOBALS['wp_registered_sidebars']) || empty($GLOBALS['wp_registered_sidebars'])) return [];
        return wp_list_pluck($GLOBALS['wp_registered_sidebars'], 'name', 'id');
    }
    static function load_sidebar_choices($field) {
        $field['choices'] = self::get_sidebars();
        return $field;
    }

    public static function add_maplibre_gl_script($scripts) {
        if (!!apply_filters('ogretemplate/include_maplibre_gl_script', is_singular() && has_block('map-gl'))) {
            $scripts[] = [
                'type' => 'script',
                'name' => 'maplibre-gl',
                'href' => 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js',
            ];
            $scripts[] = [
                'type' => 'style',
                'name' => 'maplibre-gl',
                'href' => 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css',
            ];
        }
        return $scripts;
    }

}

Blocks::load();
