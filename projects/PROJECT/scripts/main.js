var React = require('react');
var parseSettings = require('./config/parse.js');
var Backbone = require('backparse')(parseSettings);
var container = document.getElementById('container');
filepicker.setKey('AeK0dNOzoQx2TdjfEqKrOz');

var WelcomePageComponent = require('./components/WelcomePageComponent');
var LoginPageComponent = require('./components/LoginPageComponent');
var ChildInfoPageComponent = require('./components/ChildInfoPageComponent');
var DiaryPageComponent = require('./components/DiaryPageComponent');
var BasicComponent = require('./components/BasicComponent');
var NavigationComponent = require('./components/NavigationComponent');
var CalendarComponent = require('./components/CalendarComponent');
var ModalComponent = require('./components/ModalComponent');
var HealthPageComponent = require('./components/HealthPageComponent');
var GrowthPageComponent = require('./components/GrowthPageComponent');
var MedicalModalComponent = require('./components/MedicalModalComponent');
var PostsComponent = require('./components/PostsComponent');
var ChildProfilePageComponent = require('./components/ChildProfilePageComponent');
var GalleryPageComponent = require('./components/GalleryPageComponent');

var UserModel = require('./models/UserModel');
var ChildModel = require('./models/ChildModel');
var ChildrenCollection = require('./collections/ChildrenCollection');
var HealthPosts = require('./collections/HealthPostsCollection');

var user = new UserModel();
var children = new ChildrenCollection();	

function fetchChild(userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}
	children.fetch({
		query: q,
		success: function() {
			React.render(
				<DiaryPageComponent app={app} user={user} userId={userId} children1={children} />, 
				container
			);
		}
	})
};

function fetchChildForProfile (userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}
	children.fetch({
		query: q,
		success: function() {
			React.render(
				<ChildProfilePageComponent app={app} user={user} userId={userId} children1={children} />, 
				container
			);
		}
	})
};

function fetchChildForGrowth(userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}
	children.fetch({
		query: q,
		success: function() {
			React.render(
				<GrowthPageComponent user={user} app={app} userId={userId} children1={children} />,
				container
			);
		}
	})
};
function fetchChildForHealth(userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}
	children.fetch({
		query: q,
		success: function() {
			React.render(
				<HealthPageComponent user={user} app={app} userId={userId} children1={children} />,
				container
			);
		}
	})
};
function fetchChildForInfo (userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}
	children.fetch({
		query: q,
		success: function() {
			React.render(
				<ChildProfilePageComponent user={user} app={app} userId={userId} children1={children} />,
				container
			);
		}
	})
};
function fetchChildForGallery (userId) {
	var q = {};

	if(userId) {
		q.userId = userId;
	}
	children.fetch({
		query: q,
		success: function() {
			React.render(
				<GalleryPageComponent user={user} app={app} userId={userId} children1={children} />,
				container
			);
		}
	})
};
var App = Backbone.Router.extend({
	routes: {
		'': 'welcome',
		'login': 'login',
		'childInfo': 'childInfo',
		'diary/:userId': 'diary',
		'gallery/:userId': 'gallery',
		'health/:userId': 'health',
		'growth/:userId': 'growth',
		'profile/:userId': 'profile'
	},
	welcome: function () {
		React.render(
			<WelcomePageComponent user={user} app={app} />,
			container
		)
	},
	login: function () {
		React.render(
			<LoginPageComponent user={user} app={app} />,
			container
		)
	},
	childInfo: function () {
		React.render(
			<ChildInfoPageComponent user={user} app={app} />,
			container
		)
	},
	diary: function (userId) {
		fetchChild(userId);
	},
	gallery: function (userId) {
		fetchChildForGallery(userId);
	},
	health: function (userId) {
		fetchChildForHealth(userId);					
	},
	growth: function (userId) {
		fetchChildForGrowth(userId);
	},
	profile: function (userId) {
		fetchChildForInfo(userId);
	}
});

var app = new App();
Backbone.history.start();
