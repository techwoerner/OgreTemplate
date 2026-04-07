<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.3.0
 */

if (!class_exists('\OgreTemplate\Customizer\Header')) return;

\OgreTemplate\Customizer\Header::instance()->the_logo_edit();

$image = \OgreTemplate\Customizer\Header::instance()->get_logo();
if (empty($image)) return;

\Ogre::the_acf_responsive_image($image, 'medium', [
    'alt' => get_bloginfo('name'),
    'title' => get_bloginfo('description'),
    'class' => 'site-branding__image',
]);
