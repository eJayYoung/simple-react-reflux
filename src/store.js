import Reflux from 'Reflux';
import Actions from './actions';

const Store = Reflux.createStore({
  listenables: [Actions],
  data: {
    itemList: [
      {
        workNo: "0001"
      }
    ],
    addAble: false
  },
  onAddItem() {
    const me = this;
    const {data} = me;
    data.addAble = true;
    me.updataComponent();
  },
  onSaveItem(item) {
    const me = this;
    const {data} = me;
    data.itemList.push(item);
    data.addAble = false;
    me.updataComponent();
  },
  onSearchItem(key) {
    const me = this;
    const {data} = me;
    data.itemList.map((n,i) => {
      
    })
  },
  updataComponent() {
    this.trigger(this.data);
  },
  getInitialState() {
    return this.data
  }
});

module.exports = Store;