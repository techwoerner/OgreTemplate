<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.2.0
 * @since 0.1.0
 */

get_header(); ?>
<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main"><?php
        if (have_posts()) {
            while (have_posts()) {
                the_post();
                get_template_part('template-parts/content/content', get_post_type());
            }
        } else {
            get_template_part('template-parts/content/content', 'none');
        }
    ?></main>
</div>
<?php get_footer();
