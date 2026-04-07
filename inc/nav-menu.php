<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.2.0
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

class NavMenu {

    public static function load() {
        // Nav Menu Item Icon Classes
        if (class_exists('\Ogre')) \Ogre::maybe_add_action('acf/init', [__CLASS__, 'init_field_group']);
        add_filter('nav_menu_css_class', [__CLASS__, 'menu_item_classes'], 10, 4);

        // Alternate menu for mobile navigation
        add_filter('ogre/header/mobile_nav_location', [__CLASS__, 'alternate_mobile_location'], 10, 1);
    }

    static function init_field_group() {
        if (\Ogre::field_group_exists(__('Menu Item [Icons]', wp_get_theme(get_template())->get('TextDomain'))) || !function_exists('acf_add_local_field_group')) return;

        $file_name = 'menu-item-icons';
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

    static function menu_item_classes($classes, $item, $args, $depth) {
        $icon_alias = get_field('icon', $item);
        if (empty($icon_alias)) return $classes;

        $classes[] = 'has-icon';
        $classes[] = $icon_alias;

        $icon_only = get_field('icon_only', $item) === true;
        if (!!$icon_only) $classes[] = 'icon-only';

        return $classes;
    }

    // Alternate menu for mobile navigation

    static function alternate_mobile_location($theme_location) {
        if (!has_nav_menu($theme_location)) {
            $theme_location = 'primary';
        }
        return $theme_location;
    }

}

\OgreTemplate\NavMenu::load();
