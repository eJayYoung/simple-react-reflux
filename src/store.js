import Reflux from 'Reflux';
import Actions from './actions';

const Store = Reflux.createStore({
  listenables: [Actions],
  data: {
    itemList: []
  },
  onAddTodo(item) {
    const me = this;
    const {data} = me;
    data.itemList.push(item);
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