var React = require('react');
var BasicComponent = require('./BasicComponent');
var NavigationComponent = require('./NavigationComponent');
var PhotosCollection = require('../collections/PhotosCollection');

var ModalComponent = require('./ModalComponent');
var Modal = require('react-modal');
Modal.setAppElement(container);
Modal.injectCSS();

module.exports = React.createClass({
	componentWillMount: function() {
		this.state.photos.on('change', function() {
			this.forceUpdate();
		}, this);
		this.state.photos.on('sync', function() {
			this.forceUpdate();
		}, this);
	},	
	getInitialState: function() {
		var PhotoPosts = new PhotosCollection();
		var self = this;
		var child = self.props.children1.forEach(function(child) {
			return child;
		});
		PhotoPosts.fetch({
			query: { userId: this.props.user.id },
			success: function(photos) {
				self.setState({photos: photos});
			}
		});
		PhotoPosts.on('change', function() {
			self.forceUpdate();
		})
		return {
			child: child,
			photos: PhotoPosts,
			avatarUrl: ''
		}
	},	
	render: function() {
		return(
			<div>
				<BasicComponent user={this.props.user} app={this.props.app} >
					<NavigationComponent app={this.props.app} user={this.props.user} child={this.state.child} />
					<div style={{overflow: 'hidden'}}>
						<button type='button' onClick={this.uploadPhoto} className='btn btn-default'>
							<i className="fa fa-camera"></i> Add photo
						</button>
						<button type='button' onClick={this.createAlbum} className='btn btn-default'>
							<i className="fa fa-folder-open"></i> Create album
						</button>
					</div>		
				</BasicComponent>
			</div>
		);
	},
	uploadPhoto: function() {
		var self = this;
		filepicker.pickAndStore(
			{
				mimtype: 'image/*'
			},
			{},
			function(InkBlobs) {
				self.setState({
					photoUrl: InkBlobs[0].url
				});
			}
		);	
	},
	createAlbum: function() {

	}
});