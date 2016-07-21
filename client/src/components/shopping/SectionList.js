'use strict';

var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require('react-router').Link;
var ShoppingActionCreator = require('../../actions/shoppingActionCreator');
var ItemList = require('./ItemList');
var newItemName = "";
var toastr = require("toastr");

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

    newItemName= "";

    document.getElementById(index).value=null;

    ShoppingActionCreator.updateStore(newStore);
    toastr.success('Item Created');
  },

  itemIsValid: function (index) {
    var itemInputIsValid = true;
    newItemName = newItemName.replace(/\s/g,'');
    if (newItemName.length <= 2) {
      itemInputIsValid = false;
      console.log("Item Be Longer than 1 char")
      toastr.error('Item Name to short!');
    };

    return itemInputIsValid;
  },

  deleteSection: function (index) {
    var deletedSection = "";
    
    var newStore = Object.assign({}, this.props.store);
    deletedSection = (newStore.sections[index].storeSection);
    newStore.sections.splice(index, 1);
    ShoppingActionCreator.updateStore(newStore);
    toastr.success(deletedSection +  " section Deleted")

  },


  render: function() {
    var listSections = function(section, index) {
      return (
        <div className="container" key={section.storeSection}>
          <div>
          <button className="btn btn-primary btn-xsm pull-left"
              style={{marginRight: "4%"}}
              onClick = {this.deleteSection.bind(this, index)}
              >

              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
            <h2>{section.storeSection}
            <button className="btn btn-primary btn-xsm pull-right"
              onClick={this.saveItem.bind(this, index)}
              value="+">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>

            <input
              id = {index}
              style={{width: "12em"}}
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
