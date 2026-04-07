<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.4
 * @since 0.4.3
 */

namespace OgreTemplate\Blocks;

defined('ABSPATH') || exit;

use OgreTemplate\Singleton;
use Ogre;

abstract class Block {
    use Singleton;

    protected string $name;
    protected string $title;
    protected string $description = '';
    protected string $icon = '';

    protected string $tag = 'div';

    public function __construct(string $name, string $title) {
        $this->name = $name;
        $this->title = $title;
        $this->register();
        $this->init();
    }

    private array $_settings = [];
    protected function get_settings():array {
        return array_merge([
            'name' => $this->name,
            'title' => $this->title,
            'description' => $this->description,
            'category' => wp_get_theme(get_stylesheet())->get('TextDomain'),
            'icon' => $this->icon,
            'mode' => 'preview',
            'render_callback' => [$this, 'handle'],
            'supports' => $this->get_supports(),
        ], $this->_settings);
    }

    protected function get_supports():array {
        return [
            'mode' => false,
            'multiple' => true,
        ];
    }

    protected function register():bool {
        if (!function_exists('acf_register_block_type')) return false;
        $this->_settings = acf_register_block_type($this->get_settings());
        return true;
    }

    protected function init() {
        add_action('wp_enqueue_scripts', [$this, 'maybe_enqueue_scripts']);
    }

    public function maybe_enqueue_scripts() {
        global $post;
        if (!$this->has_block()) return;
        $this->enqueue_scripts();
    }
    public function enqueue_scripts() { }


    public function has_block() {
        global $post;
        $has = false;
        if (!$has && is_singular() && has_block('acf/' . $this->name, $post->ID)) $has = true;
        if (!$has && get_theme_support('ogre/widget-blocks') && Ogre::has_widget_block('acf/' . $this->name)) $has = true;
        return apply_filters('ogre/block/has_block', $has, $this);
    }

    public function handle(array $block, string $content = '', bool $is_preview = false, $post_id = 0) {
        if (is_string($post_id) && is_numeric($post_id)) $post_id = intval($post_id);
        if (!is_int($post_id)) $post_id = get_the_ID();

        $this->the_tag_open($block, $post_id);
        $this->render($block, $post_id);
        $this->the_tag_close();
    }
    abstract public function render(array $block, int $post_id);

    protected function get_slug(array $block = []) {
        return sanitize_title(str_replace('acf/', '', $block['name']));
    }

    protected function get_id(array $block, int $post_id):string {
        if (!empty($block['anchor'])) return $block['anchor'];
        return sprintf(
            'post_%d-%s',
            $post_id,
            self::get_block_id($block, $post_id)
        );
    }

    protected function get_classes(array $block, array $classes = []) {
        // Block Slug
        $slug = $this->get_slug($block);
        $classes = array_merge([
            sprintf('wp-block-%s', $slug),
            sprintf('ogre-block-%s', $slug),
        ], $classes);

        // Class Name
        if (isset($block['className']) && !empty($block['className'])) {
            $_classes = explode(' ', $block['className']);
            foreach ($_classes as $class) {
                if (!in_array($class, $classes)) $classes[] = $class;
            }
        }

        // Align
        if (isset($block['align']) && !empty($block['align'])) {
            $class = "align{$block['align']}";
            if (!in_array($class, $classes)) $classes[] = $class;
        }

        // Align Content
        if (isset($block['align_content']) && !empty($block['align_content'])) {
            $class = "is-position-{$block['align_content']}";
            if (!in_array($class, $classes)) $classes[] = $class;
        }
        if (isset($block['aligncontent']) && !empty($block['aligncontent'])) {
            $class = "is-text-align-{$block['aligncontent']}";
            if (!in_array($class, $classes)) $classes[] = $class;
        }

        // Align Text
        if (isset($block['align_text']) && !empty($block['align_text'])) {
            $class = "has-text-align-{$block['align_text']}";
            if (!in_array($class, $classes)) $classes[] = $class;
        }

        // Full Height
        if (isset($block['full_height']) && $block['full_height'] === true) {
            $_classes = apply_filters('ogre/block/full_height_classes', ['full-height', 'min-height', 'has-header'], $block);
            foreach ($_classes as $class) {
                if (!in_array($class, $classes)) $classes[] = $class;
            }
        }

        // Color
        if (isset($block['textColor']) && !empty($block['textColor'])) {
            $classes[] = 'has-text-color';
            $classes[] = sprintf('has-%s-color', sanitize_html_class($block['textColor']));
        }
        if (isset($block['backgroundColor']) && !empty($block['backgroundColor'])) {
            $classes[] = 'has-background';
            $classes[] = sprintf('has-%s-background-color', sanitize_html_class($block['backgroundColor']));
        }

        return $classes;
    }

    protected function get_attribute(string $key, $value) {
        if (is_bool($value)) {
            $value = $value === true ? 'true' : 'false';
        } else if (is_array($value)) {
            $value = implode(' ', array_map('strval', $value));
        }
        return sprintf(' %s="%s"', sanitize_title($key), esc_attr(trim(strval($value))));
    }
    protected function the_attribute(string $key, $value) {
        echo $this->get_attribute($key, $value);
    }

    protected function get_attributes(array $block, int $post_id, array $attrs = []) {
        return array_merge([
            'id' => $this->get_id($block, $post_id),
            'class' => $this->get_classes($block),
        ], $attrs);
    }
    protected function the_attributes(array $block, int $post_id, array $attrs = [], bool $echo = true) {
        $attributes = $this->get_attributes($block, $post_id, $attrs);

        ob_start();

        foreach ($attributes as $key => $value) {
            switch ($key) {
                case 'data':
                    if (!is_array($value)) break;
                    foreach ($value as $k => $v) {
                        if (!is_string($k) || empty($k)) continue;

                        $_k = $k;
                        if (strpos($k, "{$key}-") === false) $_k = sprintf('%s-%s', $key, $k);

                        $this->the_attribute($_k, $v);
                    }
                    break;
                case 'style':
                    $_value = '';
                    foreach ($value as $k => $v) {
                        if (!is_string($k) || empty($k)) {
                            if (strpos($v, ':') !== false && strpos($v, ';') !== false) $_value .= " {$v}";
                            continue;
                        }
                        $_value .= sprintf(' %s: %s;', $k, $v);
                    }
                    $this->the_attribute($key, $_value);
                    break;
                default:
                    $this->the_attribute($key, $value);
                    break;
            }
        }

        $html = ob_get_clean();
        if (!!$echo) echo $html;
        return !!$echo ? true : $html;
    }

    protected function get_tag_open(array $block, int $post_id, array $attrs = []):string {
        return sprintf(
            '<%s %s>',
            $this->tag,
            $this->the_attributes($block, $post_id, $attrs, false)
        );
    }
    protected function the_tag_open(array $block, int $post_id) {
        echo $this->get_tag_open($block, $post_id);
    }

    protected function get_tag_close():string {
        return sprintf('</%s>', $this->tag);
    }
    protected function the_tag_close() {
        echo $this->get_tag_close();
    }

    protected function get_editor_message($message):string {
        if (is_a($message, '\WP_Error')) $message = $message->get_error_message();
        ob_start();
?>
<div class="wp-block block-editor-block-list__block">
    <div class="components-placeholder" style="align-items:center;">
        <div class="components-placeholder__instructions" style="text-align:center;"><?php
            echo wpautop($message);
        ?></div>
    </div>
</div>
<?php
        return ob_get_clean();
    }
    protected function the_editor_message($message) {
        echo $this->get_editor_message($message);
    }

    // General Functions

    public static function get_block_by_id(int $post_id, string $block_id):array {
        $content = get_the_content(null, false, $post_id);
        if (empty($content)) return [];

        $blocks = parse_blocks($content);
        if (!$blocks) return [];

        if (is_array($block_id)) $block_id = self::get_block_id($block_id, $post_id);

        return self::__get_block_by_id($blocks, $block_id, $post_id);
    }
    private static function __get_block_by_id(array $blocks, string $block_id, int $post_id):array {
        foreach ($blocks as $block) {
            if ($block_id === self::get_block_id($block, $post_id)) return $block;
            if ($block['blockName'] === 'core/block' && isset($block['attrs']['ref'])) {
                return self::get_block_by_id($block['attrs']['ref'], $block_id);
            } else if (isset($block['innerBlocks']) && !empty($block['innerBlocks'])) {
                $_block = self::__get_block_by_id($block['innerBlocks'], $block_id, $post_id);
                if (!empty($_block)) return $_block;
            }
        }
        return [];
    }
    public static function get_block_id(array $block, int $post_id):string {
        if (!is_array($block)) return '';
        if (isset($block['id']) && !empty($block['id'])) return $block['id'];

        if (!isset($block['attrs']) || empty($block['attrs'])) return '';
        if (isset($block['attrs']['id']) && !empty($block['attrs']['id'])) return $block['attrs']['id'];

        if (is_object($post_id) && is_a($post_id, '\WP_Post')) $post_id = $post_id->ID;
        if (is_string($post_id) && is_numeric($post_id)) $post_id = intval($post_id);
        if (!is_int($post_id)) return '';

        $context = [
            'postId' => $post_id,
            'postType' => get_post_type($post_id),
        ];
        $block_id = acf_get_block_id($block['attrs'], $context);
        $block_id = acf_ensure_block_id_prefix($block_id);

        return (string)$block_id;
    }

}
