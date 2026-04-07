<?php
/**
 * Abstract class to help generate customizer sections.
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.1.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

abstract class Section {

    private static $instances = [];
    private static $instance_classes = [];
    public static function instance() {
        $class = get_called_class();
        if (in_array($class, self::$instance_classes)) return self::$instances[array_search($class, self::$instance_classes)];

        self::$instances[] = new $class();
        self::$instance_classes[] = $class;

        return self::$instances[count(self::$instances) - 1];
    }

    protected $priority = 2;
    protected $title = '';
    protected $slug = '';
    protected $description = '';
    protected $section_id = '';
    protected $capability = 'edit_theme_options';
    protected $storage_type = 'option';
    protected $is_editor = false;

    public function __construct() {
        if (empty($this->slug) && !empty($this->title)) $this->slug = sanitize_title($this->title);

        add_action('init', [$this, 'init_section'], 2 + $this->priority / 100);
        if (class_exists('\Ogre')) \Ogre::maybe_add_action('acf/init', [$this, 'init_field_group']);
        add_action('customize_register', [$this, 'register_selective_refresh'], 10 + $this->priority / 100, 1);
        add_action('wp_head', [$this, 'maybe_output'], 8.1 + $this->priority / 100); // Runs right after wp_print_styles @ 8
        add_action('admin_footer', [$this, 'maybe_output'], 100 + $this->priority / 100); // After admin_print_styles & admin_print_scripts
    }

    private function get_post_id() {
        if (class_exists('\OgreCore\Customizer')) {
            return sprintf('%s_%s', \OgreCore\Customizer::get_panel_id(), sanitize_title($this->title));
        } else if (!empty($this->section_id)) {
            return $this->section_id;
        } else if (!empty($this->title)) {
            return sprintf('theme_%s', sanitize_title($this->title));
        } else {
            return false;
        }
    }

    function init_section() {
        if (!function_exists('acf_add_customizer_section') || !class_exists('\OgreCore\Customizer')) return;

        $this->section_id = acf_add_customizer_section([
            'title' => $this->title,
            'description' => $this->description,
            'description_hidden' => false,
            'capability' => $this->capability,
            'priority' => $this->priority,
            'storage_type' => $this->storage_type,
            'panel' => \OgreCore\Customizer::get_panel_id(),
            'post_id' => $this->get_post_id(),
        ]);

        do_action('ogretemplate/customizer/init', $this->section_id, $this);
        do_action("ogretemplate/customizer/{$this->section_id}/init", $this);
    }

    function register_selective_refresh($wp_customize) {
        if (!isset($wp_customize->selective_refresh)) return;

        $field_names = $this->get_field_names();
        if (empty($field_names)) return;

        // TODO: Needs more research...
        $wp_customize->selective_refresh->add_partial(
            sprintf('css_custom_properties_%s_%s', wp_get_theme(get_template())->get('TextDomain'), sanitize_title($this->title)),
            [
                'settings' => $field_names,
                'selector' => sprintf('#%s-%s', wp_get_theme(get_template())->get('TextDomain'), sanitize_title($this->title)),
                'render_callback' => [$this, 'output'],
            ]
        );
    }

    function init_field_group() {
        if (\Ogre::field_group_exists(sprintf(__('Customizer [%s]', wp_get_theme(get_template())->get('TextDomain')), $this->title)) || !function_exists('acf_add_local_field_group')) return;

        $file_name = sprintf('customizer-%s', sanitize_title($this->title));
        $path_format = '%s/assets/json/%s.json';
        if (!file_exists($path = sprintf($path_format, get_stylesheet_directory(), $file_name))) {
            $path = sprintf($path_format, get_template_directory(), $file_name);
        }
        if (!file_exists($path)) return;

        $field_groups = json_decode(file_get_contents($path), true);
        if (is_null($field_groups)) return;

        // Load each field group in file (should only be one, though)
        foreach ($field_groups as $field_group) {
            acf_add_local_field_group($field_group);
        }
    }

    public function get_field_group($get_fields = true) {
        if (!function_exists('acf_get_field_group')) return false;

        $field_group = acf_get_field_groups([
            'customizer' => $this->get_post_id(),
        ]);
        if (empty($field_group)) return false;
        $field_group = array_values($field_group)[0];

        $field_group['fields'] = acf_get_fields($field_group['ID']);

        return $field_group;
    }
    public function get_field_group_id() {
        $field_group = $this->get_field_group(false);
        if (!is_array($field_group) || !isset($field_group['ID'])) return false;
        return $field_group['ID'];
    }

    protected function get_field_names() {
        $field_group = $this->get_field_group();
        if (empty($field_group)) return [];

        $field_names = $this->_get_field_names($field_group['fields'], $this->get_post_id());
        return $field_names;
    }
    protected function _get_field_names($fields, $prefix = '') {
        $names = [];
        foreach ($fields as $key => $field) {
            $name = sprintf('%s[%s]', $prefix, $field['key']);
            switch ($field['type']) {
                case 'group':
                    $names = array_merge($names, $this->_get_field_names($field['sub_fields'], $name));
                    break;
                default:
                    $names[] = $name;
                    break;
            }
        }
        return $names;
    }

    // Property Accessors

    public function get_priority() {
        return $this->priority;
    }
    public function get_slug() {
        return $this->slug;
    }
    public function get_id() {
        return $this->get_slug();
    }
    public function get_title() {
        return $this->title;
    }
    public function get_description() {
        return $this->description;
    }
    public function get_section_id() {
        return $this->section_id;
    }

    // Field Functions

    protected function get_field($name) {
        if (!function_exists('get_field')) return false;
        return get_field($name, $this->get_post_id());
    }
    protected function have_rows($name) {
        if (!function_exists('have_rows')) return false;
        return have_rows($name, $this->get_post_id());
    }
    protected function the_row() {
        if (!function_exists('the_row')) return;
        the_row();
        do_action('acf_customizer_row');
    }
    protected function get_sub_field($name) {
        if (!function_exists('get_sub_field')) return false;
        do_action('acf_customizer_sub_field', $name);
        return get_sub_field($name);
    }
    protected function the_field_edit($name) {
        do_action('acf_customizer_field', $name, $this->get_post_id());
    }
    protected function get_field_object($name) { // Only works with key
        if (!function_exists('get_field_object')) return false;
        return get_field_object($name, $this->get_post_id());
    }

    // Output CSS
    public function output() { }
    public function output_style() {
        // NOTE: This may need to be converted to use wp_add_inline_style
        $id = sprintf('%s-%s', wp_get_theme(get_template())->get('TextDomain'), sanitize_title($this->title));
        printf('<style text="text/css" id="%s">', esc_attr($id));
        $this->output();
        echo '</style>';
    }
    public function maybe_output() {
        if (!is_admin()) {
            $this->output_style();
            return;
        }
        if (is_admin() && $this->is_editor === false) return;

        global $current_screen;
        if (is_null($current_screen) && function_exists('get_current_screen')) $current_screen = get_current_screen();
        if (is_null($current_screen)) return;

        if ((method_exists($current_screen, 'is_block_editor') && $current_screen->is_block_editor()) ||
            (function_exists('is_gutenberg_page') && is_gutenberg_page())) {
            $this->output_style();
            return;
        }
    }
    protected function output_css($variables = [], $classes = [], $root = ':root') {
        $variables = apply_filters('ogretemplate/section_css_variables', $variables, $this);
        $variables = apply_filters(sprintf('ogretemplate/section_%s_css_variables', sanitize_title($this->title)), $variables, $this);

        $classes = apply_filters('ogretemplate/section_css_classes', $classes, $this);
        $classes = apply_filters(sprintf('ogretemplate/section_%s_css_classes', sanitize_title($this->title)), $classes, $this);

        if (empty($variables) && empty($classes)) return false;

        $root = apply_filters('ogretemplate/section_css_root', $root, $this);

        // Variables
        if (!empty($variables)) {
            echo "{$root} {";
            foreach ($variables as $variable) {
                if (!is_a($variable, '\OgreTemplate\Customizer\Variable')) continue;
                printf(" %s", $variable->output(false));
            }
            echo '}';
        }

        // Classes
        if (!empty($classes)) {
            // NOTE: There's probably a better way to do this
            if (is_string($classes)) {
                echo $classes;
            } else if (is_array($classes)) {
                foreach ($classes as $key => $value) {
                    if (is_string($key)) {
                        printf('%s { %s }', $key, $value);
                    } else {
                        echo $value;
                    }
                }
            }
        }
    }

}

abstract class TemplateSection extends Section {

    public function __construct() {
        add_filter('body_class', [$this, 'template_body_classes'], 10, 1);
        parent::__construct();
        $this->init_filters();
    }

    protected function init_filters() {
        add_filter("acf/load_field/name={$this->slug}_template", [$this, 'template_choices'], 10, 1);
        add_filter("acf/load_value/name={$this->slug}_template", [$this, 'template_value'], 10, 3);
    }

    public function template_choices($field) {
        if (!in_array($field['type'], ['select', 'radio'])) return $field;

        $field['choices'] = [];

        $templates = $this->get_templates();
        if (empty($templates)) return $field;

        foreach ($templates as $key => $title) {
            $file_name = sprintf("%s-%s", $this->slug, sanitize_title($key));
            $path_format = '%s/assets/img/%s.png';
            $path = '';
            if (file_exists(sprintf($path_format, get_stylesheet_directory(), $file_name))) {
                $path = sprintf($path_format, get_stylesheet_directory_uri(), $file_name);
            } else if (file_exists(sprintf($path_format, get_template_directory(), $file_name))) {
                $path = sprintf($path_format, get_template_directory_uri(), $file_name);
            }

            if (!empty($path)) {
                $description = sprintf('%s <img src="%s" title="%s" />', esc_html($title), esc_url($path), esc_attr($title));
            } else {
                $description = esc_html($title);
            }

            $field['choices'][$key] = $description;
        }

        $field['default_value'] = $this->get_default_template();

        return $field;
    }

    public function template_value($value, $post_id, $field) {
        // Fix old default key
        if (is_array($value) && in_array('a', $value)) $value = ['default'];
        else if ((is_string($value) && $value === 'a') || is_null($value)) $value = 'default';

        return $value;
    }

    public function template_body_classes($classes) {
        $classes[] = sprintf('has-%s-style-%s', $this->slug, $this->get_template());
        return $classes;
    }

    // Public Template Getters

    public function get_templates() {
        $templates = apply_filters("ogretemplate/{$this->slug}_templates", [
            'hidden' => __('Hidden', wp_get_theme(get_template())->get('TextDomain')),
            'default' => __('Default', wp_get_theme(get_template())->get('TextDomain')),
        ], $this);
        $templates = array_filter($templates);
        return $templates;
    }

    public function get_default_template() {
        return apply_filters("ogretemplate/{$this->slug}_default_template", 'default', $this);
    }

    public function get_template() {
        $templates = $this->get_templates();
        $template = $this->get_field("{$this->slug}_template");
        if (!in_array($template, array_keys($templates))) $template = $this->get_default_template();
        if ($template === 'a') $template = 'default';
        return apply_filters("ogretemplate/{$this->slug}_template", $template, $templates, $this);
    }

    public function get_template_class() {
        $class = 'is-style-none';

        $style = $this->get_template();
        if (!empty($style)) $class = sprintf('is-style-%s', sanitize_title($style));

        if ($style === 'a') $class = [$class, 'is-style-default'];
        else if ($style === 'default') $class = [$class, 'is-style-a'];

        return apply_filters("ogretemplate/section/{$this->slug}/template_class", $class, $style, $this);
    }

}

class Variable {
    public $key = '';
    public $value = '';
    public $format = '%s';
    public $prepend = '';
    public $append = '';

    public function __construct($arr = []) {
        if (empty($arr)) return;
        foreach ($arr as $key => $value) {
            if (!property_exists(get_called_class(), $key)) continue;
            $this->$key = $value;
        }
    }

    public function get_key() {
        if (!is_string($this->key)) return false;
        if (strpos($this->key, '--') !== 0) return "--{$this->key}";
        return sanitize_title($this->key);
    }

    public function output($echo = true) {
        $output = sprintf(" %s: %s{$this->format}%s;", $this->get_key(), $this->prepend, $this->value, $this->append);
        if (!!$echo) {
            echo $output;
            return true;
        } else {
            return $output;
        }
    }
}

class VariableReference extends Variable {
    public function __construct($arr = []) {
        if (!isset($arr['prepend'])) $arr['prepend'] = 'var(';
        if (!isset($arr['append'])) $arr['append'] = ')';
        parent::__construct($arr);
    }
}

class VariableNumber extends Variable {
    public $digits = 2;
    public $unit = '';

    public function output($echo = true) {
        $this->append = $this->unit;
        $this->format = sprintf('%%.%df', $this->digits);
        return parent::output($echo);
    }
}
