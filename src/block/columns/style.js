/**
 * External dependencies
 */
import {
	appendImportant,
	createBackgroundStyleSet,
	whiteIfDarkBlackIfLight,
	__getValue,
	createResponsiveStyles,
	createResponsiveEditorStyles,
} from '~stackable/util'
import deepmerge from 'deepmerge'
import { range } from 'lodash'

/**
 * Internal dependencies
 */
import { showOptions, getColumnCountFromDesign } from './util'

export const createStyles = props => {
	const getValue = __getValue( props.attributes )

	const styles = []

	const {
		design = 'plain',
		columns = 2,
		uniqueClass = '',
	} = props.attributes

	const show = showOptions( props )

	// Columns.
	const numColumns = getColumnCountFromDesign( columns, design )
	const columnRanges = range( numColumns ).map( i => {
		const width = parseInt( getValue( `columns${ i + 1 }` ), 10 )
		return ( width / 100 * columns ).toFixed( 2 ) + 'fr' // Fraction.
	} )
	const tabletColumnRanges = range( numColumns ).map( i => {
		const width = parseInt( getValue( `tabletColumns${ i + 1 }` ), 10 )
		return ( width / 100 * columns ).toFixed( 2 ) + 'fr' // Fraction.
	} )
	styles.push( {
		'> .ugb-inner-block > .ugb-block-content > .ugb-columns__item': {
			gridTemplateColumns: appendImportant( columnRanges.join( ' ' ) ),
		},
		tablet: {
			'> .ugb-inner-block > .ugb-block-content > .ugb-columns__item': {
				gridTemplateColumns: getValue( `tabletColumns1` ) ? appendImportant( tabletColumnRanges.join( ' ' ) ) : undefined,
			},
		},
		editor: {
			'> .ugb-inner-block > .ugb-block-content > .ugb-columns__item > .block-editor-inner-blocks > .block-editor-block-list__layout': {
				gridTemplateColumns: appendImportant( columnRanges.join( ' ' ) ),
			},
		},
	} )

	// Horizontal gap.
	styles.push( ...createResponsiveStyles( `.${ uniqueClass }-content-wrapper`, '%sHorizontalGap', 'gridColumnGap', '%spx', props.attributes, true ) )
	styles.push( ...createResponsiveEditorStyles( `.${ uniqueClass }-content-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout`, '%sHorizontalGap', 'gridColumnGap', '%spx', props.attributes, true ) )

	// Vertical gap.
	if ( show.verticalGap ) {
		styles.push( ...createResponsiveStyles( `.${ uniqueClass }-content-wrapper`, '%sVerticalGap', 'gridRowGap', '%spx', props.attributes, true ) )
		styles.push( ...createResponsiveEditorStyles( `.${ uniqueClass }-content-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout`, '%sVerticalGap', 'gridRowGap', '%spx', props.attributes, true ) )
	}

	// Height.
	const {
		height = '',
		tabletHeight = '',
		mobileHeight = '',
	} = props.attributes
	styles.push( {
		[ `` ]: {
			paddingTop: height === 'tall' ? '110px !important' : undefined,
			paddingBottom: height === 'tall' ? '110px !important' : undefined,
			minHeight: height === 'half' ? '50vh' :
				height === 'full' ? '100vh' :
					undefined,
		},
		tablet: {
			[ `` ]: {
				paddingTop: tabletHeight === 'tall' ? '110px !important' : undefined,
				paddingBottom: tabletHeight === 'tall' ? '110px !important' : undefined,
				minHeight: tabletHeight === 'half' ? '50vh' :
					tabletHeight === 'full' ? '100vh' :
						undefined,
			},
		},
		mobile: {
			[ `` ]: {
				paddingTop: mobileHeight === 'tall' ? '110px !important' : undefined,
				paddingBottom: mobileHeight === 'tall' ? '110px !important' : undefined,
				minHeight: mobileHeight === 'half' ? '50vh' :
					mobileHeight === 'full' ? '100vh' :
						undefined,
			},
		},
	} )

	// Column Vertical Align.
	styles.push( ...createResponsiveStyles( `.${ uniqueClass }-content-wrapper > .ugb-column`, '%sColumnVerticalAlign', 'alignItems', '%s', props.attributes, true ) )
	styles.push( ...createResponsiveStyles( `.${ uniqueClass }-content-wrapper > .ugb-column > .ugb-inner-block`, '%sColumnVerticalAlign', 'height', 'auto', props.attributes, true ) )

	// Column Vertical Align editor only.
	const {
		columnVerticalAlign = '',
		tabletColumnVerticalAlign = '',
		mobileColumnVerticalAlign = '',
	} = props.attributes
	const columnEditorSelector = `.${ uniqueClass }-content-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .block-editor-block-list__block`
	styles.push( {
		editor: {
			[ `${ columnEditorSelector } > .ugb-column` ]: {
				height: appendImportant( columnVerticalAlign && columnVerticalAlign !== 'stretch' ? 'auto' : undefined ),
			},
			[ columnEditorSelector ]: {
				justifyContent: getValue( 'columnVerticalAlign' ),
			},
			tablet: {
				[ `${ columnEditorSelector } > .ugb-column` ]: {
					height: appendImportant( tabletColumnVerticalAlign && tabletColumnVerticalAlign !== 'stretch' ? 'auto' : undefined ),
				},
				[ columnEditorSelector ]: {
					justifyContent: getValue( 'tabletColumnVerticalAlign' ),
				},
			},
			mobile: {
				[ `${ columnEditorSelector } > .ugb-column` ]: {
					height: appendImportant( mobileColumnVerticalAlign && mobileColumnVerticalAlign !== 'stretch' ? 'auto' : undefined ),
				},
				[ columnEditorSelector ]: {
					justifyContent: getValue( 'mobileColumnVerticalAlign' ),
				},
			},
		},
	} )

	// Text Colors.
	styles.push( {
		[ 'h1, ' +
		  'h2, ' +
		  'h3, ' +
		  'h4, ' +
		  'h5, ' +
		  'h6' ]: {
			color: getValue( 'headingColor' ),
		},
		[ 'p, ' +
		  'li, ' +
		  'label, ' +
		  'table' ]: {
			color: getValue( 'bodyTextColor' ),
		},
		[ 'a, ' +
		  'a:visited, ' +
		  'a:focus' ]: {
			color: getValue( 'linkColor' ),
		},
		'a:hover': {
			color: getValue( 'linkHoverColor' ),
		},
	} )

	// ColumnVerticalAlign

	// if ( show.borderRadius ) {
	// 	styles.push( {
	// 		[ `.${ uniqueClass }-wrapper.ugb-container__wrapper` ]: {
	// 			borderRadius: getValue( 'borderRadius', '%spx !important' ),
	// 		},
	// 		// Block editor only styles. This is needed since in the editor, we don't hide overflow
	// 		// so that the block controls wouldn't be cut off from view.
	// 		editor: {
	// 			[ `.${ uniqueClass }-wrapper.ugb-container__wrapper > .ugb-video-background, ` +
	// 			  `.${ uniqueClass }-wrapper.ugb-container__wrapper:before` ]: {
	// 				borderRadius: getValue( 'borderRadius', '%spx !important' ) || '12px !important',
	// 			},
	// 		},
	// 	} )
	// }

	// // Define the column vertical align here since it doesn't work.
	// // The default way of doing "column vertical align" is disabled in `index.js`
	// styles.push( {
	// 	'> .ugb-inner-block > .ugb-block-content > *': {
	// 		justifyContent: appendImportant( getValue( 'columnContentVerticalAlign' ) ),
	// 	},
	// 	tablet: {
	// 		'> .ugb-inner-block > .ugb-block-content > *': {
	// 			justifyContent: appendImportant( getValue( 'tabletColumnContentVerticalAlign' ) ),
	// 		},
	// 	},
	// 	mobile: {
	// 		'> .ugb-inner-block > .ugb-block-content > *': {
	// 			justifyContent: appendImportant( getValue( 'mobileColumnContentVerticalAlign' ) ),
	// 		},
	// 	},
	// } )

	// // Height.
	// const {
	// 	height = '',
	// 	tabletHeight = '',
	// 	mobileHeight = '',
	// } = props.attributes
	// styles.push( {
	// 	[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 		paddingTop: height === 'short' ? '35px !important' :
	// 			height === 'tall' ? '120px !important' :
	// 				undefined,
	// 		paddingBottom: height === 'short' ? '35px !important' :
	// 			height === 'tall' ? '120px !important' :
	// 				undefined,
	// 	},
	// 	[ `.${ uniqueClass }-wrapper.ugb-container__wrapper` ]: {
	// 		minHeight: height === 'half' ? '50vh' :
	// 			height === 'full' ? '100vh' :
	// 				undefined,
	// 		// Remove top/bottom padding for the short/tall height to display properly.
	// 		paddingTop: height === 'short' || height === 'tall' ? '0 !important' : undefined,
	// 		paddingBottom: height === 'short' || height === 'tall' ? '0 !important' : undefined,
	// 	},
	// 	tablet: {
	// 		[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 			paddingTop: tabletHeight === 'short' ? '35px !important' :
	// 				tabletHeight === 'tall' ? '120px !important' :
	// 					undefined,
	// 			paddingBottom: tabletHeight === 'short' ? '35px !important' :
	// 				tabletHeight === 'tall' ? '120px !important' :
	// 					undefined,
	// 		},
	// 		[ `.${ uniqueClass }-wrapper.ugb-container__wrapper` ]: {
	// 			minHeight: tabletHeight === 'half' ? '50vh' :
	// 				tabletHeight === 'full' ? '100vh' :
	// 					undefined,
	// 			// Remove top/bottom padding for the short/tall height to display properly.
	// 			paddingTop: tabletHeight === 'short' || tabletHeight === 'tall' ? '0 !important' : undefined,
	// 			paddingBottom: tabletHeight === 'short' || tabletHeight === 'tall' ? '0 !important' : undefined,
	// 		},
	// 	},
	// 	mobile: {
	// 		[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 			paddingTop: mobileHeight === 'short' ? '35px !important' :
	// 				mobileHeight === 'tall' ? '120px !important' :
	// 					undefined,
	// 			paddingBottom: mobileHeight === 'short' ? '35px !important' :
	// 				mobileHeight === 'tall' ? '120px !important' :
	// 					undefined,
	// 		},
	// 		[ `.${ uniqueClass }-wrapper.ugb-container__wrapper` ]: {
	// 			minHeight: mobileHeight === 'half' ? '50vh' :
	// 				mobileHeight === 'full' ? '100vh' :
	// 					undefined,
	// 			// Remove top/bottom padding for the short/tall height to display properly.
	// 			paddingTop: mobileHeight === 'short' || mobileHeight === 'tall' ? '0 !important' : undefined,
	// 			paddingBottom: mobileHeight === 'short' || mobileHeight === 'tall' ? '0 !important' : undefined,
	// 		},
	// 	},
	// } )

	// // Vertical align
	// const wrapperHasHeight = height && ( height === 'half' || height === 'full' )
	// const wrapperTabletHasHeight = tabletHeight && ( tabletHeight === 'half' || tabletHeight === 'full' )
	// const wrapperMobileHasHeight = mobileHeight && ( mobileHeight === 'half' || mobileHeight === 'full' )
	// if ( wrapperHasHeight ) {
	// 	styles.push( {
	// 		[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 			justifyContent: getValue( 'contentVerticalAlign' ),
	// 		},
	// 	} )
	// }
	// if ( wrapperHasHeight || wrapperTabletHasHeight ) {
	// 	styles.push( {
	// 		tablet: {
	// 			[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 				justifyContent: getValue( 'contentTabletVerticalAlign' ),
	// 			},
	// 		},
	// 	} )
	// }
	// if ( wrapperHasHeight || wrapperTabletHasHeight || wrapperMobileHasHeight ) {
	// 	styles.push( {
	// 		mobile: {
	// 			[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 				justifyContent: getValue( 'contentMobileVerticalAlign' ),
	// 			},
	// 		},
	// 	} )
	// }

	// // Content width.
	// // If the width is small, we need to use a 70% width in smaller screens to make the width be manageable if not smaller widths are used.
	// // We do the responsiveness here since doing it in style.scss is a headache with the !important rules.
	// const isSmallWidth = getValue( 'contentWidth' ) ? parseInt( getValue( 'contentWidth' ), 10 ) <= 50 : false
	// styles.push( {
	// 	[ `.${ uniqueClass }-content-wrapper.ugb-container__content-wrapper` ]: {
	// 		width: appendImportant( getValue( 'contentWidth', '%s%' ) ),
	// 	},
	// 	tablet: {
	// 		[ `.${ uniqueClass }-content-wrapper.ugb-container__content-wrapper` ]: {
	// 			width: appendImportant( getValue( 'contentTabletWidth', '%s%', isSmallWidth ? '70%' : undefined ) ),
	// 		},
	// 	},
	// 	mobile: {
	// 		[ `.${ uniqueClass }-content-wrapper.ugb-container__content-wrapper` ]: {
	// 			width: appendImportant( getValue( 'contentMobileWidth', '%s%', getValue( 'contentTabletWidth', '%s%', isSmallWidth ? '70%' : undefined ) ) ),
	// 		},
	// 	},
	// } )

	// // Content horizontal align.
	// styles.push( {
	// 	[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 		alignItems: appendImportant( getValue( 'contentHorizontalAlign' ) ),
	// 	},
	// 	tablet: {
	// 		[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 			alignItems: appendImportant( getValue( 'contentTabletHorizontalAlign' ) ),
	// 		},
	// 	},
	// 	mobile: {
	// 		[ `.${ uniqueClass }-wrapper > .ugb-container__side` ]: {
	// 			alignItems: appendImportant( getValue( 'contentMobileHorizontalAlign' ) ),
	// 		},
	// 	},
	// } )

	// // Column Background.
	// const columnBackgroundOptions = {
	// 	importantBackgroundColor: true,
	// }
	// styles.push( {
	// 	...( show.columnBackground ? createBackgroundStyleSet( 'column%s', `${ uniqueClass }-wrapper.ugb-container__wrapper`, props.attributes, columnBackgroundOptions ) : {} ),
	// } )

	// // Text Colors.
	// const {
	// 	columnBackgroundColor = '',
	// 	headingColor = '',
	// 	bodyTextColor = '',
	// } = props.attributes
	// styles.push( {
	// 	[ 'h1, ' +
	// 	  'h2, ' +
	// 	  'h3, ' +
	// 	  'h4, ' +
	// 	  'h5, ' +
	// 	  'h6' ]: {
	// 		color: getValue( 'headingColor' ),
	// 	},
	// 	[ 'p, ' +
	// 	  'li, ' +
	// 	  'table' ]: {
	// 		color: getValue( 'bodyTextColor' ),
	// 	},
	// 	[ 'a, ' +
	// 	  'a:visited, ' +
	// 	  'a:focus' ]: {
	// 		color: getValue( 'linkColor' ),
	// 	},
	// 	'a:hover': {
	// 		color: getValue( 'linkHoverColor' ),
	// 	},
	// } )

	// // When there's a background color, change the text colors of all immediate core block children.
	// // Don't color all children since Stackable blocks and others might have their own background colors.
	// styles.push( {
	// 	[ `.${ uniqueClass }-content-wrapper > h1, ` +
	// 	  `.${ uniqueClass }-content-wrapper > h2, ` +
	// 	  `.${ uniqueClass }-content-wrapper > h3, ` +
	// 	  `.${ uniqueClass }-content-wrapper > h4, ` +
	// 	  `.${ uniqueClass }-content-wrapper > h5, ` +
	// 	  `.${ uniqueClass }-content-wrapper > h6` ]: {
	// 		color: whiteIfDarkBlackIfLight( headingColor, show.columnBackground && columnBackgroundColor ),
	// 	},
	// 	[ `.${ uniqueClass }-content-wrapper > p, ` +
	// 	  `.${ uniqueClass }-content-wrapper > ol li, ` +
	// 	  `.${ uniqueClass }-content-wrapper > ul li` ]: {
	// 		color: whiteIfDarkBlackIfLight( bodyTextColor, show.columnBackground && columnBackgroundColor ),
	// 	},

	// 	// Editor only styles for colorizing the headings & text of immediate inner blocks.
	// 	// This doesn't get rendered in the frontend.
	// 	editor: {
	// 		[ `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/heading"] h1, ` +
	// 		  `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/heading"] h2, ` +
	// 		  `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/heading"] h3, ` +
	// 		  `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/heading"] h4, ` +
	// 		  `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/heading"] h5, ` +
	// 		  `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/heading"] h6` ]: {
	// 			color: whiteIfDarkBlackIfLight( headingColor, show.columnBackground && columnBackgroundColor ),
	// 		},
	// 		[ `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/paragraph"] p, ` +
	// 		  `.${ uniqueClass }-content-wrapper > * > * [data-type*="core/list"] li` ]: {
	// 			color: whiteIfDarkBlackIfLight( bodyTextColor, show.columnBackground && columnBackgroundColor ),
	// 		},
	// 	},
	// } )

	return deepmerge.all( styles )
}

export default createStyles