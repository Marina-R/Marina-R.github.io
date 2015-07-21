var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		userId: '',
		height: null,
		age: null 
	},
	parseClassName: 'Height',
	isUser: true,
	idAttribute: 'objectId'
});