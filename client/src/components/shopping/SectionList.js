'use strict';

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var ShoppingActionCreator = require('../../actions/shoppingActionCreator');
var ItemList = require('./ItemList');
var newItemName = "";

var SectionList = React.createClass({

  saveTextState: function (event) {
    newItemName = "";
    newItemName = event.target.value;
    console.log(event.target.value);

  },

  saveItem: function (index, event) {
    event.preventDefault();

    if(!this.itemIsValid(index)) {
      return;
    }

    var newStore = Object.assign({}, this.props.store);

    var newItem = {
      id: index,
      itemName: newItemName
    };

    newStore.sections[index].items.push(newItem);

    //this is something we could put in another 
    //function below.
    newItemName= "";
    //is using the undex ok with the id?

    document.getElementById(index).value=null;

    ShoppingActionCreator.updateStore(newStore);
  },

  itemIsValid: function (index) {
    var itemInputIsValid = true;
    var newItemErrors = {};

    if (newItemName <= 1) {
      itemInputIsValid = false;
      console.log("Item Be Longer than 1 char")
    };

    return itemInputIsValid;
  },


  render: function() {
    var listSections = function(section, index) {
      return (
        <div className="container" key={section.storeSection}>
          <div>
            <h2>{section.storeSection}
            <button className="btn btn-primary btn-sm pull-right"
              onClick={this.saveItem.bind(this, index)}
              value="+">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>

            <input
              id = {index}
              placeholder="Add Item"
              type="text"
              className="pull-right"
              value={this.props.value}
              onChange={this.saveTextState}
            />
          </h2>
        </div>


          <ItemList
            section={section}
            store={this.props.store}
          />

      </div>
      );
    };

    return (
      <div>

        <ul>{this.props.store.sections.map(listSections, this)}</ul>


      </div>
    );
  }
});

module.exports = SectionList;
