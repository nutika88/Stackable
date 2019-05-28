import * as deepmerge from 'deepmerge'
import { addFilter, doAction } from '@wordpress/hooks'
import {
	AdvancedRangeControl,
	ColorPaletteControl,
	DesignSeparatorControl,
	PanelAdvancedSettings,
	ResponsiveControl,
	Separator,
} from '@stackable/components'
import { __ } from '@wordpress/i18n'
import { createAllCombinationAttributes } from '@stackable/util'
import { Fragment } from '@wordpress/element'
import { ToggleControl } from '@wordpress/components'

const addBlockSeparatorPanels = ( output, props ) => {
	const { setAttributes } = props
	const {
		showTopSeparator = false,
		topSeparatorDesign = 'wave-1',
		topSeparatorColor = '',
		topSeparatorWidth = '',
		topSeparatorFlipHorizontally = false,
		topSeparatorShadow = false,
		topSeparatorBringToFront = false,
		showBottomSeparator = false,
		bottomSeparatorDesign = 'wave-1',
		bottomSeparatorColor = '',
		bottomSeparatorWidth = '',
		bottomSeparatorFlipHorizontally = false,
		bottomSeparatorShadow = false,
		bottomSeparatorBringToFront = false,
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Top Separator' ) }
				checked={ showTopSeparator }
				onChange={ showTopSeparator => setAttributes( { showTopSeparator } ) }
				className="ugb-top-block-separator-panel"
			>
				<DesignSeparatorControl
					label={ __( 'Design' ) }
					selected={ topSeparatorDesign }
					onChange={ topSeparatorDesign => setAttributes( { topSeparatorDesign } ) }
				/>
				<ColorPaletteControl
					label={ __( 'Color' ) }
					value={ topSeparatorColor }
					onChange={ topSeparatorColor => setAttributes( { topSeparatorColor } ) }
				/>
				<ResponsiveControl
					attrNameTemplate="topSeparator%sHeight"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedRangeControl
						label={ __( 'Height' ) }
						min="30"
						max="400"
						allowReset={ true }
					/>
				</ResponsiveControl>
				<AdvancedRangeControl
					label={ __( 'Width' ) }
					min="1"
					max="4"
					step="0.1"
					value={ topSeparatorWidth }
					onChange={ topSeparatorWidth => setAttributes( { topSeparatorWidth } ) }
					allowReset={ true }
				/>
				<ToggleControl
					label={ __( 'Flip Horizontally' ) }
					checked={ topSeparatorFlipHorizontally }
					onChange={ topSeparatorFlipHorizontally => setAttributes( { topSeparatorFlipHorizontally } ) }
				/>
				<ToggleControl
					label={ __( 'Shadow' ) }
					checked={ topSeparatorShadow }
					onChange={ topSeparatorShadow => setAttributes( { topSeparatorShadow } ) }
				/>
				<ToggleControl
					label={ __( 'Bring to Front' ) }
					checked={ topSeparatorBringToFront }
					onChange={ topSeparatorBringToFront => setAttributes( { topSeparatorBringToFront } ) }
				/>
			</PanelAdvancedSettings>
			<PanelAdvancedSettings
				title={ __( 'Bottom Separator' ) }
				checked={ showBottomSeparator }
				onChange={ showBottomSeparator => setAttributes( { showBottomSeparator } ) }
			>
				<DesignSeparatorControl
					label={ __( 'Design' ) }
					selected={ bottomSeparatorDesign }
					onChange={ bottomSeparatorDesign => setAttributes( { bottomSeparatorDesign } ) }
				/>
				<ColorPaletteControl
					label={ __( 'Color' ) }
					value={ bottomSeparatorColor }
					onChange={ bottomSeparatorColor => setAttributes( { bottomSeparatorColor } ) }
				/>
				<ResponsiveControl
					attrNameTemplate="bottomSeparator%sHeight"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedRangeControl
						label={ __( 'Height' ) }
						min="30"
						max="400"
						allowReset={ true }
					/>
				</ResponsiveControl>
				<AdvancedRangeControl
					label={ __( 'Width' ) }
					min="1"
					max="4"
					step="0.1"
					value={ bottomSeparatorWidth }
					onChange={ bottomSeparatorWidth => setAttributes( { bottomSeparatorWidth } ) }
					allowReset={ true }
				/>
				<ToggleControl
					label={ __( 'Flip Horizontally' ) }
					checked={ bottomSeparatorFlipHorizontally }
					onChange={ bottomSeparatorFlipHorizontally => setAttributes( { bottomSeparatorFlipHorizontally } ) }
				/>
				<ToggleControl
					label={ __( 'Shadow' ) }
					checked={ bottomSeparatorShadow }
					onChange={ bottomSeparatorShadow => setAttributes( { bottomSeparatorShadow } ) }
				/>
				<ToggleControl
					label={ __( 'Bring to Front' ) }
					checked={ bottomSeparatorBringToFront }
					onChange={ bottomSeparatorBringToFront => setAttributes( { bottomSeparatorBringToFront } ) }
				/>
			</PanelAdvancedSettings>
		</Fragment>
	)
}

const addAttributes = attributes => {
	return {
		...attributes,
		...createAllCombinationAttributes(
			'Show%sSeparator',
			{
				type: 'boolean',
				default: '',
			},
			[ 'Top', 'Bottom' ],
		),
		...createAllCombinationAttributes(
			'%sSeparator%s',
			{
				type: 'string',
				default: 'wave-1',
			},
			[ 'Top', 'Bottom' ],
			[ 'Design' ],
		),
		...createAllCombinationAttributes(
			'%sSeparator%s',
			{
				type: 'string',
				default: '',
			},
			[ 'Top', 'Bottom' ],
			[ 'Color' ],
		),
		...createAllCombinationAttributes(
			'%sSeparator%s',
			{
				type: 'number',
				default: '',
			},
			[ 'Top', 'Bottom' ],
			[ 'Height', 'TabletHeight', 'MobileHeight', 'Width' ],
		),
		...createAllCombinationAttributes(
			'%sSeparator%s',
			{
				type: 'boolean',
				default: '',
			},
			[ 'Top', 'Bottom' ],
			[ 'FlipHorizontally', 'Shadow', 'BringToFront' ],
		),
	}
}

const addShapeOutput = ( output, design, blockProps ) => {
	const {
		showTopSeparator = false,
		topSeparatorDesign = 'wave-1',
		topSeparatorShadow = false,
		showBottomSeparator = false,
		bottomSeparatorDesign = 'wave-1',
		bottomSeparatorShadow = false,
	} = blockProps.attributes

	return (
		<Fragment>
			{ output }
			{ showTopSeparator && (
				<Fragment>
					<div className="ugb-top-separator">
						<Separator design={ topSeparatorDesign } shadow={ topSeparatorShadow } />
					</div>
				</Fragment>
			) }
			{ showBottomSeparator && (
				<Fragment>
					<div className="ugb-bottom-separator">
						<Separator design={ bottomSeparatorDesign } shadow={ bottomSeparatorShadow } />
					</div>
				</Fragment>
			) }
		</Fragment>
	)
}

const addTopStyles = ( styleObject, props ) => {
	const {
		showTopSeparator = false,
		topSeparatorColor = '',
		topSeparatorHeight = '',
		topSeparatorTabletHeight = '',
		topSeparatorMobileHeight = '',
		topSeparatorWidth = '',
		topSeparatorFlipHorizontally = false,
		topSeparatorBringToFront = false,
	} = props.attributes

	if ( ! showTopSeparator ) {
		return styleObject
	}

	const styles = {
		[ `.ugb-top-separator` ]: {
			height: topSeparatorHeight !== '' ? `${ topSeparatorHeight }px` : undefined,
			zIndex: topSeparatorBringToFront ? 4 : undefined,
		},
		[ `.ugb-top-separator svg` ]: {
			fill: topSeparatorColor !== '' ? topSeparatorColor : '#fff',
			transform: topSeparatorFlipHorizontally ? 'scale(-1)' : undefined,
		},
		[ `.ugb-top-separator .ugb-separator-wrapper` ]: {
			transform: topSeparatorWidth !== '' ? `scaleX(${ topSeparatorWidth })` : undefined,
		},
		tablet: {
			[ `.ugb-top-separator` ]: {
				height: topSeparatorTabletHeight !== '' ? `${ topSeparatorTabletHeight }px` : undefined,
			},
		},
		mobile: {
			[ `.ugb-top-separator` ]: {
				height: topSeparatorMobileHeight !== '' ? `${ topSeparatorMobileHeight }px` : undefined,
			},
		},
	}

	return deepmerge( styleObject, styles )
}

const addBottomStyles = ( styleObject, props ) => {
	const {
		showBottomSeparator = false,
		bottomSeparatorColor = '',
		bottomSeparatorHeight = '',
		bottomSeparatorTabletHeight = '',
		bottomSeparatorMobileHeight = '',
		bottomSeparatorWidth = '',
		bottomSeparatorFlipHorizontally = false,
		bottomSeparatorBringToFront = false,
	} = props.attributes

	if ( ! showBottomSeparator ) {
		return styleObject
	}

	const styles = {
		[ `.ugb-bottom-separator` ]: {
			height: bottomSeparatorHeight !== '' ? `${ bottomSeparatorHeight }px` : undefined,
			zIndex: bottomSeparatorBringToFront ? 4 : undefined,
		},
		[ `.ugb-bottom-separator svg` ]: {
			fill: bottomSeparatorColor !== '' ? bottomSeparatorColor : '#fff',
			transform: bottomSeparatorFlipHorizontally ? 'scaleX(-1)' : undefined,
		},
		[ `.ugb-bottom-separator .ugb-separator-wrapper` ]: {
			transform: bottomSeparatorWidth !== '' ? `scaleX(${ bottomSeparatorWidth })` : undefined,
		},
		tablet: {
			[ `.ugb-bottom-separator` ]: {
				height: bottomSeparatorTabletHeight !== '' ? `${ bottomSeparatorTabletHeight }px` : undefined,
			},
		},
		mobile: {
			[ `.ugb-bottom-separator` ]: {
				height: bottomSeparatorMobileHeight !== '' ? `${ bottomSeparatorMobileHeight }px` : undefined,
			},
		},
	}

	return deepmerge( styleObject, styles )
}

const blockSeparators = blockName => {
	addFilter( `stackable.${ blockName }.edit.inspector.style.after`, `stackable/${ blockName }/block-separators`, addBlockSeparatorPanels, 20 )
	addFilter( `stackable.${ blockName }.attributes`, `stackable/${ blockName }/block-separators`, addAttributes )
	addFilter( `stackable.${ blockName }.edit.output.outer`, `stackable/${ blockName }/block-separators`, addShapeOutput )
	addFilter( `stackable.${ blockName }.save.output.outer`, `stackable/${ blockName }/block-separators`, addShapeOutput )
	addFilter( `stackable.${ blockName }.styles`, `stackable/${ blockName }/block-separators`, addTopStyles )
	addFilter( `stackable.${ blockName }.styles`, `stackable/${ blockName }/block-separators`, addBottomStyles )
	doAction( `stackable.module.block-separators`, blockName )
}

export default blockSeparators