<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.4
 * @since 0.1.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Palette extends Section {

    private $field_keys = [
        'palette' => 'field_5fad806eb6983',
        'key' => 'field_5fad8256b6984',
        'value' => 'field_5fad825cb6985',

        'palette_default_colors' => 'field_5fb2ad0cab0ab',
        'text_color' => 'field_5fb2ad30ab0ac',
        'background_color' => 'field_5fb2ad4fab0ad',
    ];

    public function __construct() {
        $this->priority = 5;
        $this->title = __('Color Palette', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Choose the colors you\'d like to use throughout your site.', wp_get_theme(get_template())->get('TextDomain'));
        $this->is_editor = true;

        add_action('init', [$this, 'setup_palette_filters']);
        add_filter('acf/load_value/key=' . $this->field_keys['palette'], [$this, 'default_palette'], 100, 3);
        add_filter('ogre/color_palette', [$this, 'color_palette'], 20, 1);
        add_filter('ogretemplate/theme-json/settings', [$this, 'theme_settings'], 10, 1);

        add_action('after_setup_theme', [$this, 'generate_gradient_presets'], 100);

        parent::__construct();
    }

    public function setup_palette_filters() {
        $keys = apply_filters('ogretemplate/palette_field_keys', [$this->field_keys['palette_default_colors']]);
        $keys = array_filter($keys);
        foreach ($keys as $key) {
            add_filter("acf/load_field/key={$key}", [$this, 'load_palette_choices'], 10, 1);
        }

        $names = apply_filters('ogretemplate/palette_field_names', []);
        $names = array_filter($names);
        foreach ($names as $name) {
            add_filter("acf/load_field/name={$name}", [$this, 'load_palette_choices'], 10, 1);
        }
    }

    public function default_palette($value, $post_id, $field) {
        if ($value === false || is_null($value)) {
            $value = [
                [
                    $this->field_keys['key'] => __('Black', wp_get_theme(get_template())->get('TextDomain')),
                    $this->field_keys['value'] => '#000000',
                ],
                [
                    $this->field_keys['key'] => __('White', wp_get_theme(get_template())->get('TextDomain')),
                    $this->field_keys['value'] => '#ffffff',
                ],
            ];
        }
        return $value;
    }

    public function get_colors() {
        $_colors = $this->get_field('palette');
        if (!is_array($_colors) || empty($_colors)) return false;

        $colors = [];
        foreach ($_colors as $color) {
            if (!isset($color['key']) || empty(sanitize_title($color['key'])) || !isset($color['value']) || empty(sanitize_hex_color($color['value']))) continue;
            $colors[$color['key']] = sanitize_hex_color($color['value']);
        }

        return !empty($colors) ? $colors : false;
    }
    public function get_color($key) {
        $colors = $this->get_colors();
        return is_array($colors) && isset($colors[$key]) ? $colors[$key] : false;
    }

    public function color_palette($colors) {
        $_colors = $this->get_colors();
        return !empty($_colors) ? $_colors : $colors;
    }

    public function theme_settings($settings) {
        $_colors = $this->get_colors();
        if (empty($_colors)) return $settings;

        $colors = [];
        foreach ($_colors as $label => $color) {
            $colors[] = [
                'name' => $label,
                'slug' => sanitize_title($label),
                'color' => $color,
            ];
        }

        $settings = array_replace_recursive($settings, ['settings' => ['color' => ['palette' => $colors]]]);

        return $settings;
    }

    public function generate_gradient_presets() {
        $presets = $this->get_gradient_presets();
        if (!is_array($presets) || empty($presets)) return;

        // Apply presets
        add_theme_support('editor-gradient-presets', $presets);
    }

    public function get_gradient_presets() {
        // Obtain color palette
        $colors = $this->get_colors();
        if (empty($colors)) return false;

        // Get theme supports
        $gradients = $this->get_gradient_options($colors);
        if (empty($gradients)) return false;

        // Convert to presets
        $presets = array_map(function ($item) use ($colors) {
            return $this->get_gradient_preset($item, $colors);
        }, $gradients);
        $presets = array_filter($presets);
        if (empty($presets)) return false;

        return $presets;
    }

    private function get_gradient_options($colors = false) {
        // Get child theme gradients
        $_gradients = get_theme_support('ogre/gradients');
        if (!is_array($_gradients) || empty($_gradients)) return false;
        $gradients = [];
        foreach ($_gradients as $items) { // unpack multiple add_theme_support calls
            $gradients = $gradients + $items;
        }

        // Obtain color palette
        if ($colors === false) $colors = $this->get_colors();
        if (!is_array($colors) || empty($colors)) return false;

        // Sanitize gradient items
        $gradients = array_map(function ($item) use ($colors) {
            return $this->sanitize_gradient($item, $colors);
        }, $gradients);
        $gradients = array_filter($gradients);
        if (empty($gradients)) return false;

        return $gradients;
    }

    private function sanitize_gradient($item, $colors = false) {
        if (!is_array($item)) return false;
        if (!isset($item['from']) || !isset($item['to']) || empty($item['from']) || empty($item['to'])) return false;

        $defaults = [
            'type' => 'linear', // linear (default), radial, circle, ellipse
            'name' => false,
            'from' => __('Black', wp_get_theme(get_template())->get('TextDomain')),
            'to' => __('White', wp_get_theme(get_template())->get('TextDomain')),
            'opacity' => 1,
            'from_opacity' => false,
            'to_opacity' => false,
            'from_pos' => 0,
            'to_pos' => 100,
            'angle' => 135, // linear only
            'shape_pos' => 'center', // radial/circle/ellipse only
        ];
        $item = wp_parse_args($item, $defaults);

        if ($colors === false) $colors = $this->get_colors();
        if (!is_array($colors) || empty($colors)) return false;
        if (!isset($colors[$item['from']]) || !isset($colors[$item['to']])) return false;

        return $item;
    }
    private function validate_gradient($item) {
        return $this->sanitize_gradient($item) !== false;
    }

    private function get_gradient_preset($item, $colors = false) {
        $name = sprintf(
            __('%s to %s', wp_get_theme(get_template())->get('TextDomain')),
            $item['from'],
            $item['to']
        );
        if (isset($item['name']) && is_string($item['name']) && !empty($item['name'])) $name = $item['name'];

        $preset = [
            'name' => $name,
            'gradient' => $this->get_gradient_value($item, $colors),
            'slug' => sanitize_title($name),
        ];

        return $preset;
    }
    private function get_gradient_value($item, $colors = false) {
        if ($colors === false) $colors = $this->get_colors();
        if (!is_array($colors) || empty($colors)) return false;

        $value = '';

        switch ($item['type']) {
            case 'radial':
            case 'circle':
            case 'ellipse':
                $value = sprintf(
                    'radial-gradient(%s at %s, rgba(%s,%s) %s%%, rgba(%s,%s) %s%%)',
                    ($item['type'] != 'ellipse' ? 'ellipse' : 'circle'),
                    (is_string($item['shape_pos']) && !empty($item['shape_pos']) ? strval($item['shape_pos']) : 'center'),
                    implode(',', self::get_hex_components($colors[$item['from']])),
                    isset($item['from_opacity']) && is_numeric($item['from_opacity']) ? $item['from_opacity'] : $item['opacity'],
                    $item['from_pos'],
                    implode(',', self::get_hex_components($colors[$item['to']])),
                    isset($item['to_opacity']) && is_numeric($item['to_opacity']) ? $item['to_opacity'] : $item['opacity'],
                    $item['to_pos']
                );
                break;
            case 'linear':
            default:
                $value = sprintf(
                    'linear-gradient(%sdeg, rgba(%s,%s) %s%%, rgba(%s,%s) %s%%)',
                    $item['angle'],
                    implode(',', self::get_hex_components($colors[$item['from']])),
                    isset($item['from_opacity']) && is_numeric($item['from_opacity']) ? $item['from_opacity'] : $item['opacity'],
                    $item['from_pos'],
                    implode(',', self::get_hex_components($colors[$item['to']])),
                    isset($item['to_opacity']) && is_numeric($item['to_opacity']) ? $item['to_opacity'] : $item['opacity'],
                    $item['to_pos']
                );
                break;
        }

        return $value;
    }

    public function get_default_colors() {
        $colors = $this->get_colors();
        if (empty($colors)) return false;

        $defaults = $this->get_field('palette_default_colors');
        if (is_null($defaults) || !is_array($defaults) || empty($defaults)) return false;

        $color_values = array_values($colors);
        $color_names = array_keys($colors);
        $color_keys = array_map('sanitize_title', $color_names);

        $unset = [];
        foreach ($defaults as $key => &$value) {
            if (!in_array($value, $color_keys)) {
                $unset[] = $key;
                continue;
            }

            $_key = array_search($value, $color_keys);
            $value = [
                'key' => $color_keys[$_key],
                'name' => $color_names[$_key],
                'value' => $color_values[$_key],
            ];
        }
        foreach ($unset as $key) {
            unset($defaults[$key]);
        }

        return !empty($defaults) ? $defaults : false;
    }
    public function get_default_color($key) {
        $colors = $this->get_default_colors();
        return is_array($colors) && isset($colors[$key]) ? $colors[$key] : false;
    }

    public function load_palette_choices($field) {
        if ($field['type'] == 'group') {
            if (!isset($field['sub_fields']) || empty($field['sub_fields'])) return $field;
            $field['sub_fields'] = array_map([$this, 'load_palette_choices'], $field['sub_fields']);
            return $field;
        }
        if ($field['type'] != 'select') return $field;

        $field['choices'] = [];

        $colors = $this->get_colors();
        if (empty($colors)) return $field;

        foreach ($colors as $key => $value) {
            $field['choices'][sanitize_title($key)] = $key;
        }

        return $field;
    }

    private static function get_hex_components($color) {
        if (strpos($color, '#') === 0) $color = substr($color, 1);
        if (strlen($color) != 6) return false;

        return [
            'r' => hexdec(substr($color, 0, 2)),
            'g' => hexdec(substr($color, 2, 2)),
            'b' => hexdec(substr($color, 4, 2)),
        ];
    }
    private static function brightness($color) {
        $color = self::get_hex_components($color);
        if (!$color) return false;
        return ($color['r'] * .299 + $color['g'] * .587 + $color['b'] * .114) / 255;
    }
    private static function text_contrast($color, $dark, $light) {
        $color_brightness = self::brightness($color);
        $light_text_brightness = self::brightness($light);
        $dark_text_brightness = self::brightness($dark);
        return abs($color_brightness - $light_text_brightness) > abs($color_brightness - $dark_text_brightness) ? $light : $dark;
    }

    public function output() {
        $colors = $this->get_colors();
        if (empty($colors)) return;

        $default_colors = $this->get_default_colors();

        $variables = [];
        $classes = [];

        foreach ($colors as $key => $value) {
            $variables[] = new Variable([
                'key' => sprintf('color-%s', sanitize_title($key)),
                'value' => strval($value),
            ]);
            $variables[] = new Variable([
                'key' => sprintf('global--color-%s', sanitize_title($key)),
                'value' => strval($value),
            ]);

            $classes[] = sprintf('.has-text-color.has-%1$s-color, .has-inline-color.has-%1$s-color { --color: var(--global--color-%1$s); --color-rgb: var(--global--color-%1$s-rgb); }', sanitize_title($key));
            $classes[] = sprintf('.has-background.has-%1$s-background-color, .has-background-dim.has-%1$s-background-color { --background-color: var(--global--color-%1$s); --background-color-rgb: var(--global--color-%1$s-rgb); }', sanitize_title($key));

            $comp = self::get_hex_components($value);
            if (!!$comp) {
                $variables[] = new Variable([
                    'key' => sprintf('color-%s-rgb', sanitize_title($key)),
                    'value' => sprintf('%d, %d, %d', $comp['r'], $comp['g'], $comp['b']),
                ]);
                $variables[] = new Variable([
                    'key' => sprintf('global--color-%s-rgb', sanitize_title($key)),
                    'value' => sprintf('%d, %d, %d', $comp['r'], $comp['g'], $comp['b']),
                ]);
            }
        }

        if (!empty($default_colors)) {
            foreach ($default_colors as $key => $color) {
                $variables[] = new VariableReference([
                    'key' => sprintf('color-%s', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s', $color['key']),
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('color-%s-rgb', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s-rgb', $color['key']),
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('global--color-%s', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s', $color['key']),
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('global--color-%s-rgb', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s-rgb', $color['key']),
                ]);
            }
        }

        $gradients = $this->get_gradient_presets();
        if (!empty($gradients)) {
            foreach ($gradients as $preset) {
                $variables[] = new Variable([
                    'key' => sprintf('global--gradient-%s', sanitize_title($preset['slug'])),
                    'value' => strval($preset['gradient']),
                ]);

                $classes[] = sprintf('.has-background.has-%1$s-gradient-background, .has-background-gradient.has-%1$s-gradient-background { --gradient: var(--global--gradient-%1$s); }', sanitize_title($preset['slug']));
            }
        }

        $this->output_css($variables, $classes);
    }

}

Palette::instance();
