<?php
/**
 * Block Name: Navigation Menu
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.1
 * @version 0.3.3
 */

$title = get_field('title');
$menu_id = get_field('menu');
if (is_numeric($menu_id) || is_nav_menu(intval($menu_id))) $menu_id = intval($menu_id);

if (is_admin() && !is_int($menu_id)) {
    \OgreCore\Blocks::print_block_message(__('Select a menu in the block settings.', wp_get_theme(get_template())->get('TextDomain')));
}
if (!is_int($menu_id)) return;

?>
<nav <?php \OgreCore\Blocks::the_attributes($block); ?>>
    <?php if (!empty($title)) { ?>
    <h2 class="ogre-block-menu__title"><?php esc_html_e($title); ?></h2>
    <?php } ?>
    <?php
    $html = wp_nav_menu(apply_filters('ogretemplate/block/menu/args', [
        'menu' => $menu_id,
        'echo' => false,
        'container' => false,
    ], $block));
    if (is_admin()) {
        $html = str_replace(['<a ', '</a>'], ['<span ', '</span>'], $html);
    }
    echo $html;
    ?>
</nav>
