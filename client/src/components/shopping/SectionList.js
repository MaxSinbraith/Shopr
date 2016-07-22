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
      itemName: newItemName,
      description: ""
    };

    newStore.sections[index].items.push(newItem);
    newItemName= "";

    document.getElementById(this.props.store.sections[index]._id).value=null;

    ShoppingActionCreator.updateStore(newStore);
    toastr.success('Item Created');

    event.target.value= "";
  },

  saveItemWithBlur: function (index, event) {
    event.preventDefault();
    if (newItemName.length < 1){
      return
    }
    this.saveItem(index, event);
  },

  itemIsValid: function (index) {
    var itemInputIsValid = true;
    newItemName = newItemName.trim();
    if (newItemName.length <= 1) {
      itemInputIsValid = false;
      toastr.error('Item Name to short!');
    } else if (newItemName.length > 15) {
      itemInputIsValid = false;
      toastr.error('Item Name is to long!');
    }

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
        <div  style={{padding: "1% 1% 1% 1%"}}
              key={section.storeSection}>
          

            <h3 style={{color: "#ffffff", marginTop: "0.6%"}}>
            {section.storeSection}
            <button className="btn btn-primary btn-xsm"
              style={{marginRight: "4%", marginLeft: "1%"}}
              onClick={this.deleteSection.bind(this, index)}>

              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>

          <form onSubmit={this.saveItemWithBlur.bind(this, index)}
                style={{marginBottom: "4.5%", marginTop: "-4%"}}>
           <div className="btn btn-primary btn-xsm pull-right"
              //onClick={this.saveItem.bind(this, index)}
              value="+">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </div>
            <input
              id = {section._id}
              style={{width: "20%", "color": "#333"}}
              placeholder="Add Item"
              type="text"
              className="pull-right"
              value={this.props.value}
              onBlur={this.saveItemWithBlur.bind(this, index)}
              onChange={this.saveTextState}
            />

           
            </form>
          </h3>
        
        
          <ItemList
            section={section}
            store={this.props.store}
            items={this.props.store.sections[index].items}
            sectionIndex={index}
          />

      </div>
      );
    };

    return (
        <div //className="container" 
        style={{"backgroundColor": "#039BE5"}}>
        {this.props.store.sections.map(listSections, this)}</div>
    );
  }
});

module.exports = SectionList;
