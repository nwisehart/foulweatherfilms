
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

class Gallery extends React.Component {
	constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery () {
		const { images } = this.props;
		if (!images) return;

		const gallery = images.map((obj, i) => {
			return (
				<div className="photo" key={i}>
					<a
						href={obj.src}
						onClick={(e) => this.openLightbox(i, e)}
					>
						<div style={{backgroundImage: `url(${obj.src})`}} className="photoThumbnail"></div>
						<div className="photo-back"></div>
					</a>
				</div>
			);
		});

		return (
			<div>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div className="container">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
				{this.renderGallery()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					showThumbnails={this.props.showThumbnails}
					theme={this.props.theme}
				/>
			</div>
		);
	}
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: PropTypes.string,
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
	subheading: PropTypes.string,
};

// const gutter = {
// 	small: 2,
// 	large: 4,
// };
// const classes = StyleSheet.create({
// 	gallery: {
// 		marginRight: -gutter.small,
// 		overflow: 'hidden',

// 		'@media (min-width: 500px)': {
// 			marginRight: -gutter.large,
// 		},
// 	},

// 	// anchor
// 	thumbnail: {
// 		boxSizing: 'border-box',
// 		display: 'block',
// 		float: 'left',
// 		lineHeight: 0,
// 		paddingRight: gutter.small,
// 		paddingBottom: gutter.small,
// 		overflow: 'hidden',

// 		'@media (min-width: 500px)': {
// 			paddingRight: gutter.large,
// 			paddingBottom: gutter.large,
// 		},
// 	},

// 	// orientation
// 	landscape: {
// 		width: '30%',
// 	},
// 	square: {
// 		paddingBottom: 0,
// 		width: '40%',

// 		'@media (min-width: 500px)': {
// 			paddingBottom: 0,
// 		},
// 	},

// 	// actual <img />
// 	source: {
// 		border: 0,
// 		display: 'block',
// 		height: 'auto',
// 		maxWidth: '100%',
// 		width: 'auto',
// 	},
// });

export default Gallery;
