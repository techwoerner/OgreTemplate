<?php
/**
 * Block Name: Sidebar
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.4.0
 */

$sidebar_id = get_field('sidebar');

if (is_admin() && empty($sidebar_id)) {
    \OgreCore\Blocks::print_block_message(__('Select a sidebar in the block settings.', wp_get_theme(get_template())->get('TextDomain')));
    return;
}

if (is_admin() && !is_active_sidebar($sidebar_id)) {
    \OgreCore\Blocks::print_block_message(__('Invalid sidebar selected or no widgets available.', wp_get_theme(get_template())->get('TextDomain')));
    return;
}

if (empty($sidebar_id) || !is_active_sidebar($sidebar_id)) return;

$classes = [
	'sidebar',
	sprintf('sidebar-%s', $sidebar_id),
	'widget-area',
];
$classes = apply_filters('ogretemplate/archive/sidebar_classes', $classes, $sidebar_id);

printf(
    '<aside id="secondary-%s" class="sidebar sidebar-%s widget-area" role="complementary"%s>',
    esc_attr(sanitize_title($block['id'])),
    esc_attr(sanitize_title($sidebar_id)),
    (is_admin() ? ' style="pointer-events:none;"' : '')
);
dynamic_sidebar($sidebar_id);
echo '</aside>';
