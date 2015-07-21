var React = require('react');
var validator = require('validator');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			data: {}		
		}
	},
	render: function() {
		var welcomeStyle = {
			position: 'absolute',
			backgroundImage: 'url(../../images/pic1.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			width: '100%',
			height: '100%',
			opacity: '0.7',
			padding : 0
		};
		var titleStyle = {
			textAlign: 'center',
			fontFamily: "'Lobster', cursive",
			fontSize: '45px'
		};
		var logo ={
			backgroundImage: 'url(../../images/logo.png)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			width: '200px',
			height: '200px'
		};
		var loginBtn = {
			position: 'fixed',
			top: 0,
			right: '25px'
		};
		var error = {
			color: '#CA1D1B',
			marginLeft: '10px'
		};
		var line = {
			position: 'fixed',
			top: 0,
			backgroundImage: 'url(../../images/bg-header2.png)',
			height: '4px',
			width: '100%'
		};

		var genericError = null;
		if(this.state.data.generic) {
			genericError = (<div className='alert alert-danger' role='alert'>{this.state.data.generic}</div>);
		}
		return(
			<div style={welcomeStyle} className='container-fluid'>
				<nav className="navbar navbar-default" style={{opacity: '0.5'}}>
					<div className="container-fluid">
						<div className="navbar-header">
							<div className='row col-12' style={line}></div>
						</div>
					</div>
				</nav>
				<button type="button" style={loginBtn} className="btn btn-default navbar-btn" onClick={this.gotoLogin}>Log in</button>
				<div className='row col-xs-10 col-xs-offset-5 col-sm-6 col-md-3 col-lg-3 col-md-offset-9 col-sm-offset-5' style={logo}></div>
				<div className='row col-xs-10 col-xs-offset-1 col-sm-6 col-md-4 col-lg-3 col-md-offset-8 col-sm-offset-3 login-form'>
					<h1 style={titleStyle}>Register</h1>
					{genericError}
					<form className='form' ref='registerForm' onSubmit={this.register}>
						<div className='form-group '>
							<input type="text" ref='name' className="form-control" id="exampleInputEmail1" placeholder="Name" />
							<div className='error' style={error} ref='nameError'>{this.state.data.name}</div>
						</div>
						<div className="form-group " >
							<div className="form-group ">
								<input type="email" ref='username' className="form-control" id="exampleInputPassword1" placeholder='Email' />
								<div className='error' style={error} ref='usernameError'>{this.state.data.username}</div>
							</div>
							<input type="password" ref='password' className="form-control" id="exampleInputPassword1" placeholder='Password' />
							<div className='error' style={error} ref='passwordError'>{this.state.data.password}</div>
						</div>
						<div>
							<button type="submit" className="btn btn-primary btn-lg btn-block form-btn">Sign Up</button>
						</div>
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
	register: function(e) {
		e.preventDefault();
		var self = this;
		var app = this.props.app;
		
		var newUser = {
			name: this.refs.name.getDOMNode().value,
			email: this.refs.username.getDOMNode().value,
			password: this.refs.password.getDOMNode().value,
			username: this.refs.username.getDOMNode().value
		};

		var error = {};

		if(!newUser.name) {
			error.name = 'Please enter your name';
		} else if(!newUser.username) {
			error.username = 'Please enter your email';
		} else if(!validator.isEmail(newUser.username)) {
			error.username = 'Email should be valid';
		} else if(!newUser.password) {
			error.password = 'Please enter your password';
		} else if(!validator.isLength(newUser.password, 6)) {
			error.password = 'Password should be at least 6 characters length';
		} 

		this.setState({data: error});

		if(!this.hasError(error)) { 
			this.props.user.save(newUser, {
				success: function(userModel) {
					app.navigate('childInfo', {trigger: true});
				},
				error: function(userModel, response) {
					self.setState({
						data: { 
							generic: response.responseJSON.error
						}
					});
				}
			});
		}
	},
	gotoLogin: function() {
		var app = this.props.app;
		app.navigate('login', {trigger: true});
	}
})