<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.1.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Header extends TemplateSection {

    public function __construct() {
        $this->priority = 30;
        $this->title = __('Header', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Change your logo and other page header settings.', wp_get_theme(get_template())->get('TextDomain'));

        add_filter('ogretemplate/palette_field_keys', [$this, 'setup_palette_fields']);
        add_filter('ogretemplate/header_classes', [$this, 'header_classes'], 10, 1);
        add_filter('body_class', [$this, 'body_classes'], 10, 1);
        add_action('ogre/header', [$this, 'container_alignment'], 0.1);
        add_filter('nav_menu_link_attributes', [$this, 'nav_menu_link_attributes'], 10, 4);

        add_filter('ogretemplate/header_templates', [$this, 'register_templates'], 10, 2);

        parent::__construct();
    }

    public function setup_palette_fields($keys) {
        $keys[] = 'field_607464bd748fe'; // header_colors
        return $keys;
    }

    public function output() {

        // Settings

        $fixed = $this->is_fixed();
        $height = $this->get_field('header_min_height');
        $duration = $this->get_field('header_fixed_duration');
        $colors = $this->get_field('header_colors');
        $logo_size = $this->get_field('header_logo_size');
        $nav_size = $this->get_field('header_nav_size');

        // Local Variables

        $variables = [];

        if (!empty($colors)) {
            foreach ($colors as $key => $value) {
                $variables[] = new VariableReference([
                    'key' => sprintf('color-%s', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s', sanitize_title($value)),
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('color-%s-rgb', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s-rgb', sanitize_title($value)),
                ]);
            }
        }

        if (is_numeric($height)) {
            $variables[] = new Variable([
                'key' => 'min-height',
                'value' => intval($height),
                'format' => '%d',
                'append' => 'px',
            ]);
        }

        if (is_numeric($logo_size)) {
            $variables[] = new Variable([
                'key' => 'branding--size',
                'value' => intval($logo_size),
                'format' => '%d',
                'append' => 'px',
            ]);
        } else {
            $variables[] = new Variable([
                'key' => 'branding--size',
                'value' => 'auto',
            ]);
        }

        $variables[] = new Variable([
            'key' => 'branding--text-transform',
            'value' => $this->get_field('header_logo_text_transform') === true ? 'uppercase' : 'none',
        ]);

        if (is_string($nav_size)) {
            $variables[] = new VariableReference([
                'key' => 'nav--font-size',
                'value' => sprintf('--global--font-size-%s', $nav_size),
            ]);
        }

        $variables[] = new Variable([
            'key' => 'nav--text-transform',
            'value' => $this->get_field('header_nav_text_transform') === true ? 'uppercase' : 'none',
        ]);

        if (!!$fixed && is_numeric($duration)) {
            $variables[] = new Variable([
                'key' => 'fixed-duration',
                'value' => floatval($duration),
                'format' => '%.02f',
                'append' => 's',
            ]);
        }

        $this->output_css($variables, false, 'header.site-header');

        // Global Variables

        foreach ($variables as &$variable) {
            $variable->key = 'header--' . $variable->key;
        }

        $this->output_css($variables);

    }

    public function header_classes($classes) {
        $fixed = $this->is_fixed();
        $alignment = $this->get_field('header_container');
        $expander = $this->has_expander();
        $sub_expander = $this->has_sub_expander();

        $template_class = $this->get_template_class();
        if (is_array($template_class) && !empty($template_class)) $classes = array_merge($classes, $template_class);
        else $classes[] = $this->get_template_class();

        $classes[] = !!$fixed ? 'is-position-fixed' : 'is-position-static';

        if (!empty($alignment)) $classes[] = sprintf('has-align-%s', sanitize_title($alignment));

        if (!!$expander) $classes[] = 'has-mobile-expander';

        if (!!$sub_expander) $classes[] = 'has-sub-expander';

        return $classes;
    }

    public function body_classes($classes) {
        $fixed = $this->is_fixed();

        $classes[] = !!$fixed ? 'has-header-position-fixed' : 'has-header-position-static';

        return $classes;
    }

    public function container_alignment() {
        $alignment = $this->get_field('header_container');
        if (!empty($alignment) && $alignment != 'default') {
            remove_action('ogre/header', 'ogretemplate_container_begin', 1);
        }
        switch ($alignment) {
            case 'wide':
                add_action('ogre/header', 'ogretemplate_container_xl_begin', 1);
                break;
            case 'full':
                add_action('ogre/header', 'ogretemplate_container_fluid_begin', 1);
                break;
        }
    }

    public function register_templates($templates, $section) {
        if (!isset($templates['default'])) {
            $templates['default'] = __('Default', wp_get_theme(get_template())->get('TextDomain'));
        }
        if (!isset($templates['secondary'])) {
            $templates['secondary'] = __('Secondary Bar', wp_get_theme(get_template())->get('TextDomain'));
        }
        return $templates;
    }

    public function nav_menu_link_attributes($atts, $item, $args, $depth) {
        if (!$this->has_sub_expander() || !in_array('menu-item-has-children', $item->classes) || $depth > apply_filters('ogretemplate/header/sub_nav_menu_expander_depth', 0, $args)) return $atts;

        $atts['class'] = 'expander click-out';
        $atts['data-type'] = apply_filters('ogretemplate/header/sub_nav_menu_expander_type', 'slide-height', $atts, $item, $args, $depth);
        $atts['data-duration'] = strval(apply_filters('ogretemplate/header/sub_nav_menu_expander_duration', 250, $atts, $item, $args, $depth));
        $atts['data-initial'] = 'close';
        $atts['data-target'] = sprintf('li#menu-item-%d > ul.sub-menu', $item->ID);
        $atts['data-group'] = sprintf('menu_%s', $args->menu->slug);

        return apply_filters('ogretemplate/header/sub_nav_menu_link_attributes', $atts, $item, $args, $depth);
    }

    // Field Getters

    public function get_logo() {
        return $this->get_field('header_logo');
    }
    public function the_logo_edit() {
        $this->the_field_edit('header_logo');
    }

    public function get_logo_text() {
        return $this->get_field('header_logo_text');
    }
    public function the_logo_text_edit() {
        $this->the_field_edit('header_logo_text');
    }

    public function has_logo() {
        return apply_filters('ogretemplate/header_has_logo', !empty($this->get_logo()) || !empty($this->get_logo_text()), $this);
    }

    public function is_fixed() {
        return $this->get_field('header_position_fixed') === true;
    }

    public function has_expander() {
        return apply_filters('ogretemplate/header_has_expander', $this->get_field('header_nav_expander') === true);
    }

    public function has_sub_expander() {
        return apply_filters('ogretemplate/header_has_sub_expander', $this->get_field('header_nav_sub_expander') === true);
    }

}

Header::instance();
