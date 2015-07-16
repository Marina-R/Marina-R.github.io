var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		userId: '',
		name: '',
		nickname:'',
		gender: '',
		DOB: '',
		TOB: '',
		eyeColor: '',
		avatarUrl: ''
	},
	parseClassName: 'Child',
	isUser: true,
	idAttribute: 'objectId'
});
