require('./app.less');
import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'Reflux';
import reactMixin from 'react-mixin';
import $ from 'jquery';
const Actions = require("./actions");
const Store = require("./store");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    ['renderSearchForm','renderItemList','saveItem','searchItem'].map(item => {
      this[item] = this[item].bind(this);
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
      return true;
  }
  render() {
    const me = this;
    return (
      <div className="content">
       {me.renderSearchForm()}
       {me.renderItemList()}
      </div>
    );
  }
  renderSearchForm() {
    const me = this;
    const {state} = me;
    return (
      <div className="search-form">
        <label>username</label>
        <input type="text" className="username" />
        <button className="btn" onClick={me.searchItem}>查询</button>
        <button className="btn" onClick={Actions.addItem}>新增</button>
        <button className="btn" onClick={me.saveItem}>保存</button>
      </div>
    );
  }
  renderItemList() {
    const me = this;
    const {state} = me;
    let tableList = state.data.itemList;
    return (
      <div className="item-list">
      
      </div>
    );
  }
  saveItem() {
    const me = this;
    const {state} = me;
    let addData = {
      workNo: $(me.addData).find(".workNo").val(),
      username: $(me.addData).find(".username").val(),
      age: $(me.addData).find(".age").val(),
    };
    Actions.saveItem(addData);
  }
  searchItem(e) {
    const me = this;
    const {state} = me;
    let key = $(e.target).prev().val();
    Actions.searchItem(key);
  }
}
reactMixin.onClass(App, Reflux.connect(Store,"data"));
ReactDOM.render(<App />, document.getElementById("app"));

module.exports = App;
