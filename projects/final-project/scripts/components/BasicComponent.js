var React = require('react');
var DiaryPostsCollection = require('../collections/DiaryPostsCollection');
var DiaryPosts = new DiaryPostsCollection();
var moment= require('moment');
var $ = require('jquery');

module.exports = React.createClass({
	componentDidMount: function() {
		this.state.posts.on('change', function() {
			this.forceUpdate();
		}, this);
	},
	getInitialState: function() {
		return {posts: this.props.posts}
	},
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
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive"
		};
		var bodyStyle = {
			fontFamily: "'Droid Sans', sans-serif",
			padding: '2em',
			backgroundColor: '#fbfaf8',
			color: 'black'
		};
		var blogStyle = {
			backgroundImage: 'url(https://d1wli5mq9yq9mw.cloudfront.net/static/images/bg_main.gif)',
			paddingBottom: '3em',
			boxShadow: '0 1px 3px rgba(0,0,0,.2)'
		};
		var imageStyle = {
			marginLeft: '1em',
			maxWidth: '100%',
			maxHeight: '100%'
		};
		var deletePost = {
			margin: '10px',
			float: 'right',
			cursor: 'pointer'
		};
		var createdAt = {
			textAlign:'right',
			marginRight: '10px',
			color: '#69666B'
		};
		var posts = this.props.posts.map(function(postModel, i) {
			return(
				<div key={postModel.cid}>
					<div style={blogStyle}>
						<div style={titleStyle}>
							<h3>{postModel.get('title')}</h3>
						</div>
						<div >
							<p style={createdAt}>{moment(postModel.get('createdAt')).fromNow()}</p>
						</div>
						<div style={bodyStyle} dangerouslySetInnerHTML={{__html: postModel.get('body')}}></div>
						<a style={deletePost} ref={'item'+i} key={i} onClick={self.removePost.bind(self, i)}><i className="fa fa-trash-o"></i> Remove</a>
					</div>
				</div>
			);
		})
		return(
			<div id="wrapper" >
				<div style={line}></div>
				<div id="sidebar-wrapper" >
					<ul className="row sidebar-nav" id="sidebar"> 
						<li style={logo}></li>    
						<li><a href='#diary'>Diary<span></span></a></li>
						<li><a href='#gallery'>Gallery<span></span></a></li>
						<li><a href='#health'>Health Notes<span></span></a></li>
						<li><a href='#growth'>Growth<span></span></a></li>
						<li><a href='#profile'>Child Profile<span></span></a></li>
					</ul>
				</div>
				<div id="page-content-wrapper" >
					{this.props.children}
					<div className="page-content inset">
						<div>
							{posts}
						</div>

					</div>
				</div>
			</div>
		);
	},
	removePost: function(index) {

		var self = this;
		var post = this.state.posts.at(index);

		this.state.posts.remove(post);
		post.destroy();
		self.forceUpdate();

	}
});