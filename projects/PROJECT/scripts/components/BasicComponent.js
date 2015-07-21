var React = require('react');
var DiaryPostsCollection = require('../collections/DiaryPostsCollection');
var DiaryPosts = new DiaryPostsCollection();
var moment= require('moment');
var $ = require('jquery');
var posts = require('./PostsComponent');

module.exports = React.createClass({
	render: function() {
		var self = this;
		var nav = {
			position: 'absolute',
			background: 'grey',
			minHeigth: '100%'
		};
		var main = {
			heigth: '100%'
		};
		var line = {
			top: 0,
			backgroundImage: 'url(../../images/bg-header2.png)',
			height: '3px',
			width: '100%'
		};
		var logo = {
			background: 'url(../../images/logo.png)',
			backgroundSize: 'cover',
			marginTop: '20px',
			marginLeft: '5px',
			height: '250px',
			listStyle: 'none'
		};
		
		var userId = this.props.user.id;
		return(
			<div id="wrapper" >
				<div style={line}></div>
				<div id="sidebar-wrapper" >
					<ul className="row sidebar-nav" id="sidebar"> 
						<li style={logo}></li>    
						<li><a onClick={this.gotoDiary}>Diary<span></span></a></li>
						<li><a onClick={this.gotoGallery}>Gallery<span></span></a></li>
						<li><a onClick={this.gotoHealth}>Medical Notes<span></span></a></li>
						<li><a onClick={this.gotoGrowth}>Growth<span></span></a></li>
						<li><a onClick={this.gotoProfile}>Child Profile<span></span></a></li>
					</ul>
				</div>
				<div id="page-content-wrapper" >
					{this.props.children}
				</div>
			</div>
		);
	},
	gotoDiary: function() {
		this.props.app.navigate('diary/'+this.props.user.id, {trigger: true});
	},
	gotoGallery: function() {
		this.props.app.navigate('gallery/'+this.props.user.id, {trigger: true});
	},
	gotoHealth: function() {
		this.props.app.navigate('health/'+this.props.user.id, {trigger: true});
	},
	gotoGrowth: function() {
		this.props.app.navigate('growth/'+this.props.user.id, {trigger: true});
	},
	gotoProfile: function() {
		this.props.app.navigate('profile/'+this.props.user.id, {trigger: true});
	}

});