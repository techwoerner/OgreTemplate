<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.2.0
 */

if (!has_nav_menu('primary')) return;

?>
<nav id="site-navigation" class="main-navigation primary-navigation" role="navigation"><?php
    wp_nav_menu([
        'theme_location' => 'primary',
        'container' => false,
        'menu_class' => 'menu menu-primary',
    ]);
?></nav>
