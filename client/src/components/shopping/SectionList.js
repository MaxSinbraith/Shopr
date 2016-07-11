'use strict';

var React = require('react');
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;
var ShoppingActionCreator = require('../../actions/shoppingActionCreator');

var SectionList = React.createClass({

  changeSelection: function (item, event) {
    event.preventDefault();
    ShoppingActionCreator.changeSelected(item);
  },

  render: function() {
    var listItems = function(item) {
      return (
        <div key={item.id}>
          <li>
            {item.item}
            <input
              type="checkbox"
              checked={item.selected}
              className="pull-right"
              onChange={this.changeSelection.bind(this, item.id)}
            />
          </li>
        </div>
      );
    };

    var listSections = function(section) {
      return (
        <div className="container" key={section.id}>
          <h3>
            {section.name}
            <button className="btn btn-primary btn-sm pull-right">
  					  Add Item &nbsp;
  					  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
  				  </button>
          </h3>
          <ul>{section.items.map(listItems, this)}</ul>
        </div>
      );
    };

    return (
      <div>
        {this.props.store.sections.map(listSections, this)}
      </div>
    );
  }
});

module.exports = SectionList;