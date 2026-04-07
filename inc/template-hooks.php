<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.3.0
 */

if (!defined('ABSPATH')) exit;

/**
 * Header
 */
add_action('ogre/header', 'ogretemplate_container_begin', 1);
add_action('ogre/header', 'ogretemplate_header_logo', 10);
add_action('ogre/header', 'ogretemplate_header_navigation_primary', 20);
add_action('ogre/header', 'ogretemplate_header_navigation_secondary', 30);
add_action('ogre/header', 'ogretemplate_header_expander', 40);
add_action('ogre/header', 'ogretemplate_container_end', 99);
add_action('ogre/header', 'ogretemplate_header_navigation_mobile', 110);

/**
 * Footer
 */
add_action('ogre/footer', 'ogretemplate_footer_widgets_section_begin', 1);
add_action('ogre/footer', 'ogretemplate_container_begin', 2);
add_action('ogre/footer', 'ogretemplate_row_begin', 3);
add_action('ogre/footer', 'ogretemplate_footer_logo', 10);
add_action('ogre/footer', 'ogretemplate_footer_widgets', 20);
add_action('ogre/footer', 'ogretemplate_row_end', 97);
add_action('ogre/footer', 'ogretemplate_container_end', 98);
add_action('ogre/footer', 'ogretemplate_section_end', 99);
add_action('ogre/footer', 'ogretemplate_footer_info_section_begin', 101);
add_action('ogre/footer', 'ogretemplate_container_begin', 102);
add_action('ogre/footer', 'ogretemplate_row_begin', 103);
add_action('ogre/footer', 'ogretemplate_footer_copyright', 120);
add_action('ogre/footer', 'ogretemplate_footer_menu', 130);
add_action('ogre/footer', 'ogretemplate_footer_developer', 140);
add_action('ogre/footer', 'ogretemplate_row_end', 197);
add_action('ogre/footer', 'ogretemplate_container_end', 198);
add_action('ogre/footer', 'ogretemplate_section_end', 199);

/**
 * Article
 */
add_action('ogre/article', 'ogretemplate_article_header_begin', 1);
add_action('ogre/article', 'ogretemplate_article_header_image', 10);
add_action('ogre/article', 'ogretemplate_container_begin', 15);
add_action('ogre/article', 'ogretemplate_article_header_title', 20);
add_action('ogre/article', 'ogretemplate_article_header_meta', 30);
add_action('ogre/article', 'ogretemplate_article_header_author', 40);
add_action('ogre/article', 'ogretemplate_container_end', 95);
add_action('ogre/article', 'ogretemplate_article_header_end', 99);
add_action('ogre/article', 'ogretemplate_article_content', 100);
add_action('ogre/article', 'ogretemplate_article_footer_begin', 201);
add_action('ogre/article', 'ogretemplate_article_footer_social', 210);
add_action('ogre/article', 'ogretemplate_article_footer_navigation', 220);
add_action('ogre/article', 'ogretemplate_article_footer_end', 299);

/**
 * Archive
 */
add_action('ogre/archive_before', 'ogretemplate_archive_article_begin', 1);
add_action('ogre/archive_before', 'ogretemplate_archive_header_begin', 100);
add_action('ogre/archive_before', 'ogretemplate_archive_header_image', 110);
add_action('ogre/archive_before', 'ogretemplate_container_begin', 115);
add_action('ogre/archive_before', 'ogretemplate_archive_header_title', 120);
add_action('ogre/archive_before', 'ogretemplate_container_end', 185);
add_action('ogre/archive_before', 'ogretemplate_archive_header_end', 190);
add_action('ogre/archive_before', 'ogretemplate_archive_content', 200);
add_action('ogre/archive_before', 'ogretemplate_archive_article_end', 999);

add_action('ogre/archive', 'ogretemplate_archive_loop', 10);
add_action('ogre/archive', 'ogretemplate_archive_pagination', 20);
