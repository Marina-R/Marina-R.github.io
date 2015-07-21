var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var PhotoModel = require('../models/PhotoModel');

module.exports = Backbone.Collection.extend({
	model: PhotoModel,
	parseClassName: 'Photos'
});