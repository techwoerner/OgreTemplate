<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.3.4
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

class ThemeJSON {

    public static function load() {
        add_action('init', [__CLASS__, 'setup'], 100);
    }

    static function setup() {
        if (get_theme_support('ogre/theme-json')) {
            self::maybe_generate_cache();
            add_action('current_screen', [__CLASS__, 'maybe_generate_screen'], 10, 1);
            add_filter('customize_save_response', [__CLASS__, 'maybe_generate_customizer'], 10, 2);
        } else {
            self::delete();
            if (!is_admin()) add_action('wp_enqueue_scripts', [__CLASS__, 'dequeue_global_styles'], 22);
        }
    }

    static function maybe_generate_cache() {
        if (!is_admin()) return;
        if (!function_exists('is_plugin_active') || !is_plugin_active('wp-rocket/wp-rocket.php')) return;
        add_action('admin_post_purge_cache', [__CLASS__, 'generate'], 1);
    }

    static function maybe_generate_screen($current_screen) {
        if ($current_screen->id != 'dashboard') return;
        self::generate();
    }

    static function maybe_generate_customizer($response, $manager) {
        self::generate();
        return $response;
    }

    static function dequeue_global_styles() {
        // Remove Gutenberg Global Variables
        wp_dequeue_style('global-styles');
    }

    public static function generate() {
        $json = [];

        $path_format = '%s/assets/json/theme.json';
        $paths = [
            sprintf($path_format, get_template_directory()),
        ];
        if (get_template_directory() !== get_stylesheet_directory()) {
            $paths[] = sprintf($path_format, get_stylesheet_directory());
        }
        $paths = apply_filters('ogretemplate/theme-json/json_paths', $paths);

        foreach ($paths as $path) {
            if (file_exists($path)) {
                $path_json = json_decode(file_get_contents($path), JSON_OBJECT_AS_ARRAY);
                if (is_array($path_json) && !empty($path_json)) {
                    $json = array_replace_recursive($json, $path_json);
                }
            }
        }

        $json = apply_filters('ogretemplate/theme-json/settings', $json);

        $output_path = apply_filters('ogretemplate/theme-json/output_path', sprintf('%s/theme.json', get_template_directory()), $json);
        if (empty($json)) { // Remove if empty
            return !!unlink($output_path);
        } else {
            return file_put_contents($output_path, json_encode($json)) !== false;
        }
    }

    protected static function get_path() {
        return apply_filters('ogretemplate/theme-json/output_path', sprintf('%s/theme.json', get_template_directory()));
    }

    protected static function write($data) {
        if (empty($data)) {
            return self::delete();
        } else {
            return file_put_contents(self::get_path(), json_encode($data)) !== false;
        }
    }

    protected static function delete() {
        $path = self::get_path();
        return file_exists($path) ? !!unlink($path) : false;
    }

}

ThemeJSON::load();
