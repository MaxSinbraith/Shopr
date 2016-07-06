'use strict';

var React = require('react');
var storeApi = require('../../mockApi/storeApi');
var hashHistory = require('react-router').hashHistory;

var StoreList = React.createClass({

	render: function() {

		var listStores = function(store) {
			var sumItems = 0;
			for(var i = 0; i < store.sections.length; i++) {
				sumItems += store.sections[i].items.length;
			}

			return (
				<tr key = {store.id}>
					<td>{store.storeName}</td>
					<td>{sumItems}</td>
					<td>
						<a href="#" className="btn btn-primary btn-sm">
							<span className="glyphicon glyphicon-list-alt"></span>
						</a>
					</td>
					<td>
						<a href="#" className="btn btn-primary btn-sm">
							<span className="glyphicon glyphicon-trash"></span>
						</a>
					</td>
				</tr>
			)
		};
		
		return(
			<table className="table">
				<thead>
					<tr>
						<th>Store</th>
						<th>Items</th>
						<th>List</th>
						<th>Delete Store</th>
					</tr>
				</thead>
				<tbody>
					{this.props.stores.map(listStores, this)}
				</tbody>
			</table>
		);
	}
});

module.exports = StoreList;