/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.3.2
 */

// Block Styles

wp.domReady(() => {

    wp.blocks.registerBlockStyle('core/columns', [
        {
            name: 'wide',
            label: 'Wide Gutter',
        }
    ]);

    wp.blocks.registerBlockStyle('core/list', [
        {
            name: 'two-columns',
            label: 'Two Columns',
        }, {
            name: 'three-columns',
            label: 'Three Columns',
        }, {
            name: 'four-columns',
            label: 'Four Columns',
        }
    ]);

});

// Block Transformations

if (window.OgreCore && window.OgreCore.blocks) {

    window.OgreCore.blocks['transformToReveal'] = function (blocks) {
        if (blocks.length === 1 && blocks[0].name === 'acf/reveal') return;

        const alignments = ['wide', 'full'];

        const widestAlignment = blocks.reduce(
            (accumulator, block) => {
                const { align } = block.attributes;
                return alignments.indexOf(align) > alignments.indexOf(accumulator) ? align : accumulator;
            },
            undefined
        );

        const groupInnerBlocks = blocks.map((block) => {
            return wp.blocks.createBlock(
                block.name,
                block.attributes,
                block.innerBlocks
            );
        });

        return wp.blocks.createBlock(
            'acf/reveal',
            {
                align: widestAlignment,
            },
            groupInnerBlocks
        );
    };

}
