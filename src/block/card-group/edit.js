import {
	InnerBlocks,
} from '@wordpress/block-editor'
import { Fragment, useState } from '@wordpress/element'
import {
	BlockContainer,
	InspectorTabs,
	InspectorStyleControls,
	InspectorControls,
	PanelAdvancedSettings,
	InspectorSectionControls,
} from '~stackable/components'
import { i18n } from 'stackable'
import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import {
	useUniqueId,
} from '~stackable/hooks'

const edit = props => {
	const {
		setAttributes,
	} = props
	const {
		hasBackground,
	} = props.attributes

	useUniqueId( props )

	const blockClassNames = classnames( [
		'stk-card-group',
		'stk-block',
		'stk-row',
		`stk-${ props.attributes.uniqueId }`,
	], {
		'stk-block-background': hasBackground,
	} )

	const contentClassNames = classnames( [
		'stk-inner-blocks',
		'stk-block-content',
	] )

	return <Fragment>

		<InspectorTabs
			{ ...props }
		/>

		<InspectorSectionControls>
			<PanelAdvancedSettings
				title={ __( 'Background', i18n ) }
				id="background"
				checked={ hasBackground }
				onChange={ hasBackground => setAttributes( { hasBackground } ) }
				// toggleOnSetAttributes={ [
				// 	'arrowSize',
				// 	'arrowColor',
				// ] }
				toggleAttributeName="hasBackground"
			>
			</PanelAdvancedSettings>
		</InspectorSectionControls>

		<div className={ blockClassNames } data-id={ props.attributes.uniqueId }>
			<div className={ contentClassNames }>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ [ 'stackable/card' ] }
				/>
			</div>
		</div>
	</Fragment>
}

export default edit
