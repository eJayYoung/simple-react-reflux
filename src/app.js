require('./app.less');
import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'Reflux';
import reactMixin from 'react-mixin';
import $ from 'jquery';
const Actions = require("./actions");
const Store = require("./store");

const TodoHeader = require("./components/TodoHeader/index");
const TodoList = require("./components/TodoList/index");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    ["addTodo"].map(item => {
      this[item] = this[item].bind(this);
    })
  }
  addTodo(item) {
    const me = this;
    const {state} = me;
    Actions.addTodo(item);
  }
  render() {
    const me = this;
    const {state} = me;
    let todoListProps = {
      listData: state.data.itemList,
      changeIsDone: Actions.changeIsDone,
      delItem: Actions.delItem
    }
    return (
      <div>
        <h1>React Todos</h1>
        <div className="content">
          <TodoHeader addTodo={me.addTodo} />
          <TodoList {...todoListProps} />
        </div>
      </div>
    );
  }
}
reactMixin.onClass(App, Reflux.connect(Store,"data"));
ReactDOM.render(<App />, document.getElementById("app"));

module.exports = App;
