=== OgreTemplate ===
Contributors: ogrecooper
Donate link: https://cleverogre.com/
Tags: bare, theme, gutenberg, parent
Requires at least: 5.0
Tested up to: 6.4.2
Requires PHP: 7.3
Stable tag: 0.4.4.1
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Simple Gutenberg-enabled Wordpress theme with customization support. Designed to work as a parent theme. Requires OgreCore plugin.

== Description ==

Simple Gutenberg-enabled Wordpress theme with customization support. Designed to work as a parent theme. Requires OgreCore plugin to be installed for full functionality, preferably in mu-plugins.

== Installation ==

1. Install the OgreCore supplementary plugin onto your WordPress site. Follow the instructions included for the best results.
2. Upload the theme files to the `/wp-content/themes/ogretemplate` directory.
3. Upload the desired child theme which supports OgreTemplate to the `/wp-content/themes` directory.
4. Activate your child theme on the Appearance -> Themes admin page.

== Frequently Asked Questions ==

= Why isn't everything working as expected? =

Make sure that you have installed the OgreTemplate supplementary plugin as well. Also, it is important to know that this theme should only act as a parent to a child theme which achieves your specific WordPress desires.

= What is this theme? =

If you do know what theme you have downloaded, please contact [CleverOgre](team@cleverogre.com) for more information. This plugin is only developed for a small, private audience.

== Changelog ==

= 0.4.4.1 - 2024-02-27 =
* BUG: Fixed parameter issue with sidebar.php `Archive::get_sidebar` call.

= 0.4.4 - 2024-02-02 =
* DEV: Added OgreMapGL.Document triggers.
* DEV: Improved palette data accessors within OgreTemplate\Customizer\Palette.
* DEV: Added OgreMapGL.Document padding data option, ie: `data-padding="{px}"`.
* BUG: Fixed marker icon generation bug in OgreMapGL.Map.
* BUG: Fixed critical errors with PHP 7.x.

= 0.4.3.1 - 2024-01-16 =
* BUG: Fixed critical script bug with compiled Maps GL module output.

= 0.4.3 - 2024-01-12 =
* NEW: Maps (GL) block and script module with Maplibre GL support. Must call `add_theme_support('ogre/maps-gl')` earlier than `after_theme_setup` action to support.
* DEV: Improved sidebar output handling with new function, `OgreTemplate\Archive::get_sidebar`.
* DEV: New abstract block class for advanced script enqueueing and output rendering.
* DEV: New singleton trait.
* DEV: Updated license to GPLv3.

= 0.4.2 - 2023-11-02 =
* NEW: Various new template filters.
* NEW: Add support for geojson marker objects.
* NEW: Switch to OGTiles vector map server with new style options and backwards compatibility. Some custom styling for maps that used the old raster system may require minor styling updates.
* NEW: Slider block!
* DEV: Include theme template style in template hook loading.
* DEV: New options to ignore modal parts in height calculation.
* DEV: Allow reveal elements to be added from external scripts.
* DEV: Improved `content-excerpt.php` rendering and actions.
* DEV: Support for custom fonts and improved enqueueing.
* DEV: Limited support for WP 6.3 aspect ratio feature.
* DEV: Load external tile layer source with `data-style-source`.
* BUG: General minor bug fixes.
* BUG: General fixes for WP 6.2+ compatibility.
* BUG: Fixed issues with expander propagation on nested expanders.

= 0.4.1 - 2023-04-10 =
* NEW: Add name override and from/to opacity options to gradients.
* NEW: Inner content actions, `ogre/the_content_inner_before` & `ogre/the_content_inner_after`.
* NEW: `ogretemplate/article_meta_include_date_archive` filter added.
* NEW: Added `ogre/schema-faq-expanders` theme support to automatically register Yoast FAQ blocks as expanders.
* NEW: Added new accessors, global variables, and filters to customizer sections.
* NEW: Optional image modal and header watch height script theme support.
* DEV: Updated build system.
* DEV: Support for `has-background-gradient` class.
* DEV: Updated Font Awesome Pro to 5.15.4.
* DEV: Separated subtitle post types from settings post types.
* DEV: Improved meta taxonomy & terms handling with support for multiple taxonomie and added related posts function.
* DEV: Improved script module typing and global access.
* BUG: Fixed minor TS compilation errors.
* BUG: Widgets REST editor dependency deprecation fix.
* BUG: Fix deprecated get_page_by_title function.
* BUG: Various styling and code updates.

= 0.4.0 - 2022-11-08 =
* NEW: Dynamic TS module loading. All modules are now available with pre-selected default modules.
* NEW: Added color palette support to block editor interface.
* NEW: Icon block to display customizer icons in a block style with selected attributes.
* NEW: Added "Secondary Bar" header style.
* NEW: New Sidebar block!
* NEW: New palette-based gradient registration. Theme support using `ogre/gradients`.
* NEW: Footer menu location to add small links to copyright bar (with default style).
* DEV: Globalized article meta generation.
* DEV: Body classes to indicate selected customizer styles.
* DEV: Improved namespace references.
* DEV: Improved customizer typography section interface.
* DEV: Added post navigation link format filters - `ogretemplate/article_previous_post_link_format` & `ogretemplate/article_next_post_link_format`.
* DEV: Improved header image support on taxonomy archives.
* DEV: Removed page content from posts archive when paged.
* DEV: New `ogre/body_tag_attributes` action to add global page attributes.
* DEV: Control default header view ratio with body attribute - `data-view-ratio`.
* DEV: Added more color RGB variable references.
* DEV: `classes` attribute for entry meta links.
* DEV: Inverted scroll option for ScrollBar module with `data-invert`.
* DEV: Added before and after active classes to SliderMenu module.
* DEV: Add min/max zoom and bounds options to OgreMaps - `data-min-zoom`, `data-max-zoom`, and `data-bounds`. `OgreMapTileStyle.none` removed. Added more zoom control, scale control, and cluster options, self and map to event data, variety of center calls, and marker object abstraction to OgreMaps.
* DEV: Removed Bourbon sass dependency and improved postcss autoprefixer compatibility. Upgraded node-sass to Dart Sass in Makefile.
* DEV: Add abstraction to `register_sidebar` calls. New filter `ogre/register_sidebar/args` and theme_support `ogre/widget-blocks` to remove widget wrappers.
* DEV: Improved single article footer navigation functionality using global methods.
* DEV: Separated excerpt parts from excerpt template and added new action calls.
* DEV: Added public accessors and element trigger propagation to Expanders. Allows for multiple open/close trigger instances.
* DEV: Customizer section field group made public.
* DEV: Improved support for featured image block within query block.
* DEV: Improved query block support with `ogre/query_block` on page_for_posts.
* DEV: Many template functions globalized such as sidebar and header image.
* DEV: Global user conditional classes.
* DEV: Dynamic wp_head generation with `ogretemplate/wp_head`. Improves support with DevOgre plugin.
* DEV: Various additional TS module improvements and global accessors.
* BUG: Improved jQuery compatibility with TS modules.
* BUG: Fixed fallback font family name generator and improved font variant retrieval.
* BUG: Fixed default color assignment variable errors.
* BUG: Fixed customizer icon variant saniziation in ajax call.
* BUG: Removed warnings in customizer from incorrect calls to `acf/init` action.
* BUG: Fixed post ID references in taxonomy selector.
* BUG: Improvements to ScrollBar TS module and scrollContainer assignment.
* BUG: Fixed `font-size-xs` references.
* BUG: WP 6.1 style compatibility. Primarily buttons and gallery blocks.
* BUG: Hide empty entry-content.

= 0.3.7 - 2022-06-28 =
* BUG: Added fallback option to customizer typography module when Google Fonts API and local data are unavailable.

= 0.3.6 - 2022-06-28 =
* NEW: Stop scroll expander class option added and default in navigation expander classes. Disabled scroll container when menu is activated.
* BUG: Improved jQuery compatibility errors.
* BUG: Improved customizer typography module caching to massively reduce requests to Google Fonts API.

= 0.3.5 - 2022-06-10 =
* NEW: Webp support in image modals.
* NEW: New default content excerpt template with action support.
* DEV: Improved slider loading, access, and uninit removal.
* DEV: `menu-%s` classes added to navigation templates.
* DEV: Parallax CSS variable dynamically updated for custom CSS parallax styling.
* DEV: Adaptive height option exposed for sliders.
* DEV: `entry-meta__link` class.
* DEV: Major improvements to Gravity Forms script helper.
* BUG: Improved theme support checks.
* BUG: Header image conditional bug fix.
* BUG: Column block break flex implementation.

= 0.3.4 - 2022-03-10 =
* NEW: Four columns style on list block.
* NEW: WordPress 5.9 support. No support currently for "Full Site Editing".
* DEV: Page text & background color body classes.
* DEV: Improved parallax module global access.
* DEV: Theme.json dynamic generation. EXPERIMENTAL: Use `add_theme_support('ogre/theme-json', true);` to enable.
* DEV: Added filters - `ogretemplate/archive_article_visible`, `ogretemplate/archive_article_content_visible`, `ogretemplate/article_meta_taxonomy`, and `ogretemplate/section/article/container`.
* DEV: Added actions - `ogre/archive_inner_before` and `ogre/archive_inner_after`.
* BUG: PostCSS css variable "0px" bug fix.
* BUG: Modal href fix.
* BUG: 404 page container alignment.

= 0.3.3 - 2022-01-05 =
* NEW: Mobile navigation and expander options.
* NEW: PICO-8 block and JS file upload support.
* NEW: Modal support with automated gallery modals using `has-gallery-modals` body class.
* NEW: Page link option in Page Settings to add button to header.
* NEW: Button icon setting under Advanced panel in block editor.
* NEW: Map block options for link, zoom, and style.
* NEW: Page text color option in Page Settings.
* NEW: Trigger and toggle options for Reveal block.
* NEW: Improved editor display to match global customizer options (typography, especially).
* NEW: List inline columns options in block style selector.
* NEW: Image block ratio control option to get desired sizing without cropping.
* NEW: Subtitle block (with post meta support). Removed subtitle field from Page Settings. Backwards compatible.
* NEW: Ajax page loading when `ogre/ajax` theme support is defined. Feature is experimental.
* DEV: Improved article and header classes.
* DEV: Better separator styling and variables.
* DEV: Color variable improvements.
* DEV: New features for Columns and Media & Text.
* DEV: New 404 page filters and improvements.
* DEV: Custom slider prev/next arrow data attributes.
* DEV: TypeScript module global accessibility.
* DEV: Customizer CSS variable type inheritance and TemplateSection class for global template features.
* DEV: Added `ogre/page_before` and `ogre/page_after` actions. Great for including tracking scripts or notices.
* DEV: Navigation sub menu variables and stylings.
* DEV: Support for \OgreCore\Blocks global block functions in block templates.
* DEV: Completely remove article header DOM when `page_title_display` is set to hidden. Make sure to include H1 in article content.
* DEV: Switched from using `style-a` to `style-default`. Backwards compatible.
* DEV: Improved archive support (terms & search as well).
* DEV: RGB variables included for all text color and background color classes.
* DEV: Improved paragraph background color support.
* DEV: Entry navigation filters, `ogretemplate/article_previous_post_link` and `ogretemplate/article_next_post_link`.
* DEV: Added SVG ajax loading event triggers and parent classes.
* DEV: Gravity Forms ajax multi-page TS support.
* DEV: Menu block wp_nav_menu arguments filter, `ogretemplate/block/menu/args`.
* DEV: Improved button styling & capture states.
* DEV: Improved search form support.
* DEV: Experimental block editor content size definitions.
* BUG: Improved responsive support.
* BUG: Scrollbar script fix.
* BUG: Improved expander loading.
* BUG: Removed unnecessary i18n `__()` translations which cause errors with plugins like TranslatePress.
* BUG: Safari/iOS checkbox & radio appearance definitions.
* BUG: Fixed inverted reveal direction. May cause display compatibility issues.

= 0.3.2 - 2021-07-23 =
* NEW: Parallax block.
* NEW: Archive header and sidebar support.
* NEW: Article subtitles and header images.
* NEW: Article meta generation and filters.
* NEW: Improved reveal block with delay and additional types.
* DEV: More module support in css.
* DEV: Article and archive action structure and filters for more child template control.
* DEV: Customizer template functions for improved control of header & footer templates.
* DEV: Basic theme.json support for WP 5.8.
* DEV: Improved editor css & js support.
* DEV: Makefile package zipping compilation support.
* DEV: Cleaned up some asset locations.
* DEV: Added marker cluster support and more map optimizations.
* BUG: Image figure margin fix.
* BUG: Expander group animation active check to prevent multiple concurrent events.
* BUG: Removed unnused Footer B style.
* BUG: Header css variable fixes.
* BUG: Block styling improvements for compatibility with WP 5.7.
* BUG: Font family line height variable bug fixes.

= 0.3.1 - 2021-05-11 =
* NEW: Map, Menu, Texture, and Reveal blocks!
* NEW: Map widget!
* NEW: Hidden header & footer styles.
* NEW: Fixed header scroll hiding and duration option.
* NEW: Tertiary color option in Header customizer panel.
* NEW: Line height based on font families rather than font size in typography customizer panel.
* DEV: Included ACF Nav Menu field without plugin requirement.
* DEV: Reduced file size weight by removing unnecessary FontAwesome SVG fonts.
* DEV: Improved customizer css variable output to generate right after assets to prevent loading style flicker.
* DEV: Integration with OgreCore API Keys extension.
* DEV: New widgets system that is similar to customizer panel inheritance.
* DEV: New left/right slide expander type options and improved group index detection.
* BUG: Block margin improvements and content layout.
* BUG: Media & Text block style improvements.
* BUG: Fixed wp_get_theme calls to always target parent theme to prevent enqueue issues and more.

= 0.3.0 - 2021-04-15 =
* NEW: Customizer panels for Icons, Typography, Header, Footer, Layout, Article, Maps, and Forms. Still needs work on Article, Maps, and Forms panels.
* NEW: Added geolocation support to Maps module.
* DEV: Touch Scroll module improvements for mobile devices.
* DEV: Expander module reliability improvements.
* DEV: Converted sass variables to global css variables where applicable.
* DEV: Improved requirements testing on theme load.
* DEV: Removed javascript ajax compression worker.
* DEV: Built-in javascript game engine improvements.
* DEV: New sass structure based on twentytwentyone.
* DEV: Converted article, header, and footer templates to action-based functionality.
* DEV: Primary TS modules loaded by default. TS module structure will need reworking in the future.
* BUG: Changed OgreBase to OgreCore dependency.

= 0.2.0 - 2021-02-02 =
* NEW: Rename to OgreTemplate.
* NEW: Customizer Panels - Header, Footer, Palette, and Typography.
* DEV: Container switch from width to max-width focus.
* DEV: Global variable support for colors and typography.
* DEV: Increased dependency on OgreBase for many functions and filters.
* DEV: Action-based DOM output (mostly header and footer).

= 0.1.0 - 2021-07-14 =
* Initial build of the theme based on original OgreBare theme template.
