var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		userId: '',
		title: '',
		body: null 
	},
	parseClassName: 'Diary',
	isUser: true,
	idAttribute: 'objectId'
});