<?php
/**
 * Block Name: Slider
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.2
 * @since 0.4.2
 */

use \OgreCore\Blocks;

$variableWidth = !!get_field('variable_width');
$infinite = !!get_field('infinite');
$autoplay = !!get_field('autoplay');
$fade = !!get_field('fade');
$arrows = !!get_field('arrows');
$dots = !!get_field('dots');

$slidesToShow = get_field('slides_to_show');
if (!is_numeric($slidesToShow)) $slidesToShow = 1;

$classes = ['slider', 'swipe-to'];
$data = [
    'slides-to-show' => intval($slidesToShow),
];

if (!!$variableWidth) {
    $classes[] = 'variable-width';
    unset($data['slides-to-show']);
}

if (!!$infinite) {
    $classes[] = 'infinite';
}

if (!!$autoplay) {
    $classes[] = 'autoplay';
}

if (!!$fade) {
    $classes[] = 'fade';
}

if (!!$arrows) {
    $classes[] = 'arrows';
}

if (!!$dots) {
    $classes[] = 'dots';
}

if ($slidesToShow > 1) {
    $data['responsive'] = [[
        'breakpoint' => 1199,
        'settings' => [
            'slidesToShow' => 1,
        ],
    ]];
}

$classes = apply_filters('ogretemplate/block/slider/classes', $classes);
$data = apply_filters('ogretemplate/block/slider/data', $data);

Blocks::the_tag_open($block);

printf(
    '<div class="%s" %s><InnerBlocks /></div>',
    implode(' ', array_map('sanitize_html_class', $classes)),
    implode(' ', array_filter(array_map(function ($key, $value) {
        if (is_array($value)) $value = json_encode($value);
        if (!is_string($key)) return strval($value);
        if (is_bool($value)) return !!$value ? $key : false;
        return sprintf(
            'data-%s="%s"',
            esc_attr(sanitize_title($key)),
            esc_attr(strval($value))
        );
    }, array_keys($data), array_values($data))))
);

Blocks::the_tag_close();
