var React = require('react');
var Modal = require('react-modal');
var ChildModel = require('../models/ChildModel');

module.exports = React.createClass({
	
	getInitialState: function() {
		return {
			showModal: false,
			avatarUrl: this.props.child.models[0].attributes.avatarUrl
		};
	},
	openModal: function() {
		this.setState({
			showModal: true
		});
	},
	closeModal: function() {
		this.setState({showModal: false});
	},
	render: function() {
		var form = {
			backgroundColor: '#e4e1d3',
			width: '65%',
			padding: '20px'
		};
		var avatarStyle = {
			height: '150px',
			width: '150px',
			backgroundImage: 'url('+this.state.avatarUrl+')',
			backgroundSize: '100%',
			backgroundRepeat: 'no-repeat',
			margin: '5px'
		};
		var labelStyle = {
			fontFamily:'CabinScetch',
			fontSize: '17px'
		};
		return(
			<div >
				<button className="btn btn-info btn-block form-btn" onClick={this.openModal}>Edit</button>
				<Modal 
					isOpen={this.state.showModal}
					onRequestClose={this.closeModal}
				>
					<div className='row col-xs-12' style={{marginTop:'50px'}}>	
						<div className='col-xs-3' >
							<div style={avatarStyle}> </div>
							<button type='button' onClick={this.uploadAvatar} className='btn btn-default'>Change avatar</button>
						</div>
						<div className='col-xs-6' style={form}>
							<form className='form-horizontal' ref='registerForm' onSubmit={this.changeProfile}>
								<div className='form-group'>
									<label className='col-xs-6 control-label' style={labelStyle}>Name</label>
									<div className='col-xs-6'>
										<input type="text" ref='childName' className="form-control" placeholder={this.props.child.models[0].attributes.name} />
									</div>
								</div>
								
								<div className='form-group'>
									<label className='col-xs-6 control-label' style={labelStyle}>Nickname</label>
									<div className='col-xs-6'>
										<input type="text" ref='nickname' className="form-control" placeholder={this.props.child.models[0].attributes.nickname} />
									</div>
								</div>

								<div className='form-group'>
									<label className='col-xs-6 control-label' style={labelStyle}>Gender</label>
									<div className='col-xs-6'>
										<select ref='gender' className="form-control" placeholder={this.props.child.models[0].attributes.gender} >
											<option value='' defaultValue>Choose gender</option>
											<option value='girl'>Girl</option>
											<option value='boy'>Boy</option>
										</select>
									</div>
								</div>

								<div className='form-group'>
									<label className='col-xs-6 control-label' style={labelStyle}>Date of Birth</label>
									<div className="col-xs-6">
										<input type="date" ref='dob' className="form-control" />
									</div>
								</div>

								<div className='form-group'>
									<label className='col-xs-6 control-label' style={labelStyle}>Time of Birth</label>
									<div className="col-xs-6">
										<input type="time" ref='tob' className="form-control" />						
									</div>
								</div>

								<div className='form-group'>
									<label className='col-xs-6 control-label' style={labelStyle}>Eyes Color</label>
									<div className="col-xs-6">
										<input type="text" ref='eyeColor' className="form-control" placeholder={this.props.child.models[0].attributes.eyeColor} />
									</div>
								</div>

								<div className="form-group" style={{marginTop: '20px'}}>
									<div className="col-xs-offset-3 col-xs-6">
										<button type="submit" className="btn btn-danger btn-lg btn-block form-btn">Apply changes</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<button style={{margin: '5px'}} className="btn btn-default" type='button' onClick={this.closeModal}>Cancel</button>		
				</Modal>
			</div>
		)
	},
	uploadAvatar: function() {
		var self = this;
		filepicker.pickAndStore(
			{
				mimtype: 'image/*'
			},
			{},
			function(InkBlobs) {
				self.setState({
					avatarUrl: InkBlobs[0].url
				});
			}
		);	
	},
	changeProfile: function(e) {
		e.preventDefault();
		var self = this;
		var child = this.props.child;
		console.log(child);
		// var child = new ChildModel({
		// 	userId: self.props.user.id, 
		// 	name: self.refs.childName.getDOMNode().value,
		// 	nickname: self.refs.nickname.getDOMNode().value,
		// 	gender: self.refs.gender.getDOMNode().value,
		// 	DOB: self.refs.dob.getDOMNode().value,
		// 	TOB: self.refs.tob.getDOMNode().value,
		// 	eyeColor: self.refs.eyeColor.getDOMNode().value,
		// 	avatarUrl: self.state.avatarUrl
		// });
		// child.save();
	
	}
});