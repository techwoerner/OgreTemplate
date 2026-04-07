<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.2
 * @since 0.1.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Typography extends Section {

    public function __construct() {
        $this->priority = 10;
        $this->title = __('Typography', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Set the font families and sizes to use throughout your site.', wp_get_theme(get_template())->get('TextDomain'));
        $this->is_editor = true;

        add_filter('acf/load_field/name=font_family', [$this, 'prepare_choices'], 10, 1);
        add_filter('acf/load_field/name=font_variants', [$this, 'prepare_choices'], 10, 1);
        add_filter('acf/prepare_field/name=font_family', [$this, 'load_font_choices'], 10, 1);
        add_filter('acf/prepare_field/name=font_variants', [$this, 'load_font_variants'], 10, 1);

        add_action('customize_controls_enqueue_scripts', [$this, 'enqueue_customizer_scripts'], 20);
        add_action('wp_ajax_ogretemplate_customizer_typography_variants', [$this, 'ajax_get_font_variants']);

        add_filter('ogre/font_sizes', [$this, 'font_sizes'], 20, 1);
        add_filter('ogretemplate/theme-json/settings', [$this, 'theme_settings'], 10, 1);

        add_filter('ogre/fonts_asset_disabled', [$this, 'disable_default'], 10, 1);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_font_families']);
        add_action('after_setup_theme', [$this, 'enqueue_font_families_editor']);

        parent::__construct();
    }

    // ACF Fields

    public function prepare_choices($field) {
        $values = $field['value'];
        if (!is_array($values) && !empty($values)) $values = [$values];
        $choices = $field['choices'];

        // Only load selected values
        $field['choices'] = [];
        if (!empty($values)) {
            foreach ($values as $value) {
                if (empty($value)) continue;
                if (array_key_exists($value, $choices)) {
                    $field['choices'][$value] = $choices[$value];
                } else {
                    $field['choices'][$value] = $value;
                }
            }
        }

        return $field;
    }
    public function load_font_choices($field) {
        $fonts = $this->get_font_choices();
        if (!$fonts) return $field;

        $field['choices'] = [];

        foreach ($fonts as $font) {
            if (!isset($font['family']) || empty($font['family'])) continue;
            $field['choices'][sanitize_title($font['family'])] = $font['family'];
        }

        return $field;
    }
    public function load_font_variants($field) {
        // Generate all possible variants
        $field['choices'] = [];
        for ($i = 1; $i <= 9; $i++) {
            $weight = $i == 4 ? 'regular' : strval($i * 100);
            $field['choices'][$weight] = $weight;
            $field['choices'][$weight . 'italic'] = $weight . 'italic';
        }
        return $field;
    }

    public function enqueue_customizer_scripts() {
        wp_enqueue_script('ogretemplate-customizer-typography', get_template_directory_uri() . '/assets/js/customizer-typography.js', ['jquery'], wp_get_theme(get_template())->get('Version'));
        wp_localize_script('ogretemplate-customizer-typography', 'ogre_customizer_typography', [
            'variants_nonce' => wp_create_nonce('ogretemplate_customizer_typography_variants'),
        ]);
    }

    public function font_sizes($sizes) {
        $_sizes = $this->get_font_sizes();
        if (!$_sizes) return $sizes;

        foreach ($_sizes as $key => $size) {
            if (!isset($size['font-size']) || !is_numeric($size['font-size']) || !array_key_exists($key, $sizes)) continue;
            $sizes[$key] = intval(floatval($size['font-size']) * 16); // Convert rem to px
        }

        return $sizes;
    }

    public function theme_settings($settings) {
        $_sizes = $this->get_font_sizes();
        if (!$_sizes) return $settings;

        $fontSizes = [];
        foreach ($_sizes as $key => $size) {
            if (!isset($size['font-size']) || !is_numeric($size['font-size'])) continue;
            $fontSizes[] = [
                'slug' => $key,
                'name' => ucfirst($key),
                'size' => sprintf('%srem', floatval($size['font-size'])),
            ];
        }

        $settings = array_replace_recursive($settings, ['settings' => ['typography' => ['fontSizes' => $fontSizes]]]);

        return $settings;
    }

    // Frontend Output

    public function disable_default($disabled) {
        if (!empty($this->get_selected_font('default', true))) return true;
        return $disabled;
    }

    public function enqueue_font_families() {
        $fonts = $this->get_selected_fonts(true);
        if (empty($fonts)) return;

        foreach ($fonts as $font) {
            wp_enqueue_style(sprintf('ogrefonts-%s', sanitize_title($font['family'])), $this->get_font_url($font), [], null);
        }
    }

    public function enqueue_font_families_editor() {
        $fonts = $this->get_selected_fonts(true);
        if (empty($fonts)) return;

        foreach ($fonts as $font) {
            add_editor_style($this->get_font_url($font));
        }
    }

    public function output() {
        $fonts = $this->get_selected_fonts(true);
        $sizes = $this->get_font_sizes();
        if (empty($fonts) && empty($sizes)) return;

        $variables = [];
        $classes = [];

        // Font Families
        if (!empty($fonts)) {
            foreach ($fonts as $key => $font) {
                $font_tree = [$font['category']];
                switch ($font['category']) {
                    case 'sans-serif':
                        $font_tree[] = 'Arial';
                        $font_tree[] = 'Helvetica';
                        $font_tree[] = "'Helvetica Neue'";
                        break;
                    case 'serif':
                        $font_tree[] = '"Time New Roman"';
                        $font_tree[] = 'Times';
                        $font_tree[] = 'Georgia';
                        break;
                }
                $font_tree[] = "'{$font['family']}'";
                $font_tree = array_reverse($font_tree, false);
                $font_tree = implode(', ', $font_tree);

                $variables[] = new Variable([
                    'key' => sprintf('global--font-family-%s', sanitize_title($font['family'])),
                    'value' => $font_tree,
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('global--font-family-%s', sanitize_title($font['category'])),
                    'value' => sprintf('--global--font-family-%s', sanitize_title($font['family'])),
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('global--font-family-%s', sanitize_title($key)),
                    'value' => sprintf('--global--font-family-%s', sanitize_title($font['family'])),
                ]);

                if (isset($font['line-height']) && is_numeric($font['line-height'])) {
                    $variables[] = new Variable([
                        'key' => sprintf('global--line-height-%s', sanitize_title($key)),
                        'value' => $font['line-height'],
                        'format' => '%.2f',
                    ]);
                }

                $classes[] = sprintf(
                    '.has-font-family.has-%1$s-font-family { font-family: var(--global--font-family-%1$s); line-height: var(--global--line-height-%1$s); }',
                    sanitize_title($font['family'])
                );
            }
        }

        // Font Sizes
        if (!empty($sizes)) {
            foreach ($sizes as $key => $size) {
                if (!isset($size['font-size']) || !is_numeric($size['font-size'])) continue;

                $variables[] = new VariableNumber([
                    'key' => sprintf('global--font-size-%s', sanitize_title($key)),
                    'value' => floatval($size['font-size']),
                    'digits' => 2,
                    'unit' => 'rem',
                ]);

                $classes[] = sprintf(
                    '.is-%1$s-text, .has-%1$s-font-size { font-size: var(--global--font-size-%1$s); }',
                    $key
                );
            }
        }

        $this->output_css($variables, $classes);
    }

    public function output_style() {
        echo '<link rel="preconnect" href="https://fonts.gstatic.com">';
        parent::output_style();
    }

    // Data Getters

    public function get_selected_font($name = 'default', $fallback = false) {
        $field_name = sprintf('typography_font_%s', $name);

        $data = $this->get_field($field_name);
        if (!is_array($data) || empty($data) || !isset($data['font_family']) || empty($data['font_family'])) return false;

        $font_family = false;
        $option_data = $this->load_option($name);
        if (!!$option_data && is_array($option_data) && isset($option_data['font']) && $option_data['type'] === $name && $option_data['family'] === $data['font_family']) {
            $font_family = $option_data['font'];
        } else {
            $font_family = $this->get_font_family($data['font_family']);
            // If we're having API issues, try a fallback option to manually generate font data
            if (!!$fallback && !$font_family) {
                $font_family = [
                    'family' => ucwords(str_replace('-', ' ', $data['font_family'])),
                    'variants' => [],
                    'subsets' => ['latin'],
                    'version' => 'v1',
                    'lastModified' => date('Y-m-d'),
                    'files' => [],
                    'category' => 'sans-serif',
                    'kind' => 'webfonts#webfont',
                ];
            } else if (!$font_family) {
                return false;
            } else {
                $this->save_option($data['font_family'], $font_family, $name);
            }
        }

        if (!empty($data['font_variants'])) $font_family['variants'] = $data['font_variants'];

        if (isset($data['line-height']) && is_numeric($data['line-height'])) $font_family['line-height'] = $data['line-height'];
        else $font_family['line-height'] = 1.0;

        return $font_family;
    }
    public function get_selected_fonts($fallback = false) {
        $fonts = [
            'default' => $this->get_selected_font('default', $fallback),
            'heading' => $this->get_selected_font('heading', $fallback),
            'decorative' => $this->get_selected_font('decorative', $fallback),
        ];
        return apply_filters('ogre/customizer/typography/get_selected_fonts', array_filter($fonts), $this);
    }
    public function get_font_url($font) {
        // Allow filter override
        $url = apply_filters('ogre/customizer/typography/get_font_url', '', $font, $this);
        if (is_string($url) && !empty($url)) return $url;

        $font_selector = str_replace(' ', '+', $font['family']);

        if (!empty($font['variants'])) {
            $font_selector .= ':ital,wght@';

            // Capture variant properties and put into array
            $variants = array_map(function ($a) {
                $italic = strpos($a, 'italic') !== false;
                $a = str_replace('italic', '', $a);

                $weight = 400;
                if (is_numeric($a)) $weight = intval($a);

                return [
                    'ital' => $italic,
                    'wght' => $weight,
                ];
            }, $font['variants']);

            // Sort variants by italized then weight
            array_multisort($variants,
                wp_list_pluck($variants, 'ital'), SORT_ASC, SORT_REGULAR,
                wp_list_pluck($variants, 'wght'), SORT_ASC, SORT_NUMERIC
            );

            // Format properties as string
            $variants = array_map(function ($a) {
                return sprintf('%s,%s', !!$a['ital'] ? '1' : '0', $a['wght']);
            }, $variants);

            $font_selector .= implode(';', $variants);
        }

        $url = add_query_arg([
            'family' => $font_selector,
            'display' => 'swap',
        ], 'https://fonts.googleapis.com/css2');
        return $url;
    }

    public function get_font_sizes() {
        $keys = ['small', 'normal', 'medium', 'large', 'huge'];

        $sizes = [];
        foreach ($keys as $key) {
            $size = $this->get_field("typography_size_{$key}");
            if (!is_array($size) || empty($size)) continue;

            $size = array_filter(array_map(function ($value) {
                return is_numeric($value) ? floatval($value) : false;
            }, $size));
            if (empty($size)) continue;

            $sizes[$key] = $size;
        }

        $sizes = array_filter(array_map(function ($size) {
            if (!isset($size['font-size'])) return false;
            return $size;
        }, $sizes));
        if (empty($sizes)) return false;

        return $sizes;
    }

    // Google Fonts API Access

    private $transient_key = 'ogretemplate_customizer_typography_fonts_data';
    private function get_api_key() {
        return apply_filters('ogre/api_key/google_fonts', 'AIzaSyDuMfynFhvbLfCd0QHp6u8GZJHOCsxfmmo');
    }
    private function _get_font_choices() {
        $result = get_transient($this->transient_key);
        if ($result !== false && !is_null($result) && is_array($result) && !empty($result)) return $result;

        $url = add_query_arg([
            'key' => $this->get_api_key(),
        ], 'https://www.googleapis.com/webfonts/v1/webfonts');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        if ($response === false || empty($response)) return false;

        $data = json_decode($response, true);
        if (is_null($data) || $data === false || !is_array($data) || empty($data)) return false;

        if (!isset($data['items']) || !is_array($data['items']) || empty($data['items'])) return false;

        set_transient($this->transient_key, $data['items'], HOUR_IN_SECONDS);
        return $data['items'];
    }
    public function get_font_choices() {
        return apply_filters('ogre/customizer/typography/get_font_choices', $this->_get_font_choices(), $this);
    }
    public function get_font_family(string $family, bool $use_key = true) {
        if (!is_string($family) || empty($family)) return false;

        $result = wp_cache_get("ogre_customizer_typography_get_font_family_{$family}");
        if ($result !== false && !is_null($result)) return $result;

        $fonts = $this->get_font_choices();
        if (!$fonts) return false;

        $font_families = wp_list_pluck($fonts, 'family');
        if (!!$use_key) $font_families = array_map('sanitize_title', $font_families);
        if (!in_array($family, $font_families)) return false;

        $key = array_search($family, $font_families);
        wp_cache_set("ogre_customizer_typography_get_font_family_{$family}", $fonts[$key]);
        return $fonts[$key];
    }
    public function get_font_variants(string $family, bool $use_key = true) {
        if (!is_string($family) || empty($family)) return false;

        $result = wp_cache_get("ogre_customizer_typography_get_font_variants_{$family}");
        if ($result !== false && !is_null($result)) return $result;

        $fonts = $this->get_font_choices();
        if (!$fonts) return false;

        if (!!$use_key) {
            array_walk($fonts, function (&$font) {
                $font['family'] = sanitize_title($font['family']);
            });
        }

        $fonts = wp_list_pluck($fonts, 'variants', 'family');
        if (!array_key_exists($family, $fonts)) return false;

        wp_cache_set("ogre_customizer_typography_get_font_variants_{$family}", $fonts[$family]);
        return $fonts[$family];
    }

    public function ajax_get_font_variants() {
        if (!isset($_POST['ogre_nonce']) || !wp_verify_nonce($_POST['ogre_nonce'], 'ogretemplate_customizer_typography_variants')) {
            wp_send_json_error(__('Permission denied.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        if (!isset($_POST['family']) || empty($_POST['family'])) {
            wp_send_json_error(__('Please provide a font family.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        $family = $_POST['family'];
        $variants = $this->get_font_variants($family);
        if (!$variants || !is_array($variants) || empty($variants)) {
            wp_send_json_error(__('Invalid font family provided or Google Fonts API request invalid.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        return wp_send_json_success($variants);
    }

    // Option Caching to reduce API requests
    private $option_key = 'ogretemplate_customizer_typography_font_data';
    private function load_option($type = false) {
        $data = get_option($this->option_key);
        if (!is_array($data)) $data = [];
        if ($type !== false && is_string($type) && !empty($type)) {
            return isset($data[$type]) && is_array($data[$type]) && !empty($data[$type]) ? $data[$type] : false;
        } else {
            return $data;
        }
    }
    private function save_option($family, $font_data, $type = 'default') {
        $data = $this->load_option();
        if (isset($data[$type]) && is_array($data[$type]) && isset($data[$type]['family']) && $data[$type]['family'] === $family) return false;
        $data[$type] = [
            'type' => $type,
            'family' => $family,
            'font' => $font_data,
        ];
        update_option($this->option_key, $data);
        return true;
    }

}

Typography::instance();
