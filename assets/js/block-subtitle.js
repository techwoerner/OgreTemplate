/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.3
 * @since 0.3.3
 */

(function (wp) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var RichText = wp.blockEditor.RichText;
    var useSelect = wp.data.useSelect;
    var useEntityProp = wp.coreData.useEntityProp;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var __ = wp.i18n.__;

    registerBlockType('ogretemplate/subtitle',  {
        apiVersion: 2,
        title: __('Subtitle'),
        icon: 'heading',
        category: 'ogrecore',

        edit: function (props) {
            var blockProps = useBlockProps({
                className: 'editor-post-subtitle__block',
                lock: {
                    move: true,
                    remove: true
                },
            });

            var postType = useSelect(function (select) {
                return select('core/editor').getCurrentPostType();
            }, []);
            var entityProp = useEntityProp('postType', postType, 'meta');
            var meta = entityProp[0];
            var setMeta = entityProp[1];

            var metaFieldValue = meta['page_subtitle'];
            var updateMetaValue = function (newValue) {
                setMeta(Object.assign({}, meta, {
                    page_subtitle: newValue,
                }));
            };

            return el(
                RichText,
                Object.assign({}, {
                    tagName: 'p',
                    value: metaFieldValue,
                    onChange: updateMetaValue,
                    'aria-label': __('Document subtitle'),
                    placeholder: __('Add subtitle'),
                }, blockProps)
            );
        },

        save: function () {
            return null;
        },
    });

})(window.wp);
