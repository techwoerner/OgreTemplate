<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.2
 * @since 0.3.4
 */

use \OgreTemplate\Article;

if (!isset($post_id)) $post_id = false;
if (!isset($image)) $image = false;

$image = Article::get_header_image($post_id, $image);
if (empty($image)) return;

echo apply_filters('ogretemplate/article_header_image_html', \Ogre::get_acf_responsive_image(
    $image,
    apply_filters('ogretemplate/article_header_image_size', 'extra-large', $image, $post_id),
    apply_filters('ogretemplate/article_header_image_args', [
        'class' => 'entry-image',
    ], $image, $post_id)
), $image, $post_id);
