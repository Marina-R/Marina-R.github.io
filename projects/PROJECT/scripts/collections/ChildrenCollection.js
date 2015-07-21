var parseSettings = require('../config/parse');
var Backbone = require('backparse')(parseSettings);
var ChildModel = require('../models/ChildModel');

module.exports = Backbone.Collection.extend({
	model: ChildModel,
	parseClassName: 'Child'
});