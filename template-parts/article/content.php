<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.3.2
 */

if ((!isset($content) || empty($content)) && (is_singular() || is_404())) {
    ob_start();
    the_content();
    $content = ob_get_contents();
    ob_end_clean();
} else if (!isset($content)) {
    return;
}

do_action('ogre/the_content_before');
if (!empty($content)) {
    echo '<div class="entry-content content">';
    do_action('ogre/the_content_inner_before');
    echo $content;
    do_action('ogre/the_content_inner_after');
    echo '</div>';
}
do_action('ogre/the_content_after');
