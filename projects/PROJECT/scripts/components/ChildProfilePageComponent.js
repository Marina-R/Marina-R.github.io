var React = require('react');
var BasicComponent = require('./BasicComponent');
var NavigationComponent = require('./NavigationComponent');
var UserModel = require('../models/UserModel');
var ChildModel = require('../models/ChildModel');
var ChildInfoPageComponent = require('./ChildInfoPageComponent');

var ProfileModalComponent = require('./ProfileModalComponent');
var Modal = require('react-modal');
Modal.setAppElement(container);
Modal.injectCSS();

module.exports = React.createClass({	
	openModal: function() {
		this.setState({showModal: true});
	},
	getInitialState: function() {
		var self = this;
		var child = self.props.children1.forEach(function(child) {
			return child;
		});
		
		return {
			child: child
		};
	},	
	render: function() {
		console.log(this.props)
		var form = {
			backgroundColor: '#e4e1d3',
			width: '60%',
			padding: '50px',
			overflow: 'hidden',
			float: 'right',
			marginTop: '60px'
		};
		var avatarStyle = {
			width: '30%',
			backgroundImage: 'url('+this.state.child[0].attributes.avatarUrl+')',
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
				<BasicComponent user={this.props.user} app={this.props.app} >
					<NavigationComponent app={this.props.app} user={this.props.user} child={this.state.child} />
					<div className="media">
						<div className='col-xs-5' style={{display:'inline-block'}} style={avatarStyle} >	
						</div>
						<div style={form} className='col-xs-5'>
							<div className='form-group col-xs-12'>
								<label className='col-xs-6 control-label' style={labelStyle}>Name</label>
								<div>{this.state.child[0].attributes.name}</div>
							</div>
							
							<div className='form-group col-xs-12'>
								<label className='col-xs-6 control-label' style={labelStyle}>Nickname</label>
								<div>{this.state.child[0].attributes.nickname}</div>
							</div>

							<div className='form-group col-xs-12'>
								<label className='col-xs-6 control-label' style={labelStyle}>Gender</label>
								<div>{this.state.child[0].attributes.gender}</div>
							</div>

							<div className='form-group col-xs-12'>
								<label className='col-xs-6 control-label' style={labelStyle}>Date of Birth</label>
								<div>{this.state.child[0].attributes.DOB}</div>
							</div>

							<div className='form-group col-xs-12'>
								<label className='col-xs-6 control-label' style={labelStyle}>Time of Birth</label>
								<div>{this.state.child[0].attributes.TOB}</div>
							</div>

							<div className='form-group col-xs-12'>
								<label className='col-xs-6 control-label' style={labelStyle}>Eye Color</label>
								<div>{this.state.child[0].attributes.eyeColor}</div>
							</div>

							<div className="form-group col-xs-12" style={{marginTop: '20px'}}>
								<div className="col-xs-offset-3 col-xs-6">
									<ProfileModalComponent user={this.props.user} userId={this.props.userId} child={this.props.children1} />
								</div>
							</div>
						</div>
					</div>	
				</BasicComponent>
			</div>
		);
	}
});