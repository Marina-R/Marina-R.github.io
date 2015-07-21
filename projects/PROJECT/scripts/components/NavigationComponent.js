var React = require('react');
var $ = require('jquery');
window.jQuery = $;
var Bootstrap = require("bootstrap");

module.exports = React.createClass({
	getInitialState: function() {
		return { child: this.props.child }
	},
	render: function() {
		var logoutBtn = {
			position: 'fixed',
			top: 0,
			right: '25px'
		};
		var navbar = {
			opacity: '0.7',
			marginBottom: '10px'
		};
		var dropdown = {
			float: 'right'
		};
		var avatarStyle = {
			height: '50px',
			width: '50px',
			backgroundImage: 'url('+this.state.child[0].attributes.avatarUrl+')',
			backgroundSize: '100%',
			backgroundRepeat: 'no-repeat',
			float: 'right',
			margin: '5px'
		};
		console.log(this.state.child);
		if(this.props.user.id) {
			return(
				<nav className="navbar navbar-default" style={navbar}>	
					<div className="media media-left" style={avatarStyle}></div>	
					<div className="container-fluid collapse navbar-collapse">
						<a href="#menu-toggle" onClick={this.hideShow} className="btn btn-default" id="menu-toggle"><i className="fa fa-bars"></i></a>
						<ul className="nav navbar-right navbar-nav nav-pills">
						 	<li className="dropdown">
								<a className="dropdown-toggle" data-toggle="dropdown"  role="button" aria-haspopup="true" aria-expanded="false" onClick={this.dropdown}>
							 	{this.props.user.attributes.name}<span className="caret"></span>
								</a>
								<ul className="dropdown-menu" ref='dropdownMenu'>
						            <li><a href="#profile">Child`s Profile</a></li>
						            <li role="separator" className="divider"></li>
						            <li><a onClick={this.logOut}>Log Out</a></li>
								</ul>
						  	</li>						
						</ul>
					</div>
				</nav>
			);
		} else {
			return(
				<nav className="navbar navbar-default" style={navbar}>		
					<div className="container-fluid collapse navbar-collapse">
					 	<a href="#menu-toggle" onClick={this.hideShow} className="btn btn-default" id="menu-toggle"><i className="fa fa-bars"></i></a>
						<ul className="nav navbar-right navbar-nav nav-pills" >				
						</ul>
					</div>		
				</nav>
			);
		}
		
	},
	hideShow: function(e) {
		e.preventDefault();
		$('#wrapper').toggleClass('toggled');
	},
	logOut: function() {
		this.props.user.logout();
		this.props.app.navigate('', {trigger: true});
	}
});