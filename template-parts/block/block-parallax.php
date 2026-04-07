<?php
/**
 * Block Name: Parallax
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.2
 * @version 0.3.3
 */

global $post;

if (is_admin()) { ?>
<InnerBlocks />
<?php
    return;
}

$attrs = \OgreCore\Blocks::get_attributes($block, $post, [
    'class' => \OgreCore\Blocks::get_classes($block, [
        'wp-block-group',
        'parallax',
        sprintf('position-%s', !empty(get_field('position')) ? get_field('position') : 'top'),
    ]),
    'style' => [
        sprintf('z-index: %d;', is_numeric(get_field('z-index')) ? intval(get_field('z-index')) : 5),
    ],
    'data' => [
        'rate' => is_numeric(get_field('rate')) ? floatval(get_field('rate')) : 1,
        'center-origin' => get_field('center_origin') === true,
        'bottom-origin' => get_field('bottom_origin') === true,
        'stop-origin' => get_field('stop_origin') === true,
        'fade' => get_field('fade') === true,
        'fade-rate' => is_numeric(get_field('fade_rate')) ? floatval(get_field('fade_rate')) : 1,
        'fade-stop-origin' => get_field('fade_stop_origin') === true,
    ],
]);

?>
<div <?php \OgreCore\Blocks::the_attributes($block, $post, $attrs); ?>>
    <div class="wp-block-group__inner-container">
        <InnerBlocks />
    </div>
</div>
