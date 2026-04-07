<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.1.0
 */

get_header();

$page = apply_filters('ogretemplate/404/page', \Ogre::get_page_by_title('404'));

$sidebar_id = apply_filters('ogretemplate/404/sidebar_id', \OgreTemplate\Archive::get_active_sidebar());
if (!is_active_sidebar($sidebar_id)) $sidebar_id = false;

?>
<div id="primary" class="content-area<?php echo !!$sidebar_id ? ' has-aside' : ''; ?>">
    <main id="main" class="site-main" role="main"><?php
        if ((is_a($page, 'WP_Post') || (is_numeric($page) && get_post_type(intval($page)) == 'page')) && ($page->post_status == 'publish' || is_user_logged_in())) {
            if (is_numeric($page) || is_int($page)) $page = get_post(intval($page));
            global $post;
            $post = $page;
            setup_postdata($post);
            get_template_part('template-parts/content/content', get_post_type());
            wp_reset_postdata();
        } else {
            get_template_part('template-parts/content/content', 'not-found');
        }
    ?></main>
    <?php if (!!$sidebar_id) get_sidebar($sidebar_id); ?>
</div>
<?php get_footer();
