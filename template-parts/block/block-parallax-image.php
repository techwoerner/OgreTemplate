<?php
/**
 * Block Name: Parallax Background
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.2
 * @version 0.3.3
 */

global $post;

$image = get_field('image');
$opacity = is_numeric(get_field('opacity')) ? intval(get_field('opacity')) : 100;

if (is_admin()) {
    if (empty($image)) {
        \OgreCore\Blocks::print_block_message(__('Select an image in the block settings.', wp_get_theme(get_template())->get('TextDomain')));
    } else {
        \OgreCore\Blocks::print_block_image($image, 'extra-large', $opacity);
    }
    return;
} else if (!is_admin() && empty($image)) {
    return;
}

$attrs = \OgreCore\Blocks::get_attributes($block, $post, [
    'class' => \OgreCore\Blocks::get_classes($block, [
        'wp-block-image',
        sprintf('has-dim-%d', is_numeric(get_field('opacity')) ? get_field('opacity') : 100),
        sprintf('position-%s', !empty(get_field('position')) ? get_field('position') : 'top'),
    ]),
    'style' => [
        sprintf('z-index: %d;', is_numeric(get_field('z-index')) ? intval(get_field('z-index')) : 5),
    ],
]);

$data = [
    'rate' => is_numeric(get_field('rate')) ? floatval(get_field('rate')) : 1,
    'center-origin' => get_field('center_origin') === true,
    'bottom-origin' => get_field('bottom_origin') === true,
    'stop-origin' => get_field('stop_origin') === true,
    'fade' => get_field('fade') === true,
    'fade-rate' => is_numeric(get_field('fade_rate')) ? floatval(get_field('fade_rate')) : 1,
    'fade-stop-origin' => get_field('fade_stop_origin') === true,
    'transform-disabled' => get_field('transform_disabled') === true,
    'transform-custom' => [
        'x' => get_field('transform_disabled') === true && is_numeric(get_field('transform_custom_x')) ? intval(get_field('transform_custom_x')) : 0,
        'y' => get_field('transform_disabled') === true && is_numeric(get_field('transform_custom')) ? intval(get_field('transform_custom')) : 0,
    ],
];

$image_attrs = [
    'style' => [],
];

if (!$data['transform-disabled']) {
    $attrs['class'][] = 'has-transform';
} else if (is_array($data['transform-custom']) && is_int($data['transform-custom']['x']) && is_int($data['transform-custom']['y'])) {
    $image_attrs['style'][] = sprintf('-webkit-transform: translate3d(%d%%, %d%%, 0);', $data['transform-custom']['x'], $data['transform-custom']['y']);
    $image_attrs['style'][] = sprintf('-moz-transform: translate3d(%d%%, %d%%, 0);', $data['transform-custom']['x'], $data['transform-custom']['y']);
    $image_attrs['style'][] = sprintf('-ms-transform: translate3d(%d%%, %d%%, 0);', $data['transform-custom']['x'], $data['transform-custom']['y']);
    $image_attrs['style'][] = sprintf('-o-transform: translate3d(%d%%, %d%%, 0);', $data['transform-custom']['x'], $data['transform-custom']['y']);
    $image_attrs['style'][] = sprintf('transform: translate3d(%d%%, %d%%, 0);', $data['transform-custom']['x'], $data['transform-custom']['y']);
}

?>
<figure <?php \OgreCore\Blocks::the_attributes($block, $post, $attrs); ?>>
    <span class="parallax"<?php foreach ($data as $key => $value) {
        if (is_bool($value)) {
            $value = $value === true ? 'true' : 'false';
        } else if (is_array($value)) {
            $value = implode(' ', array_map('strval', $value));
        }
        printf(' data-%s="%s"', sanitize_title($key), esc_attr(strval($value)));
    }; ?>><?php
        \Ogre::the_acf_responsive_image($image, 'extra-large', $image_attrs);
    ?></span>
</figure>
