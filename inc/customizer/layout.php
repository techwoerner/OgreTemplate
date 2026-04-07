<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.3.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Layout extends Section {

    public function __construct() {
        $this->priority = 20;
        $this->title = __('Layout', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Set the width of your content.', wp_get_theme(get_template())->get('TextDomain'));
        $this->is_editor = true;

        parent::__construct();

        add_filter('block_editor_settings_all', [$this, 'editor_settings'], 20, 2);
        add_filter('ogretemplate/theme-json/settings', [$this, 'theme_settings'], 10, 1);
    }

    // Frontend

    public function output() {
        $containers = $this->get_containers();
        $margins = $this->get_margins();
        $gutter = $this->get_gutter();

        if (empty($containers) && empty($margins) && !$gutter) return;

        $variables = [];

        if (!empty($containers)) {
            foreach ($containers as $key => $value) {
                $variables[] = new Variable([
                    'key' => sprintf('global--inner-container-%s', $key),
                    'value' => intval($value),
                    'format' => '%d',
                    'append' => 'px',
                ]);
            }
        }

        if (!empty($margins)) {
            foreach ($margins as $key => $value) {
                $variables[] = new Variable([
                    'key' => sprintf('global--margin-%s', $key),
                    'value' => intval($value),
                    'format' => '%d',
                    'append' => 'px',
                ]);
            }
        }

        if (!!$gutter) {
            $variables[] = new Variable([
                'key' => 'global--grid-gutter',
                'value' => intval($gutter),
                'format' => '%d',
                'append' => 'px',
            ]);
        }

        $this->output_css($variables);
    }

    public function editor_settings($settings, $block_editor_context) {
        $containers = $this->get_containers();
        if (!$containers || !is_array($containers) || !isset($containers['lg']) || !isset($containers['xl'])) return $settings;

        $settings = array_replace_recursive($settings, ['__experimentalFeatures' => ['layout' => [
            'contentSize' => sprintf('%dpx', intval($containers['lg'])),
            'wideSize' => sprintf('%dpx', intval($containers['xl'])),
        ]]]);

        return $settings;
    }

    public function theme_settings($settings) {
        $containers = $this->get_containers();
        if (!$containers || !is_array($containers) || !isset($containers['lg']) || !isset($containers['xl'])) return $settings;

        $settings = array_replace_recursive($settings, ['settings' => ['layout' => [
            'contentSize' => sprintf('%dpx', intval($containers['lg'])),
            'wideSize' => sprintf('%dpx', intval($containers['xl'])),
        ]]]);

        return $settings;
    }

    // Data Getters

    public function get_containers() {
        $arr = $this->get_field('layout_containers');
        if (!is_array($arr) || empty($arr)) return false;

        $arr = array_filter($arr, function ($value) {
            return is_numeric($value) && intval($value) > 0;
        });
        if (empty($arr)) return false;

        return $arr;
    }

    public function get_gutter() {
        $value = $this->get_field('layout_gutter');
        return is_numeric($value) && intval($value) > 0 ? intval($value) : false;
    }

    public function get_margins() {
        $arr = $this->get_field('layout_margins');
        if (!is_array($arr) || empty($arr)) return false;

        $arr = array_filter(array_map(function ($value) {
            return is_numeric($value) && intval($value) > 0 ? intval($value) : false;
        }, $arr));
        if (empty($arr)) return false;

        return $arr;
    }

}

Layout::instance();
