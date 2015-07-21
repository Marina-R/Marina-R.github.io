var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		userId: '',
		weight: null,
		age: null 
	},
	parseClassName: 'Weight',
	isUser: true,
	idAttribute: 'objectId'
});