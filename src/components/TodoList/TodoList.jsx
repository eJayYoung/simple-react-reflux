import './TodoList.less';
import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const me = this;
    return (
      <ul className="todoList">
        {
          me.props.listData.map((n,i) => {
            return <li key={i}>
              <input type="checkbox" checked={n.isDone} onChange={me.props.changeIsDone} />
              <span className={n.isDone ? `isDone` : ``}>{n.text}</span>
              <span className="del" onClick={me.props.delItem}>×</span>
            </li>
          })
        }
      </ul>
    );
  }
}

module.exports = TodoList;

