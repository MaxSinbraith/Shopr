'use strict';

var React = require('react');
var TextInput = require('../common/TextInput');

var StoreForm = React.createClass({

	changeValue: function() {
		document.getElementById("save").value = "save";
	},

	render: function() {
		return (
			<form>
				<TextInput
					name="storeName"
					placeholder="Store Name"
					value={this.props.store.storeName}
					saveStoreState={this.props.saveStoreState}
					error={this.props.errors.storeName}
				/>
				<button className="btn btn-primary btn-sm" type="submit"
					onClick={this.props.saveStore} value="save">
					Save Store &nbsp;
					<span className="glyphicon glyphicon-save" aria-hidden="true"></span>
				</button>

				<button className="btn btn-primary btn-sm" type="submit"
					onClick={this.props.saveStore}>
					Create List &nbsp;
					<span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
    		</button>
			</form>
		);
	}
});

module.exports = StoreForm;