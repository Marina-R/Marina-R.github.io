var React = require('react');
var Modal = require('react-modal');
var HeightDataCollection = require('../collections/HeightDataCollection');
var HeightDataModel = require('../models/HeightDataModel');
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
					<i className="fa fa-file-text"></i>  Add height data
				</button>
				<Modal 
					isOpen={this.state.showModal}
					onRequestClose={this.closeModal}
					style={{top:'25%', left:'35%'}}
				>	
					<h4>Enter your child current height information</h4>
					<form onSubmit={this.sendHeight}>
						<div style={{margin: '5px'}}>
							<label> Age (months)</label><br/>
							<input type='number' ref='ageHeight' placeholder='e.g. 12'/>
							
						</div>
						<div style={{margin: '5px'}}>
							<label> Height (inches)</label><br/>
							<input type='number' ref='height' placeholder='e.g. 19.3'/>
						</div>
					</form>
					<button style={{margin: '5px'}} type='button' className="btn btn-success" onClick={this.sendHeight}>Save</button>
					<button style={{margin: '5px'}} className="btn btn-default" type='button' onClick={this.closeModal}>Cancel</button>		
				</Modal>
			</div>
		)
	},
	sendHeight: function(e) {
		e.preventDefault();
		
		var heightData = new HeightDataModel({
			userId: this.props.user.id,
			age: parseFloat(this.refs.ageHeight.getDOMNode().value),
			height: parseFloat(this.refs.height.getDOMNode().value)
		});
		heightData.save();
		this.props.height.add(heightData);
		this.closeModal();
	}
});