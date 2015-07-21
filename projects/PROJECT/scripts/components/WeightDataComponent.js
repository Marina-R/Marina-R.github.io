var React = require('react');
var Modal = require('react-modal');
var WeightDataCollection = require('../collections/WeightDataCollection');
var WeightDataModel = require('../models/WeightDataModel');
var Modal = require('react-modal');
Modal.setAppElement(container);
Modal.injectCSS();

module.exports = React.createClass({
	getInitialState: function() {
		return {showModal: false};
	},
	openModal: function() {
		this.setState({showModal: true});
	},
	closeModal: function() {
		this.setState({showModal: false});
	},
	render: function() {
		return(
			<div style={{overflow: 'hidden', marginTop: '20px'}}>
				<button style={{float:'left', marginRight:'15px'}} onClick={this.openModal} className='btn btn-default'>
					<i className="fa fa-file-text"></i>  Add weight data
				</button>
				<Modal 
					isOpen={this.state.showModal}
					onRequestClose={this.closeModal}
					style={{top:'25%', left:'35%'}}
				>	
					<h4>Enter your child current weight information</h4>
					<form onSubmit={this.sendWeight}>
						<div style={{margin: '5px'}}>
							<label> Age (months)</label><br/>
							<input type='number' ref='ageWeight' placeholder='e.g. 12'/>
							
						</div>
						<div style={{margin: '5px'}}>
							<label> Weight (pounds)</label><br/>
							<input type='number' ref='weight' placeholder='e.g. 19.3'/>
						</div>
					</form>
					<button style={{margin: '5px'}} type='button' className="btn btn-success" onClick={this.sendWeight}>Save</button>
					<button style={{margin: '5px'}} className="btn btn-default" type='button' onClick={this.closeModal}>Cancel</button>		
				</Modal>
			</div>
		)
	},
	sendWeight: function(e) {
		e.preventDefault();
		
		var weightData = new WeightDataModel({
			userId: this.props.user.id,
			age: parseFloat(this.refs.ageWeight.getDOMNode().value),
			weight: parseFloat(this.refs.weight.getDOMNode().value)
		});
		weightData.save();
		this.props.weight.add(weightData);
		console.log(weightData);
		this.closeModal();
	}
});