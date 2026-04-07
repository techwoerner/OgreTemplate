<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.4.0
 * @version 0.3.0
 */

use \OgreTemplate\Article;

if (!class_exists('\OgreTemplate\Article')) return;

if (!isset($post_id)) $post_id = get_the_ID();
$items = Article::get_navigation_items($post_id);

if (empty($items)) return;

?>
<nav role="navigation" class="entry-navigation">
    <ul class="menu"><?php
        foreach ($items as $name => $item) {
            printf('<li class="menu-item %s">%s</li>', sanitize_html_class($name), $item);
        }
    ?></ul>
</nav>
