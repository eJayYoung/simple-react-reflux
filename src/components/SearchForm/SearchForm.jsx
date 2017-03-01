import "./SearchForm.less";
import React from "react";
class SearchForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="search-form">
        <label>姓名：
          <input type="text" className="username" />
        </label>
        <button className="btn">查询</button>
        <button className="btn">新增</button>
      </div>
    );
  }
}

module.exports = SearchForm;