var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		name: '',
		username: '',
		email:'',
		password: ''
	},
	parseClassName: '_User',
	isUser: true,
	idAttribute: 'objectId'
});