'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/actionTypes');
var API = require('../helpers/api');

var ShoppingActionCreator = {
	createStore: function (store) {
		var newStorePromise = API.createStore(store);

    newStorePromise.
			then( function(newStore) {
				Dispatcher.dispatch({
				actionType: ActionTypes.CREATE_STORE,
				store: newStore
			});
		})

		.fail(function(xhr, status, err) {
			console.log("failed to create a store");
		})

    return newStorePromise;
	},

	deleteStore: function (store) {
		var deleteStorePromise = API.deleteStore(store);

		deleteStorePromise
			.then(function () {
				Dispatcher.dispatch({
					actionType: ActionTypes.DELETE_STORE,
					storeId: store._id
				})
			})
			.fail(function (xhr, status, err) {
				console.log("Delete Store Failed!")
			})
	},

	updateStore: function(store) {
		var updateStorePromise = API.updateStore(store);
		updateStorePromise
			.then(function (updatedStore) {
				Dispatcher.dispatch({
					actionType: ActionTypes.UPDATE_STORE,
					store: updatedStore
				});
			})
			.fail(function (xhr, status, err) {
				console.log('Update Store Failed!')
			})
	}

};

module.exports = ShoppingActionCreator;
