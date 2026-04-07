<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.2
 * @since 0.1.0
 */

if (!defined('ABSPATH')) exit;

use \OgreTemplate\Customizer\Header as HeaderCustomizer;
use \OgreTemplate\Customizer\Footer as FooterCustomizer;
use \OgreTemplate\Customizer\Article as ArticleCustomizer;

/**
 * General
 */
if (!function_exists('ogretemplate_container_begin')) {
    function ogretemplate_container_begin() {
        echo '<div class="container">';
    }
}
if (!function_exists('ogretemplate_container_xl_begin')) {
    function ogretemplate_container_xl_begin() {
        echo '<div class="container xl">';
    }
}
if (!function_exists('ogretemplate_container_fluid_begin')) {
    function ogretemplate_container_fluid_begin() {
        echo '<div class="container fluid">';
    }
}
if (!function_exists('ogretemplate_container_end')) {
    function ogretemplate_container_end() {
        echo '</div>';
    }
}
if (!function_exists('ogretemplate_row_begin')) {
    function ogretemplate_row_begin() {
        echo '<div class="row">';
    }
}
if (!function_exists('ogretemplate_row_end')) {
    function ogretemplate_row_end() {
        echo '</div>';
    }
}
if (!function_exists('ogretemplate_section_begin')) {
    function ogretemplate_section_begin() {
        echo '<section>';
    }
}
if (!function_exists('ogretemplate_section_end')) {
    function ogretemplate_section_end() {
        echo '</section>';
    }
}

/**
 * Header
 */
if (!function_exists('ogretemplate_header_logo')) {
    function ogretemplate_header_logo() {
        get_template_part('template-parts/header/logo', HeaderCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_header_navigation_primary')) {
    function ogretemplate_header_navigation_primary() {
        get_template_part('template-parts/header/navigation-primary', HeaderCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_header_navigation_secondary')) {
    function ogretemplate_header_navigation_secondary() {
        get_template_part('template-parts/header/navigation-secondary', HeaderCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_header_expander')) {
    function ogretemplate_header_expander() {
        get_template_part('template-parts/header/expander', HeaderCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_header_navigation_mobile')) {
    function ogretemplate_header_navigation_mobile() {
        get_template_part('template-parts/header/navigation-mobile', HeaderCustomizer::instance()->get_template());
    }
}

/**
 * Footer
 */
if (!function_exists('ogretemplate_footer_widgets_section_begin')) {
    function ogretemplate_footer_widgets_section_begin() {
        echo '<section class="site-footer__widgets">';
    }
}
if (!function_exists('ogretemplate_footer_info_section_begin')) {
    function ogretemplate_footer_info_section_begin() {
        echo '<section class="site-footer__info">';
    }
}
if (!function_exists('ogretemplate_footer_logo')) {
    function ogretemplate_footer_logo() {
        get_template_part('template-parts/footer/logo', FooterCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_footer_widgets')) {
    function ogretemplate_footer_widgets() {
        get_sidebar('footer');
    }
}
if (!function_exists('ogretemplate_footer_copyright')) {
    function ogretemplate_footer_copyright() {
        get_template_part('template-parts/footer/copyright', FooterCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_footer_menu')) {
    function ogretemplate_footer_menu() {
        get_template_part('template-parts/footer/menu', FooterCustomizer::instance()->get_template());
    }
}
if (!function_exists('ogretemplate_footer_developer')) {
    function ogretemplate_footer_developer() {
        get_template_part('template-parts/footer/developer', FooterCustomizer::instance()->get_template());
    }
}

/**
 * Article
 */

// Header
if (!function_exists('ogretemplate_article_header_begin')) {
    function ogretemplate_article_header_begin() {
        global $post;
        $classes = apply_filters('ogretemplate/article_header_classes', ['entry-header'], $post->ID, $post->post_type, $post);
        $classes = array_map('sanitize_html_class', $classes);
        printf('<header class="%s">', esc_attr(implode(' ', $classes)));
    }
}
if (!function_exists('ogretemplate_article_header_end')) {
    function ogretemplate_article_header_end() {
        echo '</header>';
    }
}
if (!function_exists('ogretemplate_article_header_image')) {
    function ogretemplate_article_header_image() {
        \Ogre::get_template_part('template-parts/article/header-image', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}
if (!function_exists('ogretemplate_article_header_title')) {
    function ogretemplate_article_header_title() {
        \Ogre::get_template_part('template-parts/article/header-title', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}
if (!function_exists('ogretemplate_article_header_meta')) {
    function ogretemplate_article_header_meta() {
        \Ogre::get_template_part('template-parts/article/header-meta', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}
if (!function_exists('ogretemplate_article_header_author')) {
    function ogretemplate_article_header_author() {
        \Ogre::get_template_part('template-parts/article/header-author', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}

// Content
if (!function_exists('ogretemplate_article_content')) {
    function ogretemplate_article_content() {
        \Ogre::get_template_part('template-parts/article/content', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}

// Footer
if (!function_exists('ogretemplate_article_footer_begin')) {
    function ogretemplate_article_footer_begin() {
        if (!apply_filters('ogretemplate/article_footer_enabled', get_post_type() != 'page')) return;

        global $post;
        $classes = apply_filters('ogretemplate/article_footer_classes', ['entry-footer'], $post->ID, $post->post_type, $post);
        $classes = array_map('sanitize_html_class', $classes);
        printf('<footer class="%s">', esc_attr(implode(' ', $classes)));
    }
}
if (!function_exists('ogretemplate_article_footer_end')) {
    function ogretemplate_article_footer_end() {
        if (!apply_filters('ogretemplate/article_footer_enabled', get_post_type() != 'page')) return;
        echo '</footer>';
    }
}
if (!function_exists('ogretemplate_article_footer_social')) {
    function ogretemplate_article_footer_social() {
        if (!apply_filters('ogretemplate/article_footer_enabled', get_post_type() != 'page')) return;
        \Ogre::get_template_part('template-parts/article/footer-social', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}
if (!function_exists('ogretemplate_article_footer_navigation')) {
    function ogretemplate_article_footer_navigation() {
        if (!apply_filters('ogretemplate/article_footer_enabled', get_post_type() != 'page')) return;
        \Ogre::get_template_part('template-parts/article/footer-navigation', [ArticleCustomizer::instance()->get_template(), get_post_type()]);
    }
}

// Archive
if (!function_exists('ogretemplate_archive_article_begin')) {
    function ogretemplate_archive_article_begin() {
        if (!apply_filters('ogretemplate/archive_article_visible', !is_singular())) return;

        $type = \OgreTemplate\Archive::get_type();

        $classes = ['single', 'single-archive'];
        if ($type == 'home') {
            $post_id = intval(get_option('page_for_posts'));
            $classes[] = sprintf('single-%s', get_post_type($post_id));
            $classes = apply_filters('ogretemplate/article_classes', $classes, $post_id, get_post_type($post_id), get_post($post_id));
            $classes = get_post_class($classes, $post_id);
        }
        $classes = apply_filters('ogretemplate/archive_classes', $classes, $type);
        $classes = array_map('sanitize_html_class', $classes);

        printf('<article id="%s" class="%s">', \OgreTemplate\Archive::get_tag_id(), implode(' ', $classes));
    }
}
if (!function_exists('ogretemplate_archive_article_end')) {
    function ogretemplate_archive_article_end() {
        if (!apply_filters('ogretemplate/archive_article_visible', !is_singular())) return;

        echo '</article>';
    }
}
if (!function_exists('ogretemplate_archive_header_begin')) {
    function ogretemplate_archive_header_begin() {
        if (!apply_filters('ogretemplate/archive_article_visible', !is_singular())) return;

        $type = \OgreTemplate\Archive::get_type();

        $classes = ['entry-header', 'archive-header'];
        if ($type == 'home') {
            $post_id = intval(get_option('page_for_posts'));
            $classes = apply_filters('ogretemplate/article_header_classes', $classes, $post_id, get_post_type($post_id), get_post($post_id));
        }
        $classes = apply_filters('ogretemplate/archive_header_classes', $classes, \OgreTemplate\Archive::get_type(), get_queried_object_id(), get_queried_object());
        $classes = array_map('sanitize_html_class', $classes);

        printf('<header class="%s">', esc_attr(implode(' ', $classes)));
    }
}
if (!function_exists('ogretemplate_archive_header_end')) {
    function ogretemplate_archive_header_end() {
        if (!apply_filters('ogretemplate/archive_article_visible', !is_singular())) return;

        echo '</header>';
    }
}
if (!function_exists('ogretemplate_archive_header_image')) {
    function ogretemplate_archive_header_image() {
        if (!apply_filters('ogretemplate/archive_article_visible', !is_singular())) return;

        $image = \OgreTemplate\Archive::get_image();

        echo \Ogre::include_template_part([
            'image' => $image,
        ], 'template-parts/article/header-image', \OgreTemplate\Archive::get_type());
    }
}
if (!function_exists('ogretemplate_archive_header_title')) {
    function ogretemplate_archive_header_title() {
        if (!apply_filters('ogretemplate/archive_article_visible', !is_singular())) return;

        $title = \OgreTemplate\Archive::get_title();
        $subtitle = \OgreTemplate\Archive::get_subtitle();
        $link = \OgreTemplate\Archive::get_link();

        echo \Ogre::include_template_part([
            'title' => $title,
            'subtitle' => $subtitle,
            'link' => $link,
        ], 'template-parts/article/header-title', \OgreTemplate\Archive::get_type());
    }
}
if (!function_exists('ogretemplate_archive_content')) {
    function ogretemplate_archive_content() {
        if (!apply_filters('ogretemplate/archive_article_content_visible', !is_singular())) return;

        $content = \OgreTemplate\Archive::get_content();

        echo \Ogre::include_template_part([
            'content' => $content,
        ], 'template-parts/article/content', \OgreTemplate\Archive::get_type());
    }
}
if (!function_exists('ogretemplate_archive_loop')) {
    function ogretemplate_archive_loop() {
        get_template_part('template-parts/archive/loop', is_post_type_archive() ? get_post_type() : '');
    }
}
if (!function_exists('ogretemplate_archive_pagination')) {
    function ogretemplate_archive_pagination() {
        if (is_singular()) return;

        get_template_part('template-parts/archive/pagination', is_post_type_archive() ? get_post_type() : '');
    }
}
