var React = require('react');
var NavigationComponent = require('./NavigationComponent');

var LineChart = require('react-d3/linechart').LineChart;
var BasicComponent = require('./BasicComponent');
var HeightDataComponent = require('./HeightDataComponent');
var WeightDataComponent = require('./WeightDataComponent');
var HeightDataCollection = require('../collections/HeightDataCollection');
var WeightDataCollection = require('../collections/WeightDataCollection');

module.exports = React.createClass({
	componentDidMount: function() {
		this.state.height.on('sync', function() {
			this.forceUpdate();
		}, this);
		
		this.state.weight.on('sync', function() {
			this.forceUpdate();
		}, this);
	},	
	getInitialState: function() {
		var self = this;
		var child = self.props.children1.forEach(function(child) {
			return child;
		});
		var allHeightInfo = new HeightDataCollection();
		var allWeightInfo = new WeightDataCollection();

		allHeightInfo.fetch({
			query: {
				userId: this.props.user.id
			}
		}).success(function() {
			self.state.height.on('add', function() {
				self.forceUpdate();
			}, self);
		});;

		allHeightInfo.on('change', function() {
			self.forceUpdate();
		});

		allWeightInfo.fetch({
			query: {
				userId: this.props.user.id
			}
		}).success(function() {
			self.state.weight.on('add', function() {
				self.forceUpdate();
			}, self);
		});

		allWeightInfo.on('change', function() {
			self.forceUpdate();
		});

		return {
			child: child,
			weight: allWeightInfo,
			height: allHeightInfo,
			showModal: false
		};
	},	
	render: function() {
		var self = this;
		var heightLines = [
			{
		    name: "Average height (inch)",
		    values: [ 
		    			{ x: 0, y: 19.4 },  { x: 1, y: 21.2 }, { x: 2, y: 22.1 }, { x: 3, y: 23.6 }, { x: 4, y: 24.5 }, { x: 5, y: 25.3 },
		    			{ x: 6, y: 25.9 }, { x: 7, y: 26.5 }, { x: 8, y: 27.1 }, { x: 9, y: 27.6 }, { x: 10, y: 28.2 }, { x: 11, y: 28.7 }, { x: 12, y: 29.2},
		    			{ x: 15, y: 30.6 }, { x: 18, y: 31.8 }, { x: 21, y: 32.9 }, { x: 24, y: 33.5 } 
		    		]
			}
		];
		var weightLines = [
			{
		    name: "Average weight (lbs)",
		    values: [ 
		    			{ x: 0, y: 7.3 },  { x: 1, y: 9.6 }, { x: 2, y: 11.7 }, { x: 3, y: 13.3 }, { x: 4, y: 14.6 }, { x: 5, y: 15.8 },
		    			{ x: 6, y: 16.6 }, { x: 7, y: 17.4 }, { x: 8, y: 18.1 }, { x: 9, y: 18.8 }, { x: 10, y: 19.4 }, { x: 11, y: 19.9 }, { x: 12, y: 20.4 }, 
		    			{ x: 15, y: 22 }, { x: 18, y: 23.4 }, { x: 21, y: 24.9 }, { x: 24, y: 26.5 }
		    		]
			}
		];
		var height = self.state.height;
		var weight = self.state.weight;

		if(height.length) {
			var childHeightData = [];
			height.each(function(model) {
				childHeightData.push({ x: model.get('age'), y: model.get('height') });
			});
			heightLines.push({
				name: self.state.child[0].attributes.name+"\'s height",
				values: childHeightData
			});
		}
		if(weight.length) {
			var childWeightData = [];
			weight.each(function(model) {
				childWeightData.push({ x: model.get('age'), y: model.get('weight') });
			});
			weightLines.push({
				name: self.state.child[0].attributes.name+"\'s weight",
				values: childWeightData
			});
		}
		return(
			<div>
				<BasicComponent user={this.props.user} app={this.props.app}>
					<NavigationComponent app={this.props.app} user={this.props.user} child={this.state.child} />	
					<div ref='chart'>
	        			<LineChart legend={true} data={weightLines} width={480} height={280} title="Weight Line Chart"/>
	        			<WeightDataComponent user={this.props.user} weight={this.state.weight} />
					</div>
					<div>
	        			<LineChart legend={true} data={heightLines} width={480} height={280} title="Height Line Chart" />
	        			<HeightDataComponent user={this.props.user} height={this.state.height} />
	        		</div>
				</BasicComponent>
			</div>
		);
	}
});