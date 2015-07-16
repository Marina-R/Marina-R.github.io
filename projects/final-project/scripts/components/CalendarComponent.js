var React = require('react');
var DateRangePicker = require('../../node_modules/react-bootstrap-daterangepicker/lib/index.js');
var moment = require('moment');
var BS = require('react-bootstrap');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			ranges: {
				'Today': [moment(), moment()],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')]
			},
			startDate: moment().subtract(29, 'days'),
			endDate: moment()
		};
	},
	handleEvent: function (event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
	},
	render: function () {
		var start = this.state.startDate.format('YYYY-MM-DD');
		var end = this.state.endDate.format('YYYY-MM-DD');
		var label = start + ' - ' + end;
		if (start === end) {
			label = start;
		}
		return (
			<div  style={{float:'right', marginRight:'10px'}}>
				<DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onEvent={this.handleEvent}>
					<BS.Button className="selected-date-range-btn">
						<div className="pull-left"><BS.Glyphicon glyph="calendar" /></div>
						<div className="pull-right">
							<span>
								{label}
							</span>
							<span className="caret"></span>
						</div>
					</BS.Button>
				</DateRangePicker>
			</div>
		);
	}
});