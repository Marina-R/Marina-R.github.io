var React = require('react');
var BasicComponent = require('./BasicComponent');
var NavigationComponent = require('./NavigationComponent');
var PostsComponent = require('./PostsComponent');
var UserModel = require('../models/UserModel');
var ChildModel = require('../models/ChildModel');
var CalendarComponent = require('./CalendarComponent');
var HealthPostsCollection = require('../collections/HealthPostsCollection');

var MedicalModalComponent = require('./MedicalModalComponent');
var Modal = require('react-modal');
Modal.setAppElement(container);
Modal.injectCSS();

var ChildrenCollection = require('../collections/ChildrenCollection');
var children = new ChildrenCollection();
var healthPosts = new HealthPostsCollection(); 

module.exports = React.createClass({
	componentWillMount: function() {
		this.state.posts.on('change', function() {
			this.forceUpdate();
		}, this);
		this.state.posts.on('sync', function() {
			this.forceUpdate();
		}, this);
	},	
	getInitialState: function() {
		var self = this;
	
		healthPosts.fetch({
			query: { 
				userId: this.props.user.id
			}
		}).success (function(posts) {
				self.setState({posts: posts});
			}
		);

		var child = self.props.children1.forEach(function(child) {
			return child;
		});

		healthPosts.on('change', function() {
			self.forceUpdate();
		});
		return {
			category: {},
			child: child,
			posts: healthPosts
		};
	},	
	render: function() {
		return(
			<div>
				<BasicComponent user={this.props.user} app={this.props.app} >
					<NavigationComponent user={this.props.user} app={this.props.app} child={this.state.child} />
					<div style={{overflow: 'hidden'}}>
						<form onSubmit={this.filterByCategory} style={{display: 'inline-block', float: 'left'}}>
							<select className="form-control col-sm-3" style={{width: 'inherit'}} ref='category'>
								<option value='' defaultValue>Choose category</option>
								<option value='Dental'>Dental</option>
								<option value='Doctor visit'>Doctor visit</option>
								<option value='Illness'>Illness</option>
								<option value='Immunization'>Immunization</option>
								<option value='Medicine'>Medicine</option>
								<option value='Other'>Other</option>
							</select>
							<button type='submit' className="btn btn-default" onSubmit={this.filterByCategory}>Filter</button>
						</form>
						<CalendarComponent user={this.props.user} style={{marginBottom: '20px'}} posts={this.state.posts} />
						<MedicalModalComponent user={this.props.user} posts={this.state.posts} />	
					</div>
					<PostsComponent posts={this.state.posts} user={this.props.user} />
				</ BasicComponent>
			</div>
		);
	},
	filterByCategory: function(e) {
		e.preventDefault();
		var self = this;
			healthPosts.fetch({
				query: { 
					category: this.refs.category.getDOMNode().value
				},
				success: function(posts) {
					self.setState({posts: posts});
				}
			});
		
	}
});
