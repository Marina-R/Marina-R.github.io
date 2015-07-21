var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var HeightDataModel = require('../models/HeightDataModel');

module.exports = Backbone.Collection.extend({
	model: HeightDataModel,
	parseClassName: 'Height'
});