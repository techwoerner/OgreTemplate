<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.2
 * @version 0.3.2
 */

$template_html = \Ogre::load_template_part(
    apply_filters('ogre/excerpt_template', 'template-parts/content/content-excerpt', get_the_ID()),
    apply_filters('ogre/excerpt_template_modifier', get_post_type(), get_the_ID())
);
$template_html = apply_filters('ogre/excerpt_template_html', $template_html, get_the_ID());
echo $template_html;
