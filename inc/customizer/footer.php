<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.3.1
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Footer extends TemplateSection {

    public function __construct() {
        $this->priority = 40;
        $this->title = __('Footer', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Change your logo and other page footer settings.', wp_get_theme(get_template())->get('TextDomain'));

        add_filter('ogretemplate/palette_field_keys', [$this, 'setup_palette_fields']);
        add_filter('ogretemplate/footer_classes', [$this, 'footer_classes'], 10, 1);
        add_action('ogre/footer', [$this, 'container_alignment'], 0.1);

        add_filter('ogretemplate/footer_templates', [$this, 'register_templates'], 10, 2);

        parent::__construct();
    }

    public function setup_palette_fields($keys) {
        $keys[] = 'field_6074890bc40e4'; // footer_colors
        return $keys;
    }

    public function output() {

        // Settings

        $colors = $this->get_field('footer_colors');
        $logo_size = $this->get_field('footer_logo_size');
        $text_transform = $this->get_field('footer_logo_text_transform') === true;

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
            'value' => $text_transform ? 'uppercase' : 'none',
        ]);

        $this->output_css($variables, false, 'footer.site-footer');

        // Global Variables

        foreach ($variables as &$variable) {
            $variable->key = 'footer--' . $variable->key;
        }

        $this->output_css($variables);

    }

    public function footer_classes($classes) {
        $template_class = $this->get_template_class();
        if (is_array($template_class) && !empty($template_class)) $classes = array_merge($classes, $template_class);
        else $classes[] = $this->get_template_class();

        $alignment = $this->get_field('footer_container');
        if (!empty($alignment)) $classes[] = sprintf('has-align-%s', sanitize_title($alignment));

        return $classes;
    }

    public function container_alignment() {
        $alignment = $this->get_field('footer_container');
        if (!empty($alignment) && $alignment != 'default') {
            remove_action('ogre/footer', 'ogretemplate_container_begin', 2);
            remove_action('ogre/footer', 'ogretemplate_container_begin', 102);
        }
        switch ($alignment) {
            case 'wide':
                add_action('ogre/footer', 'ogretemplate_container_xl_begin', 2);
                add_action('ogre/footer', 'ogretemplate_container_xl_begin', 102);
                break;
            case 'full':
                add_action('ogre/footer', 'ogretemplate_container_fluid_begin', 2);
                add_action('ogre/footer', 'ogretemplate_container_fluid_begin', 102);
                break;
        }
    }

    public function register_templates($templates, $section) {
        if (!isset($templates['default'])) {
            $templates['default'] = __('Default', wp_get_theme(get_template())->get('TextDomain'));
        }
        return $templates;
    }

    // Field Getters

    public function get_copyright() {
        $text = $this->get_field('footer_copyright');
        if (empty($text)) $text = __('©[date format="Y"] [bloginfo key="name"]. All Rights Reserved.', wp_get_theme(get_template())->get('TextDomain'));
        return do_shortcode($text);
    }
    public function the_copyright_edit() {
        $this->the_field_edit('footer_copyright');
    }

    public function get_developer() {
        return $this->get_field('footer_developer') !== true;
    }
    public function the_developer_edit() {
        $this->the_field_edit('footer_developer');
    }

    public function get_logo() {
        return $this->get_field('footer_logo');
    }
    public function the_logo_edit() {
        $this->the_field_edit('footer_logo');
    }

    public function get_logo_text() {
        return $this->get_field('footer_logo_text');
    }
    public function the_logo_text_edit() {
        $this->the_field_edit('footer_logo_text');
    }

    public function has_logo() {
        return apply_filters('ogretemplate/footer_has_logo', !empty($this->get_logo()) || !empty($this->get_logo_text()), $this);
    }

}

Footer::instance();
