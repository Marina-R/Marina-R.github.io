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
var Calendar = require('./components/CalendarComponent');
var HealthPageComponent = require('./components/HealthPageComponent');

var UserModel = require('./models/UserModel');
var ChildModel = require('./models/ChildModel');
var ChildrenCollection = require('./collections/ChildrenCollection');

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
			React.render(<DiaryPageComponent app={app} user={user} userId={userId} children1={children} />, container);
		}
	})
};

var App = Backbone.Router.extend({
	routes: {
		'': 'welcome',
		'login': 'login',
		'childInfo': 'childInfo',
		'diary/:userId': 'diary',
		'gallery': 'gallery',
		'health': 'health',
		'growth': 'growth',
		'profile': 'profile'
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
	gallery: function () {
		React.render(
			// <DiaryPageComponent app={app} />,
			// container
			<BasicComponent user={user} app={app} />,
			container
		)
	},
	health: function () {
		// React.render(
		// 	// <DiaryPageComponent app={app} />,
		// 	// container
		// 	// <BasicComponent user={user} app={app} />,
		// 	// container
		// )
	},
	growth: function () {
		React.render(
			// <DiaryPageComponent app={app} />,
			// container
			<BasicComponent user={user} app={app} />,
			container
		)
	},
	profile: function () {
		React.render(
			// <DiaryPageComponent app={app} />,
			// container
			<BasicComponent user={user} app={app} />,
			container
		)
	}
});

var app = new App();
Backbone.history.start();
