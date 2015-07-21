var React = require('react');
var DiaryPostModel = require('../models/DiaryPostModel');
var Backbone = require('backparse');

module.exports = React.createClass({
	getInitialState: function() {
		return { 
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
				{this.props.category}
				<textarea id={this.state.id} name="area" ref='body'></textarea>
				<button style={{margin: '5px'}} type='button' className="btn btn-success" onClick={this.savePost}>Publish</button>
			</form>
		);
	},
	savePost: function(e) {
		e.preventDefault();

		var self = this;
		var diaryPost = new DiaryPostModel({
			userId: self.props.user.id,
			title: self.refs.title.getDOMNode().value,
			body: tinyMCE.activeEditor.getContent()
		});	

		diaryPost.save();
		this.props.posts.add(diaryPost); 
		this.props.close();
	}
});