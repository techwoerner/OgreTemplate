<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.3.1
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

class Fields {

    public static function load() {
        add_action('acf/include_field_types', [__CLASS__, 'include_field_types']);
    }

    static function include_field_types() {
        include_once('fields/nav-menu.php'); // Nav Menu Field
    }

}

\OgreTemplate\Fields::load();
