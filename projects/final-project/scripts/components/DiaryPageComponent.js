var React = require('react');
var BasicComponent = require('./BasicComponent');
var NavigationComponent = require('./NavigationComponent');
var UserModel = require('../models/UserModel');
var ChildModel = require('../models/ChildModel');
var CalendarComponent = require('./CalendarComponent');
var DiaryPostsCollection = require('../collections/DiaryPostsCollection');

var ModalComponent = require('./ModalComponent');
var Modal = require('react-modal');
Modal.setAppElement(container);
Modal.injectCSS();

module.exports = React.createClass({
	componentWillMount: function() {
		this.state.posts.on('change', function() {
			this.forceUpdate();
		}, this);
		this.state.posts.on('add', function() {
			this.forceUpdate();
		}, this);
	},	
	getInitialState: function() {
		var DiaryPosts = new DiaryPostsCollection();
		var self = this;
		var child = self.props.children1.forEach(function(child) {
			return child;
		});

		DiaryPosts.fetch({
			query: {userId: this.props.user.id},
			success: function(posts) {
				self.setState({posts: posts.models});
			}
		});
		DiaryPosts.on('change', function() {
			self.forceUpdate();
		})
		return {
			child: child,
			posts: DiaryPosts
		};
	},	
	render: function() {
		return(
			<div>
				<BasicComponent user={this.state.user} posts={this.state.posts} >
					<NavigationComponent app={this.props.app} user={this.props.user} child={this.state.child} />
					<div style={{overflow: 'hidden'}}>
						<CalendarComponent posts={this.state.posts} style={{marginBottom: '20px'}} />
						<ModalComponent user={this.props.user} posts={this.state.posts} />	
					</div>		
				</BasicComponent>
			</div>
		);
	}
});