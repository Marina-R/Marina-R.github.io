var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var WeightDataModel = require('../models/WeightDataModel');

module.exports = Backbone.Collection.extend({
	model: WeightDataModel,
	parseClassName: 'Weight'
});