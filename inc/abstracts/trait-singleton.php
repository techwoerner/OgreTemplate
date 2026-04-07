<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.3
 * @since 0.4.3
 */

namespace OgreTemplate;

if (!defined('ABSPATH')) exit;

trait Singleton {

    private static $instances = [];
    private static $instance_classes = [];
    final public static function instance() {
        $class = get_called_class();
        if (in_array($class, self::$instance_classes)) return self::$instances[array_search($class, self::$instance_classes)];

        self::$instances[] = new $class();
        self::$instance_classes[] = $class;

        return self::$instances[count(self::$instances) - 1];
    }

}
