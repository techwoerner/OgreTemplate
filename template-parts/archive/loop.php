<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.2
 * @version 0.3.2
 */

if (have_posts()) {
    while (have_posts()) {
        the_post();
        if (!is_singular()) {
            get_template_part('template-parts/archive/excerpt');
        } else {
            get_template_part('template-parts/archive/single');
        }
    }
} else {
    get_template_part('template-parts/content/content-none');
}
