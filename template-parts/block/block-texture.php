<?php
/**
 * Block Name: Texture
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.1
 * @version 0.3.1
 */

global $post;

$image = get_field('image');
$size = !empty(get_field('size')) ? get_field('size') : 'extra-large';
$fit = !empty(get_field('fit')) ? get_field('fit') : 'cover';

if (is_admin()) {
    if (empty($image)) {
        \OgreCore\Blocks::print_block_message(__('Select an image in the block settings.', wp_get_theme(get_template())->get('TextDomain')));
    } else {
        \OgreCore\Blocks::print_block_image($image, $size);
    }
    return;
} else if (!is_admin() && empty($image)) {
    return;
}

$position = !empty(get_field('position')) ? get_field('position') : 'center';
$opacity = is_numeric(get_field('opacity')) ? intval(get_field('opacity')) : 100;
$index = is_numeric(get_field('index')) ? intval(get_field('index')) : 20;

$attrs = \OgreCore\Blocks::get_attributes($block, $post, [
    'class' => \OgreCore\Blocks::get_classes($block, [
        sprintf('position-%s', $position),
        'has-background-dim',
        sprintf('has-background-dim-%d', $opacity),
        "has-image-size-{$size}",
        "has-image-fit-{$fit}",
    ]),
    'style' => [
        'z-index' => strval(intval($index)),
    ],
]);

if ($fit == 'repeat') $attrs['style']['background-image'] = sprintf('url(%s)', $image['sizes'][$size]);

if (is_array($attrs['class'])) $attrs['class'] = implode(' ', $attrs['class']);
if (is_array($attrs['style'])) $attrs['style'] = implode(' ', array_map(function ($key, $value) { return sprintf('%s: %s;', $key, $value); }, array_keys($attrs['style']), array_values($attrs['style'])));

\Ogre::the_acf_responsive_image($image, $size, $attrs);
