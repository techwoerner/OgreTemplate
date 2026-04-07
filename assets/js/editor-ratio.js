// Add block attribute

var addRatioAttributes = function (settings, name) {
    if ((name !== 'core/image' && name !== 'core/post-featured-image') || typeof settings.attributes === 'undefined') return settings;

    settings.attributes = Object.assign(settings.attributes, {
        ogreTemplateRatio: {
            type: 'boolean',
            default: false
        },
        ogreTemplateRatioWidth: {
            type: 'string',
            default: '1'
        },
        ogreTemplateRatioHeight: {
            type: 'string',
            default: '1'
        },
        ogreTemplateRatioFocalX: {
            type: 'string',
            default: '0.5'
        },
        ogreTemplateRatioFocalY: {
            type: 'string',
            default: '0.5'
        }
    });

    return settings;
};

wp.hooks.addFilter(
    'blocks.registerBlockType',
    'ogretemplate/image/ratio',
    addRatioAttributes
);

// Add frontend control

var updateEditorRatioBlock = function (props, attributes = {}) {
    var element = document.querySelector('.wp-block[data-block="' + props.clientId + '"]');
    if (typeof element !== 'object' || element === null) return false;

    let atts = Object.assign({}, props.attributes, attributes);

    if (atts.ogreTemplateRatio !== true) {
        element.classList.remove('has-ratio');
        return false;
    }

    element.classList.add('has-ratio');
    element.style.setProperty('--ratio-width', atts.ogreTemplateRatioWidth);
    element.style.setProperty('--ratio-height', atts.ogreTemplateRatioHeight);
    element.style.setProperty('--ratio-focal-x', atts.ogreTemplateRatioFocalX);
    element.style.setProperty('--ratio-focal-y', atts.ogreTemplateRatioFocalY);

    return true;
};

var addRatioControls = wp.compose.createHigherOrderComponent(function (BlockEdit) {
    return function (props) {
        updateEditorRatioBlock(props);
        return wp.element.createElement(
            wp.element.Fragment,
            {},
            wp.element.createElement(
                BlockEdit,
                props
            ),
            props.isSelected && (props.name == 'core/image' || props.name == 'core/post-featured-image') && wp.element.createElement(
                wp.blockEditor.InspectorAdvancedControls,
                {},
                wp.element.createElement(
                    'div',
                    {
                        className: 'block-editor-image-size-control'
                    },
                    wp.element.createElement(
                        'div',
                        {
                            className: 'block-editor-image-size-control__row'
                        },
                        wp.element.createElement(
                            wp.components.CheckboxControl,
                            {
                                label: wp.i18n.__('Crop image to ratio?'),
                                help: wp.i18n.__('Crops the image to a specified ratio without modifying the original source.'),
                                checked: props.attributes.ogreTemplateRatio,
                                onChange: function (value) {
                                    updateEditorRatioBlock(props, {
                                        ogreTemplateRatio: !!value
                                    });
                                    props.setAttributes({
                                        ogreTemplateRatio: !!value
                                    });
                                }
                            }
                        )
                    ),
                    !!props.attributes.ogreTemplateRatio && wp.element.createElement(
                        'div',
                        {
                            className: 'block-editor-image-size-control__row'
                        },
                        wp.element.createElement(
                            wp.components.TextControl,
                            {
                                label: wp.i18n.__('Width'),
                                className: 'block-editor-image-size-control__width',
                                type: 'number',
                                min: 1,
                                value: !isNaN(props.attributes.ogreTemplateRatioWidth) ? parseFloat(props.attributes.ogreTemplateRatioWidth) : 1,
                                onChange: function (value) {
                                    updateEditorRatioBlock(props, {
                                        ogreTemplateRatioWidth: value.toString()
                                    });
                                    props.setAttributes({
                                        ogreTemplateRatioWidth: value.toString()
                                    });
                                }
                            }
                        ),
                        wp.element.createElement(
                            wp.components.TextControl,
                            {
                                label: wp.i18n.__('Height'),
                                className: 'block-editor-image-size-control__height',
                                type: 'number',
                                min: 1,
                                value: !isNaN(props.attributes.ogreTemplateRatioHeight) ? parseFloat(props.attributes.ogreTemplateRatioHeight) : 1,
                                onChange: function (value) {
                                    updateEditorRatioBlock(props, {
                                        ogreTemplateRatioHeight: value.toString()
                                    });
                                    props.setAttributes({
                                        ogreTemplateRatioHeight: value.toString()
                                    });
                                }
                            }
                        )
                    ),
                    !!props.attributes.ogreTemplateRatio && wp.element.createElement(
                        'div',
                        {
                            className: 'block-editor-image-size-control__row'
                        },
                        wp.element.createElement(
                            wp.components.FocalPointPicker,
                            {
                                url: props.attributes.url,
                                value: {
                                    x: !isNaN(props.attributes.ogreTemplateRatioFocalX) ? parseFloat(props.attributes.ogreTemplateRatioFocalX) : 0.5,
                                    y: !isNaN(props.attributes.ogreTemplateRatioFocalY) ? parseFloat(props.attributes.ogreTemplateRatioFocalY) : 0.5
                                },
                                onDragStart: function (value) {
                                    updateEditorRatioBlock(props, {
                                        ogreTemplateRatioFocalX: value.x.toString(),
                                        ogreTemplateRatioFocalY: value.y.toString()
                                    });
                                },
                                onDrag: function (value) {
                                    updateEditorRatioBlock(props, {
                                        ogreTemplateRatioFocalX: value.x.toString(),
                                        ogreTemplateRatioFocalY: value.y.toString()
                                    });
                                },
                                onChange: function (value) {
                                    updateEditorRatioBlock(props, {
                                        ogreTemplateRatioFocalX: value.x.toString(),
                                        ogreTemplateRatioFocalY: value.y.toString()
                                    });
                                    props.setAttributes({
                                        ogreTemplateRatioFocalX: value.x.toString(),
                                        ogreTemplateRatioFocalY: value.y.toString()
                                    });
                                }
                            }
                        ),
                        wp.element.createElement(
                            'div',
                            {
                                style: {
                                    backgroundImage: 'url(' + props.attributes.url + ')',
                                    backgroundPosition: ((!isNaN(props.attributes.ogreTemplateRatioFocalX) ? parseFloat(props.attributes.ogreTemplateRatioFocalX) : 0.5) * 100) + '% ' + ((!isNaN(props.attributes.ogreTemplateRatioFocalX) ? parseFloat(props.attributes.ogreTemplateRatioFocalX) : 0.5) * 100) + '%'
                                }
                            }
                        )
                    )
                )
            )
        );
    };
}, 'imageAdvancedControls');

wp.hooks.addFilter(
    'editor.BlockEdit',
    'ogretemplate/image/ratio',
    addRatioControls
);

// Extend props in save function to html

var addRatioData = function (props, block, attributes) {
    if (block.name !== 'core/image' && block.name !== 'core/post-featured-image') return props;
    if (attributes.ogreTemplateRatio !== true) return props;

    if (typeof props.className !== "string") props.className = "";
    props.className += " has-ratio";

    if (typeof props.style !== "string") props.style = "";
    props.style += "--ratio-width:" + attributes.ogreTemplateRatioWidth + ";"
    props.style += "--ratio-height:" + attributes.ogreTemplateRatioHeight + ";"
    props.style += "--ratio-focal-x:" + attributes.ogreTemplateRatioFocalX + ";"
    props.style += "--ratio-focal-y:" + attributes.ogreTemplateRatioFocalY + ";"

    return props;
};

wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'ogretemplate/ratio',
    addRatioData
);
