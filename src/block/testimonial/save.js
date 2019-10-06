/**
 * Internal dependencies
 */
import { createStyles } from './style'
import { showOptions } from './util'

/**
 * External dependencies
 */
import {
	hasBackgroundOverlay,
	range,
	createVideoBackground,
} from '~stackable/util'
import {
	BlockContainer,
	Image,
} from '~stackable/components'
import { withBlockStyles, withUniqueClass } from '~stackable/higher-order'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'

const save = props => {
	const { className, attributes } = props
	const {
		columns = 2,
		design = 'basic',
		shadow = 3,
		nameTag = 'h4',
		imageShape = 'circle',
		imageShapeStretch = false,
		imageWidth = '',
		showTestimonial = true,
		showImage = true,
		showName = true,
		showPosition = true,
	} = attributes

	const mainClasses = classnames( [
		className,
		'ugb-testimonial--v3',
		`ugb-testimonial--columns-${ columns }`,
		`ugb-testimonial--design-${ design }`,
	], applyFilters( 'stackable.testimonial.mainclasses', {
	}, props ) )

	const show = showOptions( props )

	return (
		<BlockContainer.Save className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const imageUrl = attributes[ `image${ i }Url` ]
					const imageId = attributes[ `image${ i }Id` ]
					const imageAlt = attributes[ `image${ i }Alt` ]
					const name = attributes[ `name${ i }` ]
					const position = attributes[ `position${ i }` ]
					const testimonial = attributes[ `testimonial${ i }` ]

					const itemClasses = classnames( [
						'ugb-testimonial__item',
						`ugb-testimonial__item${ i }`,
					], applyFilters( 'stackable.testimonial.itemclasses', {
						'ugb--has-background-overlay': show.columnBackground && hasBackgroundOverlay( 'column%s', props.attributes ),
						[ `ugb--shadow-${ shadow }` ]: show.columnBackground && shadow !== 3,
					}, props, i ) )

					const bodyWrapperClasses = classnames( [
						'ugb-testimonial__body-wrapper',
					], applyFilters( 'stackable.testimonial.bodywrapperclasses', {}, props, i ) )

					return (
						<div className={ itemClasses } key={ i }>
							{ show.columnBackground && createVideoBackground( 'column%s', props ) }
							<div className={ bodyWrapperClasses }>
								{ showTestimonial &&
									<RichText.Content
										tagName="p"
										className="ugb-testimonial__body"
										value={ testimonial }
									/>
								}
							</div>
							<div className="ugb-testimonial__person">
								{ ! show.imageAsBackground && showImage && imageUrl &&
									<div className="ugb-testimonial__image">
										<Image
											imageId={ imageId }
											src={ imageUrl }
											width={ imageWidth }
											alt={ imageAlt || ( showName && name ) }
											shape={ attributes[ `image${ i }Shape` ] || imageShape }
											shapeStretch={ attributes[ `image${ i }ShapeStretch` ] || imageShapeStretch }
										/>
									</div>
								}
								{ show.imageAsBackground && showImage && imageUrl &&
									<div className="ugb-testimonial__image"></div>
								}
								{ showName &&
									<RichText.Content
										tagName={ nameTag || 'h4' }
										className="ugb-testimonial__name"
										value={ name }
									/>
								}
								{ showPosition &&
									<RichText.Content
										tagName="p"
										className="ugb-testimonial__position"
										value={ position }
									/>
								}
							</div>
						</div>
					)
				} ) }
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withBlockStyles( createStyles ),
)( save )
