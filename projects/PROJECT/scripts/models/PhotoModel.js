var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		userId: '',
		url: '',
		caption: '' 
	},
	parseClassName: 'Photos',
	isUser: true,
	idAttribute: 'objectId'
});