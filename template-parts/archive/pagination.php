<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.2
 * @version 0.3.2
 */

the_posts_pagination(
    apply_filters(
        'ogretemplate/archive/pagination_args', [
            'mid_size' => 2,
            'prev_text' => __('Previous', 'sunkist'),
            'next_text' => __('Next', 'sunkist'),
        ]
    )
);
