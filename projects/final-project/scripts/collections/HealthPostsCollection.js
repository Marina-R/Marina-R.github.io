var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var HealthPostModel = require('../models/HealthPostModel');

module.exports = Backbone.Collection.extend({
	model: HealthPostModel,
	parseClassName: 'Health'
});