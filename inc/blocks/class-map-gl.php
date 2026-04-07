<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.4
 * @since 0.4.3
 */

namespace OgreTemplate\Blocks;

if (!defined('ABSPATH')) exit;

use OgreCore\Blocks as CoreBlocks;

class MapGL extends Block {

    public const SCRIPT_MODULE = 'maps_gl';

    public function __construct() {
        $this->description = __('Display a MapLibre GL map.', wp_get_theme(get_template())->get('TextDomain'));
        $this->icon = 'admin-site';
        $this->tag = 'figure';
        parent::__construct('map-gl', __('Map (GL)', wp_get_theme(get_template())->get('TextDomain')));
    }

    public function init() {
        parent::init();
        add_filter('acf/load_field/key=field_6584a556b6958', [$this, 'populate_style_choices'], 10, 1);
        add_filter('ogretemplate/default_script_modules', [$this, 'enable_script_module'], 10, 1);
    }

    public function enqueue_scripts() {
        wp_enqueue_script('maplibre-gl', 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js', [], wp_get_theme(get_template())->get('Version'), true);
        wp_enqueue_style('maplibre-gl', 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css', [], wp_get_theme(get_template())->get('Version'));
    }

    public function enable_script_module($modules) {
        if (!in_array(self::SCRIPT_MODULE, $modules)) $modules[] = self::SCRIPT_MODULE;
        return $modules;
    }

    protected function get_styles_url():string {
        return apply_filters('ogretemplate/blocks/map-gl/get_styles_url', 'https://tiles.cleverogre.com/styles.json', $this);
    }

    private function get_styles():array {
        /**
         * version: #
         * name: Title
         * id: slug
         * url: https://...
         */
        
        $styles = get_transient('ogre_blocks_map-gl_styles');
        if (is_null($styles) || !is_array($styles) || empty($styles)) {
            $styles = $this->_get_styles();
            if (!empty($styles)) set_transient('ogre_blocks_map-gl_styles', $styles, HOUR_IN_SECONDS);
        }

        return (array)apply_filters('ogretemplate/blocks/map-gl/get_styles', $styles, $this);
    }
    private function _get_styles():array {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->get_styles_url());
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        if ($response !== false && empty($response)) return [];

        $styles = json_decode($response, true);
        if (is_null($styles) || $styles === false || !is_array($styles) || empty($styles)) return [];

        // Remove port number from urls
        $styles = array_map(function ($style) {
            $style['url'] = str_replace(':8080', '', $style['url']);
            return $style;
        }, $styles);

        return $styles;
    }

    private function get_style(string $id):array {
        if (empty($id)) return [];

        $style = wp_cache_get("ogre_blocks_map-gl_get_style_{$id}");
        if (is_null($style) || !is_array($style) || empty($style)) {
            $style = $this->_get_style($id);
            if (!empty($style)) wp_cache_set("ogre_blocks_map-gl_get_style_{$id}", $style);
        }

        $style = apply_filters('ogretemplate/blocks/map-gl/get_style', $style, $id, $this);
        $style = apply_filters("ogretemplate/blocks/map-gl/get_style_{$id}", $style, $this);
        return $style;
    }
    private function _get_style(string $id):array {
        $styles = $this->get_styles();
        if (empty($styles)) return [];

        $style_ids = wp_list_pluck($styles, 'id');
        if (!in_array($id, $style_ids)) return [];

        $style_key = array_search($id, $style_ids);
        if (!array_key_exists($style_key, $styles)) return [];

        return $styles[$style_key];
    }

    private function get_style_url(string $id):string {
        $style = $this->get_style($id);
        if (empty($style) || !isset($style['url'])) return '';
        return (string)$style['url'];
    }

    public function populate_style_choices(array $field):array {
        $styles = $this->get_styles();
        if (!empty($styles)) $field['choices'] = wp_list_pluck($styles, 'name', 'id');
        return $field;
    }

    protected function get_map_attributes():array {
        $attributes = [
            'style' => $this->get_style_url(get_field('style')),
            'zoom' => is_numeric(get_field('zoom')) ? intval(get_field('zoom')) : 14,
        ];
        $this->append_choice_attributes('field_65971d9f28f3b', $attributes);
        return apply_filters('ogretemplate/blocks/map-gl/get_map_attributes', $attributes, $this);
    }

    protected function get_map_item_types():array {
        return ['marker', 'geojson'];
    }

    protected function get_map_item(array $item):string {
        if (empty($item) || !array_key_exists('acf_fc_layout', $item) || empty($item['acf_fc_layout']) || !in_array($item['acf_fc_layout'], $this->get_map_item_types())) return '';
        $attributes = $this->get_map_item_attributes($item['acf_fc_layout'], $item);
        if (empty($attributes)) return '';
        return sprintf(
            '<span class="ogre-map-gl-item" %s></span>',
            $this->implode_data_attributes($attributes)
        );
    }

    protected function get_map_item_attributes(string $type, array $data):array {
        $attributes = [
            'type' => $type,
        ];

        switch ($type) {

            case 'marker':
                if (!array_key_exists('location', $data) || !is_array($data['location']) || empty($data['location'])) return [];
                $attributes['lat'] = $data['location']['lat'];
                $attributes['lng'] = $data['location']['lng'];
                if (array_key_exists('title', $data) && !empty($data['title'])) $attributes['title'] = $data['title'];
                if (array_key_exists('content', $data) && !empty($data['content'])) $attributes['content'] = $data['content'];
                break;

            case 'geojson':
                if (!array_key_exists('file', $data) || !is_string($data['file']) || empty($data['file'])) return [];
                $attributes['url'] = $data['file'];

                if (!array_key_exists('type', $data) || !is_array($data['type'])) $data['type'] = [];
                $this->append_choice_attributes('field_65971bb732263', $attributes, $data['type']);

                if (in_array('fill', $data['type'])) {
                    if (array_key_exists('fill_color', $data)) $this->append_color_attributes('fill', $data['fill_color'], $attributes);
                }

                if (in_array('line', $data['type'])) {
                    if (array_key_exists('line_color', $data)) $this->append_color_attributes('line', $data['line_color'], $attributes);
                    if (array_key_exists('line_width', $data)) $attributes['line-width'] = $data['line_width'];
                }

                if (in_array('circle', $data['type'])) {
                    if (array_key_exists('circle_color', $data)) $this->append_color_attributes('circle', $data['circle_color'], $attributes);
                    if (array_key_exists('circle_radius', $data)) $attributes['circle-radius'] = $data['circle_radius'];
                    if (array_key_exists('circle_stroke_color', $data)) $this->append_color_attributes('circle-stroke', $data
                    ['circle_stroke_color'], $attributes);
                    if (array_key_exists('circle_stroke_width', $data)) $attributes['circle-stroke-width'] = $data['circle_stroke_width'];
                }
                break;

        }

        if (array_key_exists('link', $data) && !empty($data['link'])) {
            $attributes['href'] = $data['link']['url'];
            $attributes['target'] = $data['link']['target'] ? $data['link']['target'] : '_self';
        }

        $attributes = apply_filters('ogretemplate/blocks/map-gl/get_map_item_attributes', $attributes, $type, $data, $this);
        $attributes = apply_filters("ogretemplate/blocks/map-gl/get_map_item_attributes_{$type}", $attributes, $data, $this);
        return (array)$attributes;
    }

    public function render(array $block, int $post_id) {
        if (is_admin()) {
            CoreBlocks::print_block_message($this->description);
            return;
        }

        $items = get_field('items');
        if (empty($items)) return;

        printf(
            '<div class="wp-block-map-gl__map ogre-map-gl" %s>',
            $this->implode_data_attributes($this->get_map_attributes())
        );

        foreach ($items as $item) {
            echo $this->get_map_item($item);
        }

        echo '</div>';

        if (!empty(get_field('caption'))) {
            printf(
                '<figcaption class="wp-block-map-gl__caption">%s</figcaption>',
                esc_html(get_field('caption'))
            );
        }
    }

    protected function implode_attributes(array $attributes, string $prepend = ''):string {
        if (empty($attributes)) return '';
        return implode(' ', array_map(function ($key, $value) use ($prepend) {
            return sprintf(
                '%s%s="%s"',
                esc_attr($prepend),
                esc_attr(sanitize_title($key)),
                esc_attr(strval($value))
            );
        }, array_keys($attributes), array_values($attributes)));
    }
    protected function implode_data_attributes(array $attributes):string {
        return $this->implode_attributes($attributes, 'data-');
    }

    private function append_choice_attributes(string $field_key, array &$attributes, array $value = null) {
        $field = get_field_object($field_key);
        if (is_null($value)) $value = get_field($field['name']);
        if (!is_array($value)) $value = [];
        if (isset($field['choices']) && !empty($field['choices'])) {
            foreach ($field['choices'] as $name => $label) {
                $attributes[$name] = in_array($name, $value) ? 'true' : 'false';
            }
        }
    }
    private function append_color_attributes(string $name, $value, array &$attributes) {
        if (is_string($value) && !empty($value)) $value = get_field($value);
        if (!is_array($value) || !array_key_exists('red', $value)) return;

        $color = '#';
        foreach (['red', 'green', 'blue'] as $key) {
            if (!isset($value[$key])) $value[$key] = 0;
            $color .= str_pad(dechex($value[$key]), 2, '0', STR_PAD_LEFT);
        }
        $attributes["{$name}-color"] = $color;

        if (array_key_exists('alpha', $value)) $attributes["{$name}-opacity"] = $value['alpha'];
    }

}

// NOTE: `add_theme_support('ogre/maps-gl')` must be called earlier than after_theme_setup.
if (!!get_theme_support('ogre/maps-gl')) MapGL::instance();
