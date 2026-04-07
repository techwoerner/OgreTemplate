<?php
/**
 * Block Name: Icon
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.4.0
 */

if (empty(get_field('icon'))) return;

global $post;

$classes = [
    'has-icon',
    sanitize_title(get_field('icon')),
];
if (!empty(get_field('font_size'))) $classes[] = sprintf('has-%s-font-size', sanitize_title(get_field('font_size')));

$attrs = \OgreCore\Blocks::get_attributes($block, $post, [
    'class' => \OgreCore\Blocks::get_classes($block, $classes),
]);

?>
<i <?php \OgreCore\Blocks::the_attributes($block, $post, $attrs); ?>></i>
