var React = require('react');
var HealthPostModel = require('../models/HealthPostModel');
var Backbone = require('backparse');

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			error: '',
			id: 'i'+(Date.now())
		 };
	},
	componentWillUnmount: function() {
		tinymce.EditorManager.execCommand("mceRemoveEditor", true, this.state.id);
	},
	componentDidMount: function() {
		this.setUp();
	},
	setUp: function() {
		tinymce.init({
			selector: "textarea#"+this.state.id,
			theme: "modern",
			width: 600,
			height: 300,
			plugins: [
				 "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
				 "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
				 "save table contextmenu directionality emoticons template paste textcolor"
		   ],
		   content_css: "css/content.css",
		   toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons", 
		   style_formats: [
				{title: 'Bold text', inline: 'b'},
				{title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
				{title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
				{title: 'Example 1', inline: 'span', classes: 'example1'},
				{title: 'Example 2', inline: 'span', classes: 'example2'},
				{title: 'Table styles'},
				{title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
			]
		}); 
	},
	render: function() {
		return (
			<form method="post" onSubmit={this.savePost}>
				<input style={{marginBottom: '10px'}} className="form-control" type="text" ref='title' placeholder='Title' />
				<div ref='error'>{this.state.error}</div>
				<select className="form-control" ref='category' style={{marginBottom:'10px'}}>
					<option value='' defaultValue>Choose the category...</option>
					<option value='Dental'>Dental</option>
					<option value='Doctor visit'>Doctor visit</option>
					<option value='Illness'>Illness</option>
					<option value='Immunization'>Immunization</option>
					<option value='Medicine'>Medicine</option>
					<option value='Other'>Other</option>
				</select>
				<textarea id={this.state.id} name="area" ref='body'></textarea>
				<button style={{margin: '5px'}} type='button' className="btn btn-success" onClick={this.savePost}>Publish</button>
			</form>
		);
	},
	savePost: function(e) {
		e.preventDefault();
		var self = this;
		if(this.refs.category.getDOMNode().value.length > 1){
			var healthPost = new HealthPostModel({
				userId: self.props.user.id,
				title: self.refs.title.getDOMNode().value,
				body: tinyMCE.activeEditor.getContent(),
				category: this.refs.category.getDOMNode().value
			});	

			healthPost.save();
			this.props.posts.add(healthPost); 
			this.props.close();
		} else {
			self.setState({error: 'Please choose the category'});
		}
	}
});