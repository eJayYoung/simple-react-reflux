import './TodoSummary.less';
import React from 'react';

class TodoSummary extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const me = this;
    const listData = me.props.listData;
    const TotalCount = listData.length;
    return (
      <div className="summaryBox">
        <input type="checkbox" checked={me.props.allChecked} onChange={me.props.checkAll}/>
        <span>{`${me.props.doneCount}  已完成 / ${TotalCount}  总数`}</span>
        <span className="clearAll" onClick={me.props.clearAllDone}>清空已完成</span>
      </div>
    );
  }
}

module.exports = TodoSummary;
