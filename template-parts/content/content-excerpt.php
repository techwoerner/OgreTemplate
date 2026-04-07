<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.2
 * @since 0.1.0
 */

do_action('ogre/excerpt_before', get_the_ID());

echo '<article id="excerpt-';
the_ID();
echo '" ';
post_class('excerpt');
echo '>';
do_action('ogre/excerpt_inner_before', get_the_ID());

get_template_part('template-parts/excerpt/image', get_post_type());

do_action('ogre/excerpt_header_outer_before', get_the_ID());
echo '<header class="entry-header">';
do_action('ogre/excerpt_header_before', get_the_ID());
get_template_part('template-parts/excerpt/title', get_post_type());
get_template_part('template-parts/article/header-meta', get_post_type());
do_action('ogre/excerpt_header', get_the_ID());
do_action('ogre/excerpt_header_after', get_the_ID());
echo '</header>';
do_action('ogre/excerpt_header_outer_after', get_the_ID());

get_template_part('template-parts/excerpt/excerpt', get_post_type());

do_action('ogre/excerpt_footer_outer_before', get_the_ID());
echo '<footer class="entry-footer">';
do_action('ogre/excerpt_footer_before', get_the_ID());
get_template_part('template-parts/excerpt/link', get_post_type());
do_action('ogre/excerpt_footer', get_the_ID());
do_action('ogre/excerpt_footer_after', get_the_ID());
echo '</footer>';
do_action('ogre/excerpt_footer_outer_after', get_the_ID());

do_action('ogre/excerpt_inner_after', get_the_ID());
echo '</article>';

do_action('ogre/excerpt_after', get_the_ID());
