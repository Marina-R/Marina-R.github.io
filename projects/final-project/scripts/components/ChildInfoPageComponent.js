var React = require('react');
var UsersCollection = require('../collections/UsersCollection');
var ChildModel = require('../models/ChildModel');

module.exports = React.createClass({
	componentWillMount: function() {
		var users = new UsersCollection();
		users.fetch();
	},
	getInitialState: function() {
		return { 
			data: {},
			avatarUrl: 'http://www.first-care.org/assets/default/images/icons/baby-icon.png'
		}
	},
	render: function() {
		var line = {
			position: 'fixed',
			top: 0,
			backgroundImage: 'url(./images/bg-header2.png)',
			height: '4px',
			width: '100%'
		};
		var logOutBtn = {
			position: 'fixed',
			top: 0,
			right: '25px'
		};
		var slogan = {
			color: '#16a085',
			textAlign: 'center',
			fontSize: '40px',
			fontFamily: "'Lobster', cursive"
		};
		var form = {
			backgroundColor: '#e4e1d3',
			height: '470px',
			width: '450px',
			padding: '40px'
		};
		var error = {
			color: '#CA1D1B',
			marginLeft: '10px'
		};
		var formBlocks = {
			display: 'inline-block',
			float: 'right'
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
			<div>
				<nav className="navbar navbar-default" style={{opacity: '0.5'}}>
					<div className="container-fluid">
						<div className="navbar-header">
							<div className='row col-12' style={line}></div>
						</div>
					</div>
				</nav>
				<button type="button" style={logOutBtn} className="btn btn-default navbar-btn" onClick={this.logOut}>Log Out</button>
				<p style={slogan}>We`d love to hear about your child!</p>
				
				<div className='row col-xs-12' style={{marginTop:'50px'}}>	
					<div className='col-xs-3 col-xs-offset-2' >
						<div className="media">
							<div className="media">
								<img src={this.state.avatarUrl} style={avatarStyle} />	
							</div>
							<div className="media-body">
								<button type='button' onClick={this.uploadAvatar} className='btn btn-default'>Choose your avatar</button>
							</div>
						</div>
					</div>
					<div className='col-xs-6' style={form}>
						<form className='form-horizontal' ref='registerForm' onSubmit={this.gotoDiary}>
							<p> Fields marked with * are mandatory</p>
							<div className='form-group'>
								<label className='col-xs-6 control-label' style={labelStyle}>Child`s Name *</label>
								<div className='col-xs-6'>
									<input type="text" ref='childName' className="form-control" placeholder="Name" />
									<div className='error' style={error}>{this.state.data.name}</div>
								</div>
							</div>
							
							<div className='form-group'>
								<label className='col-xs-6 control-label' style={labelStyle}>Child`s Nickname</label>
								<div className='col-xs-6'>
									<input type="text" ref='nickname' className="form-control" placeholder="Nick" />
								</div>
							</div>

							<div className='form-group'>
								<label className='col-xs-6 control-label' style={labelStyle}>Gender *</label>
								<div className='col-xs-6'>
									<select ref='gender' className="form-control">
										<option value='' selected>Choose gender</option>
										<option value='girl'>Girl</option>
										<option value='boy'>Boy</option>
									</select>
									<div className='error' style={error}>{this.state.data.gender}</div>
								</div>
							</div>

							<div className='form-group'>
								<label className='col-xs-6 control-label' style={labelStyle}>Date of Birth *</label>
								<div className="col-xs-6">
									<input type="date" ref='dob' className="form-control" placeholder='DOB' />
									<div className='error' style={error}>{this.state.data.dob}</div>
								</div>
							</div>

							<div className='form-group'>
								<label className='col-xs-6 control-label' style={labelStyle}>Time of Birth</label>
								<div className="col-xs-6">
									<input type="time" ref='tob' className="form-control" placeholder='TOB' />						
								</div>
							</div>

							<div className='form-group'>
								<label className='col-xs-6 control-label' style={labelStyle}>Your Child Eye Color</label>
								<div className="col-xs-6">
									<input type="text" ref='eyeColor' className="form-control" placeholder='Eye color' />
								</div>
							</div>

							<div className="form-group" style={{marginTop: '20px'}}>
								<div className="col-xs-offset-3 col-xs-6">
									<button type="submit" className="btn btn-danger btn-lg btn-block form-btn">Save and continue</button>
								</div>
							</div>
						</form>
					</div>
					
				</div>
			</div>
		);
	},
	hasError: function(error) {
		for(var i in error) {
			return true;
		}
		return false;
	},
	gotoDiary: function(e) {
		e.preventDefault();
		var self = this;
		var app = this.props.app;
	
		var newChild = new ChildModel({
			userId: self.props.user.id, 
			name: self.refs.childName.getDOMNode().value,
			nickname: self.refs.nickname.getDOMNode().value,
			gender: self.refs.gender.getDOMNode().value,
			DOB: self.refs.dob.getDOMNode().value,
			TOB: self.refs.tob.getDOMNode().value,
			eyeColor: self.refs.eyeColor.getDOMNode().value,
			avatarUrl: self.state.avatarUrl
		});
		
		var error = {};

		if(!newChild.attributes.name) {
			error.name = 'Please enter your child\'s name';
		} else if(newChild.attributes.gender.length < 1) {
			error.gender = 'Please choose the gender';
		} else if(!newChild.attributes.DOB) {
			error.dob = 'Please enter your chaild\'s date of birth';
		}  

		this.setState({data: error});

		if(!this.hasError(error)){
			newChild.save(null, {
				success: function(userModel) {
					
					app.navigate('diary/'+self.props.user.id, {trigger: true});
				},
				error: function(userModel, response) {
					self.setState({data: error});
				}
			})
		}
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
				})
			}
		);
	},
	logOut: function() {
		this.props.user.logout();
		this.props.app.navigate('', {trigger: true});
	}
});