<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.3
 * @since 0.3.0
 */

global $post;
if (!isset($post_id)) $post_id = false;
if (!is_null($post) && is_a($post, 'WP_Post')) $post_id = $post->ID;
if (is_home() && is_numeric(get_option('page_for_posts'))) {
    $post_id = intval(get_option('page_for_posts'));
}

if ((!isset($title) || empty($title)) && (is_singular() || is_404())) {
    $title = get_the_title($post_id);
} else if (!isset($title)) {
    $title = false;
}
$title = apply_filters('ogretemplate/article_header_title', $title, $post_id);

if (!isset($subtitle)) $subtitle = '';
$subtitle = apply_filters('ogretemplate/article_header_subtitle', $subtitle, $post_id);

if (!isset($link)) $link = [];
$link = apply_filters('ogretemplate/article_header_link', $link, $post_id);

if (!empty($title)) {
    echo apply_filters(
        'ogretemplate/article_header_title_html',
        sprintf('<h1 class="entry-title">%s</h1>', $title),
        $title,
        $post_id
    );
}

if (!empty($subtitle)) {
    echo apply_filters(
        'ogretemplate/article_header_subtitle_html',
        sprintf('<p class="entry-subtitle">%s</p>', $subtitle),
        $subtitle,
        $post_id
    );
}

// if (is_array($link) && !empty($link)) {
//     echo apply_filters(
//         'ogretemplate/article_header_link_html',
//         sprintf('<div class="entry-link">%s</div>', \Ogre::get_acf_link($link, apply_filters(
//             'ogretemplate/article_header_link_attributes',
//             [
//                 'class' => 'entry-link__button button',
//             ]
//         ))),
//         $link,
//         $post_id
//     );
// }
