<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.0
 * @version 0.3.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Forms extends Section {

    public function __construct() {
        $this->priority = 110;
        $this->title = __('Forms', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Change the way forms are displayed on your site.', wp_get_theme(get_template())->get('TextDomain'));

        add_filter('ogretemplate/palette_field_keys', [$this, 'setup_palette_fields']);

        add_filter('gform_submit_button', [$this, 'button_classes'], 10, 2);

        parent::__construct();
    }

    public function setup_palette_fields($keys) {
        $keys[] = 'field_60c8ecdb9369f'; // form__field__background
        $keys[] = 'field_60c8ed1a936a0'; // form__field__color
        $keys[] = 'field_60c8ed40936a1'; // form__field__focus_color
        $keys[] = 'field_60c8ed5b936a2'; // form__field__placeholder_color
        $keys[] = 'field_60c8ee54936a8'; // form__field__border_color
        $keys[] = 'field_60c8ee80936a9'; // form__field__border_focus_color
        $keys[] = 'field_60c8f53e8d47a'; // form__label__color
        $keys[] = 'field_60c8f5778d47b'; // form__label__focus_color
        $keys[] = 'field_60c8f5918d47c'; // form__label__required_color
        $keys[] = 'field_60c8f77dea7b3'; // form__sublabel__color
        $keys[] = 'field_60c8f6c5ea7ac'; // form__description__color
        $keys[] = 'field_60c916527da7b'; // form__button__background_color
        $keys[] = 'field_60c9167c7da7c'; // form__button__color
        return $keys;
    }

    public function button_classes($button_input, $form) {

        $classes = [];

        $background_color = $this->get_field('form__button__background_color');
        if (!empty($background_color)) {
            $classes[] = 'has-background';
            $classes[] = sprintf('has-%s-background-color', sanitize_title($background_color));
        }

        $text_color = $this->get_field('form__button__color');
        if (!empty($text_color)) {
            $classes[] = 'has-text-color';
            $classes[] = sprintf('has-%s-color', sanitize_title($text_color));
        }

        $classes = apply_filters('ogretemplate/forms_button_classes', $classes, $this);
        if (empty($classes)) return $button_input;

        $button_input = preg_replace('/class=\"([^\"]+)\"/', sprintf('class="$1 %s"', implode(' ', $classes)), $button_input);

        return $button_input;
    }

    public function output() {

        $variables = [];
        $settings = $this->get_settings();

        foreach ($settings as $name => $type) {
            $value = $this->get_field($name);
            $key = str_replace('_', '-', $name);
            switch ($type) {
                case 'rem':
                    if (is_numeric($value)) {
                        $variables[] = new VariableNumber([
                            'key' => $key,
                            'value' => floatval($value),
                            'digits' => 3,
                            'unit' => 'rem',
                        ]);
                    }
                    break;

                case 'color':
                    if (!empty($value)) {
                        $variables[] = new VariableReference([
                            'key' => $key,
                            'value' => sprintf('--global--color-%s', sanitize_title($value)),
                        ]);
                        $variables[] = new VariableReference([
                            'key' => "{$key}-rgb",
                            'value' => sprintf('--global--color-%s-rgb', sanitize_title($value)),
                        ]);
                    }
                    break;

                case 'family':
                    if (!empty($value)) {
                        $variables[] = new VariableReference([
                            'key' => $key,
                            'value' => sprintf('--global--font-family-%s', sanitize_title($value)),
                        ]);
                        if (strpos($key, '--font-family') >= 0) {
                            $variables[] = new VariableReference([
                                'key' => str_replace('--font-family', '--line-height', $key),
                                'value' => sprintf('--global--line-height-%s', sanitize_title($value)),
                            ]);
                        }
                    }
                    break;

                case 'weight':
                    if (is_numeric($value)) {
                        $variables[] = new Variable([
                            'key' => $key,
                            'value' => $value,
                            'format' => '%03d',
                        ]);
                    }
                    break;
            }
        }
        if (empty($variables)) return;

        $this->output_css($variables);

    }

    public function get_settings() {
        return [
            // Form
            'form__padding' => 'rem',
            'form__inner_padding' => 'rem',

            // Field Sizing
            'form__field__size' => 'rem',
            'form__field__padding' => 'rem',
            'form__field__border_width' => 'rem',
            'form__field__border_radius' => 'rem',

            // Field Colors
            'form__field__background_color' => 'color',
            'form__field__color' => 'color',
            'form__field__focus_color' => 'color',
            'form__field__placeholder_color' => 'color',
            'form__field__border_color' => 'color',
            'form__field__border_focus_color' => 'color',

            // Field Typography
            'form__field__font_family' => 'family',
            'form__field__weight' => 'weight',
            'form__field__font_size' => 'rem',

            // Label
            'form__label__margin' => 'rem',
            'form__label__color' => 'color',
            'form__label__focus_color' => 'color',
            'form__label__required_color' => 'color',
            'form__label__font_size' => 'rem',
            'form__label__font_family' => 'family',
            'form__label__weight' => 'weight',

            // Sublabel
            'form__sublabel__margin' => 'rem',
            'form__sublabel__color' => 'color',
            'form__sublabel__font_size' => 'rem',
            'form__sublabel__font_family' => 'family',
            'form__sublabel__weight' => 'weight',

            // Description
            'form__description__margin' => 'rem',
            'form__description__color' => 'color',
            'form__description__font_size' => 'rem',
            'form__description__font_family' => 'family',
            'form__description__font_weight' => 'weight',

            // Button
            'form__button__background_color' => 'color',
            'form__button__color' => 'color',
        ];
    }

}

Forms::instance();
