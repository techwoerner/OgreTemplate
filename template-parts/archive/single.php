<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.2
 * @version 0.3.2
 */

$template_html = \Ogre::load_template_part(
    apply_filters('ogre/single_template', 'template-parts/content/content', get_the_ID()),
    get_post_type()
);
$template_html = apply_filters('ogre/single_template_html', $template_html, get_the_ID());
echo $template_html;
