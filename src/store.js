import Reflux from 'Reflux';
import Actions from './actions';
import $ from 'jquery';
import localdb from 'localdb';
const DB = new localdb('todoDB', 'Array', true);
const Store = Reflux.createStore({
  listenables: [Actions],
  data: {
    itemList: DB.get() || []
  },
  onAddTodo(item) {
    const me = this;
    me.data.itemList.push(item);
    DB.add(item);
    me.updataComponent();
  },
  onChangeIsDone(e) {
    const me = this;
    let index = $(e.target).parent().index();
    me.data.itemList[index]["isDone"] = !me.data.itemList[index]["isDone"];
    me.updataComponent();
    DB.override(me.data.itemList,true);
  },
  onDelItem(e) {
    const me = this;
    let index = $(e.target).parent().index();
    me.data.itemList.splice(index,1);
    me.updataComponent();
    DB.override(me.data.itemList,true);
  },
  updataComponent() {
    this.trigger(this.data);
  },
  getInitialState() {
    return this.data
  }
});

module.exports = Store;