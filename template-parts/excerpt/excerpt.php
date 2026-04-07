<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.4.0
 */

if (!empty(get_the_excerpt())) { ?>
<div class="entry-excerpt"><?php the_excerpt(); ?></div>
<?php }
