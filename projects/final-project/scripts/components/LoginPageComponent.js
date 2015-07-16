var React = require('react');
var validator = require('validator');
var ChildModel = require('../models/ChildModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: {}
		};
	},
	render: function () {
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive",
			fontSize: '45px'
		};
		var logo = {
			backgroundImage: 'url(../../images/logo.png)',
			backgroundSize: 'cover',
			width: '220px',
			height: '220px'
		};
		var loginPageStyle = {
			position: 'absolute',
			backgroundImage: 'url(../../images/halftone.png)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			width: '100%',
			height: '100%'
		};
		var line = {
			position: 'fixed',
			top: 0,
			backgroundImage: 'url(../../images/bg-header2.png)',
			height: '4px',
			width: '100%'
		};
		var error = {
			color: '#CA1D1B',
			marginLeft: '10px'
		};
		var genericError = null;
		if(this.state.data.generic) {
			genericError = (<div className='alert alert-danger' role='alert'>{this.state.data.generic}</div>);
		}
		return (
			<div style={loginPageStyle} className='container-fluid'>
				<div className='row col-12' style={line}></div>
				<div className='row' style={{height: '100px'}}></div>
				<div className='row col-xs-10 col-xs-offset-4 col-sm-6 col-md-5 col-lg-5 col-md-offset-6 col-lg-offset-5 col-sm-offset-5' style={logo}></div>
				<div className='row col-xs-10 col-xs-offset-1 col-sm-6 col-md-5 col-lg-4 col-md-offset-4 col-sm-offset-3 login-form'>
				
					{genericError}
					<form  className='form' ref='loginForm' onSubmit={this.login}>
						<div className='form-group '>
							<input type="text" ref='username' className="form-control" id="exampleInputEmail1" placeholder="Email" />
							<div className='error' style={error} ref='usernameError'>{this.state.data.username}</div>
						</div>
						<div className="form-group">
							<input type="password" ref='password' className="form-control" id="exampleInputPassword1" placeholder='Password' />
							<div className='error' style={error} ref='passwordError'>{this.state.data.password}</div>
						</div>
						<button type="submit" ref='loginBtn' className="btn btn-primary btn-lg btn-block form-btn">Log In</button>
						<div> or <a href="#">Sign Up</a> now. Its free!</div>
					</form>
				</div>
			</div>
		)
	},
	hasError: function(error) {
		for(var i in error) {
			return true;
		}
		return false;
	},
	login: function(e) {
		e.preventDefault();
		var app = this.props.app;
		var self = this;
		var error = {};

		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.password.getDOMNode().value;

		this.setState({data: error});
		
		this.props.user.login({
			username: this.refs.username.getDOMNode().value,
			password: this.refs.password.getDOMNode().value
		}, {
			success: function(userModel) {
				var child = new ChildModel({
					userId: userModel.username
				});
				child.fetch();

				app.navigate('diary/'+userModel.id, {trigger: true}); 
			},
			error: function(userModel, response) {
				self.setState({
					data: { 
						generic: response.responseJSON.error
					}
				});
			}
		})
	}
});