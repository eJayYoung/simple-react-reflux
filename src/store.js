import Reflux from 'Reflux';
import Actions from './actions';
import $ from 'jquery';

const Store = Reflux.createStore({
  listenables: [Actions],
  data: {
    itemList: [{
      text: "吃饭",
      isDone: false
    }]
  },
  onAddTodo(item) {
    const me = this;
    const {data} = me;
    data.itemList.push(item);
    me.updataComponent();
  },
  onChangeIsDone(e) {
    const me = this;
    const {data} = me;
    let index = $(e.target).parent().index();
    me.data.itemList[index]["isDone"] = !me.data.itemList[index]["isDone"];
    me.updataComponent();
  },
  updataComponent() {
    this.trigger(this.data);
  },
  getInitialState() {
    return this.data
  }
});

module.exports = Store;