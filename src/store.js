import Reflux from 'Reflux';
import Actions from './actions';
import $ from 'jquery';
import localdb from 'localdb';
const DB = new localdb('todoDB', 'Array', true);
const Store = Reflux.createStore({
  listenables: [Actions],
  data: {
    itemList: DB.get() || [],
    doneCount: null,
    allChecked: false
  },
  onAddTodo(item) {
    const me = this;
    me.data.itemList.push(item);
    DB.add(item);
    me.updataComponent();
  },
  onChangeIsDone(e) {
    const me = this;
    let target = $(e.target).parent();
    let index = target.index();
    me.data.itemList[index]["isDone"] = !me.data.itemList[index]["isDone"];
    DB.override(me.data.itemList,true);
    me.onGetDoneCount();
    if(me.data.itemList.length == me.data.doneCount && me.data.itemList[index]["isDone"] === true) {
      me.data.allChecked = true;
    }else{
      me.data.allChecked = false;
    }
  },
  onDelItem(e) {
    const me = this;
    let index = $(e.target).parent().index();
    me.data.itemList.splice(index,1);
    me.updataComponent();
    DB.override(me.data.itemList,true);
    me.onGetDoneCount();
  },
  onGetDoneCount() {
    const me = this;
    me.data.doneCount = me.data.itemList && me.data.itemList.filter((item) => item.isDone).length || 0;
    // const query = {isDone: true};
    // const opts = {limit: 0, sortBy: 'index', sort: 1, skip: 0};
    // me.data.doneCount = DB.find(query,opts).length;
    me.updataComponent();
  },
  onCheckAll() {
    const me = this;
    me.data.allChecked = !me.data.allChecked;
    me.data.itemList.map(n => {
      n.isDone = !me.data.allChecked;
    })
    me.updataComponent();
    DB.override(me.data.itemList,true);
    me.onGetDoneCount();
  },
  onClearAllDone() {
    const me = this;
    me.data.itemList = me.data.itemList.filter((item) => !item.isDone);
    me.updataComponent();
    DB.override(me.data.itemList,true);
    me.onGetDoneCount();
  },
  updataComponent() {
    this.trigger(this.data);
  },
  getInitialState() {
    return this.data
  }
});

module.exports = Store;