<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.3.3
 */

$classes = apply_filters('ogretemplate/header_classes', ['site-header']);
$classes = array_filter(array_map('sanitize_html_class', $classes));

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head><?php
        do_action('ogretemplate/wp_head');
    ?></head>
    <body <?php body_class(); do_action('ogre/body_tag_attributes'); ?>>
        <?php do_action('ogre/page_before'); ?>
        <div id="page" class="site">
            <?php do_action('ogre/header_before'); ?>
            <header id="masthead" class="<?php echo esc_attr(implode(' ', $classes)); ?>" role="banner"><?php
                do_action('ogre/header');
            ?></header>
            <?php do_action('ogre/header_after'); ?>
            <div id="content" class="site-content full-height has-header has-footer min-height">
