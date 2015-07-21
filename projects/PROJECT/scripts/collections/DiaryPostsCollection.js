var parseSettings = require('../config/parse.js');
var Backbone = require('backparse')(parseSettings);
var DiaryPostModel = require('../models/DiaryPostModel');

module.exports = Backbone.Collection.extend({
	model: DiaryPostModel,
	parseClassName: 'Diary'
});