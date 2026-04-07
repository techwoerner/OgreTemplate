<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.3
 * @since 0.1.0
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

class Theme {

    public static function load() {
        add_action('after_setup_theme', [__CLASS__, 'setup']);
        add_filter('ogre/featured_post_types', [__CLASS__, 'featured_post_types'], 10, 1);
        add_action('widgets_init', [__CLASS__, 'widgets_init']);
        if (!is_admin()) add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue'], 21);
        add_filter('ogre/color_palette', [__CLASS__, 'color_palette'], 10, 1);
        add_filter('ogre/font_sizes', [__CLASS__, 'font_sizes'], 10, 1);
        add_filter('image_size_names_choose', [__CLASS__, 'add_image_sizes'], 10, 1);
        add_filter('ogre/page_settings_post_types', [__CLASS__, 'settings_post_types'], 10, 1);
        add_filter('ogre/default_gutenberg_assets', '__return_true', 10, 1);
        add_filter('block_editor_settings_all', [__CLASS__, 'editor_settings'], 10, 2);
        add_filter('body_class', [__CLASS__, 'theme_support_body_classes'], 10, 1);
    }

    static function setup() {
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        set_post_thumbnail_size(256, 256, true);

        register_nav_menus([
            'primary' => __('Primary Menu', wp_get_theme(get_template())->get('TextDomain')),
            'secondary' => __('Secondary Menu', wp_get_theme(get_template())->get('TextDomain')),
            'mobile' => __('Mobile Menu', wp_get_theme(get_template())->get('TextDomain')),
            'social' => __('Social Menu', wp_get_theme(get_template())->get('TextDomain')),
            'footer' => __('Footer Menu', wp_get_theme(get_template())->get('TextDomain')),
        ]);

        add_theme_support('html5', [
            'search-form',
            'gallery',
            'caption',
        ]);

        add_image_size('extra-large', 2048, 2048);
    }

    static function featured_post_types($post_types) {
        $post_types[] = 'post';
        return $post_types;
    }

    public static function register_sidebar(array $args) {
        if (!isset($args['name']) || !isset($args['id'])) return false;

        $defaults = [
            'name' => '',
            'id' => '',
            'description' => sprintf(__('The %s sidebar.', wp_get_theme(get_template())->get('TextDomain')), $args['name']),
            'class' => sprintf('sidebar sidebar-%s', sanitize_title($args['id'])),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget' => '</section>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        ];
        if (get_theme_support('ogre/widget-blocks')) {
            $defaults = array_merge($defaults, [
                'before_widget' => '',
                'after_widget' => '',
                'before_title' => '<span class="screen-reader-text">',
                'after_title' => '</span>',
            ]);
        }

        $args = wp_parse_args($args, $defaults);
        $args = apply_filters('ogre/register_sidebar/args', $args);

        return register_sidebar($args);
    }

    static function widgets_init() {
        // Primary Sidebar
        self::register_sidebar([
            'name' => __('Primary Sidebar', wp_get_theme(get_template())->get('TextDomain')),
            'id' => 'primary',
            'description' => __('The sidebar that will be displayed on all post/archive pages.', wp_get_theme(get_template())->get('TextDomain')),
        ]);

        // Footer Widgets
        self::register_sidebar([
            'name' => __('Footer Widgets (Left)', wp_get_theme(get_template())->get('TextDomain')),
            'id' => 'footer-left',
            'description' => __('The widgets which will be displayed in the footer within the left column.', wp_get_theme(get_template())->get('TextDomain')),
            'class' => 'sidebar sidebar-footer sidebar-footer__left',
        ]);
        self::register_sidebar([
            'name' => __('Footer Widgets (Right)', wp_get_theme(get_template())->get('TextDomain')),
            'id' => 'footer-right',
            'description' => __('The widgets which will be displayed in the footer within the right column.', wp_get_theme(get_template())->get('TextDomain')),
            'class' => 'sidebar sidebar-footer sidebar-footer__right',
        ]);
    }

    static function enqueue() {
        // Theme Dependent Scripts
        $scripts = apply_filters('ogre/scripts', []);

        // Google Fonts (defaults to Open Sans)
        if (apply_filters('ogre/fonts_asset_disabled', false) === false) {
            wp_enqueue_style('google-fonts', apply_filters('ogre/fonts_asset', 'https://fonts.googleapis.com/css?family=Open+Sans'), [], null);
        }

        // Theme Style
        wp_enqueue_style(wp_get_theme(get_template())->get('TextDomain'), get_template_directory_uri() . '/assets/sass/style.css', [], wp_get_theme(get_template())->get('Version'));

        // Enqueue Theme-Dependent Scripts
        $deps = ['jquery'];
        foreach ($scripts as $script) {
            switch ($script['type']) {
                case 'script':
                    wp_enqueue_script($script['name'], $script['href'], $deps, null, true);
                    $deps[] = $script['name'];
                    break;
                case 'style':
                    wp_enqueue_style($script['name'], $script['href'], [], null);
                    break;
            }
        }

        // Theme Script
        wp_enqueue_script(wp_get_theme(get_template())->get('TextDomain'), get_template_directory_uri() . '/assets/js/theme.js', $deps, wp_get_theme(get_template())->get('Version'), true);

        // Localize global variables in script
        global $wp_query;
        wp_localize_script(wp_get_theme(get_template())->get('TextDomain'), wp_get_theme(get_template())->get('TextDomain'), apply_filters('ogre/script_vars', [
            'ajaxurl' => admin_url('admin-ajax.php'),
            'query_vars' => json_encode($wp_query->query),
            'assetsurl' => get_template_directory_uri() . '/assets/',
            'theme' => get_theme_support('ogre/ajax') ? 'ajax' : 'static',
            'modules' => self::get_active_modules(),
        ]));
    }

    public static function get_available_modules($include_status = false) {
        $modules = [
            // name (string) => default (bool)
            'ajax' => true,
            'breakwords' => true,
            'device' => true,
            'disabled' => true,
            'expanders' => true,
            'fullheight' => true,
            'gforms' => true,
            'gif' => false,
            'header' => true,
            'maps' => true,
            'maps_gl' => false,
            'masonry' => true,
            'modals' => true,
            'parallax' => true,
            'responsiveness' => false,
            'reveal' => true,
            'schema_faq_expanders' => true,
            'scrollbars' => false,
            'scrollspy' => false,
            'slidermenu' => false,
            'sliderscroll' => false,
            'sliders' => true,
            'svg' => true,
            'touchscroll' => true,
            'woocommerce' => true,
            'wufoo' => false,
        ];
        return !!$include_status ? $modules : array_keys($modules);
    }
    public static function get_default_modules() {
        return apply_filters(
            'ogretemplate/default_script_modules',
            array_keys(array_filter(self::get_available_modules(true)))
        );
    }
    public static function get_active_modules() {
        $available = self::get_available_modules(false);
        $default = self::get_default_modules();
        $modules = apply_filters('ogretemplate/active_script_modules', $default, $available);
        $modules = array_filter($modules, function ($module) use ($available) {
            return in_array($module, $available);
        });
        return array_values($modules);
    }

    static function color_palette($colors) {
        return [
            __('Black', wp_get_theme(get_template())->get('TextDomain')) => '#000000',
            __('White', wp_get_theme(get_template())->get('TextDomain')) => '#ffffff',
        ];
    }

    static function font_sizes($sizes) {
        //$sizes['normal'] = 16;
        return $sizes;
    }

    static function add_image_sizes($sizes) {
        $_sizes = [];

        foreach ($sizes as $key => $value) {
            if ($key == 'full') $_sizes['extra-large'] = __('Extra Large', wp_get_theme(get_template())->get('TextDomain'));
            $_sizes[$key] = $value;
        }

        return $_sizes;
    }

    static function settings_post_types($post_types) {
        if (!in_array('post', $post_types)) $post_types[] = 'post';
        return $post_types;
    }

    static function editor_settings($settings, $block_editor_context) {
        $settings = array_replace_recursive($settings, [
            'supportsTemplateMode' => false,
            'supportsLayout' => true,
            'alignWide' => true,
            'disableCustomColors' => true,
            'disableCustomFontSizes' => true,
            'disableCustomGradients' => false,
            'enableCustomLineHeight' => false,
            'enableCustomSpacing' => false,
            'enableCustomUnits' => false,
        ]);
        return $settings;
    }

    static function theme_support_body_classes($classes) {
        if (get_theme_support('ogre/gallery-modals')) $classes[] = 'has-gallery-modals';
        if (get_theme_support('ogre/image-modals')) $classes[] = 'has-image-modals';
        if (get_theme_support('ogre/schema-faq-expanders')) $classes[] = 'has-schema-faq-expanders';
        if (get_theme_support('ogre/update-header-height')) $classes[] = 'watch-header-height';
        if (get_theme_support('ogre/modal-ignore-nav')) $classes[] = 'modal-ignore-nav';
        if (get_theme_support('ogre/modal-ignore-info')) $classes[] = 'modal-ignore-info';
        return $classes;
    }

}

\OgreTemplate\Theme::load();
