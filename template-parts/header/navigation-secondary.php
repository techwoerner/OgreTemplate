<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.2.0
 */

if (!has_nav_menu('secondary')) return;

?>
<nav class="secondary-navigation" role="navigation"><?php
    wp_nav_menu([
        'theme_location' => 'secondary',
        'container' => false,
        'menu_class' => 'menu menu-secondary',
    ]);
?></nav>
