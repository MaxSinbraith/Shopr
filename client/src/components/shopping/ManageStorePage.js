'use strict';

var React = require('react');
var StoreForm = require('./StoreForm');
var browserHistory = require('react-router').browserHistory;
var toastr = require('toastr');
var ShoppingActionCreator = require('../../actions/shoppingActionCreator');

var ManageStorePage = React.createClass({
	getInitialState: function() {
		return {
			errors: {},
			store: {
				id: '',
				storeName: '',
				sections: []
			}
		}
	},

	saveStoreState: function (event) {
		var field = event.target.name;
		var value = event.target.value;
		var newStore = Object.assign({}, this.state.store);
		newStore[field] = value;

		this.setState({
			store: newStore
		});
	},

	saveStore: function (event) {
		event.preventDefault();

		if(!this.storeFormIsValid()) {
			return;
		}

		var promise = ShoppingActionCreator.createStore(this.state.store);
 
		toastr.success('Store saved!');

		if(event.target.value === "save") {
			browserHistory.push('/');
		} else if (event.target.value === "create and view list") {
      promise.then(function (store) {
        browserHistory.push('/shopping-list/' + store._id);
      })
    } else {
			browserHistory.push('/');
    }
	},

	storeFormIsValid: function () {
		var formIsValid = true;
		var newErrors = {};

		if(this.state.store.storeName.length === 0) {
			newErrors.storeName = 'Store name field cannot be empty!';
			formIsValid = false;
		}

		this.setState({
			errors: newErrors
		});

		return formIsValid;
	},

	render: function() {
		return (
			<div>
				<h2>Manage Store</h2>
				<StoreForm
					store={this.state.store}
					saveStoreState={this.saveStoreState}
					saveStore={this.saveStore}
					errors={this.state.errors}
				/>
			</div>
		);
	}
});

module.exports = ManageStorePage;
