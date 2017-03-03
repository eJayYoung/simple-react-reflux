import "./TodoHeader.less";
import React from "react";
class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    ["handleKeyUp"].map(item => {
      this[item] = this[item].bind(this);
    })
  }
  handleKeyUp(event) {
    const me = this;
    if(event.keyCode === 13) {
      let value = event.target.value;

      if(!value) return false;
      let newTodoItem = {
        text: value,
        isDone: false
      };
      me.props.addTodo(newTodoItem);
      event.target.value = "";
    }
  }
  render() {
    const me = this;
    return (
      <div className="panel-header">
        <input type="text" onKeyUp={me.handleKeyUp} placeholder="What's your task?"/>
      </div>
    );
  }
}

module.exports = TodoHeader;