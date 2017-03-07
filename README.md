# simple-react-reflux TodoList
学习Reflux已有三月有余，最近不忙便做个了小demo来校验下自己对于react,reflux的理解。

# Usage
    git clone https://github.com/eJayYoung/simple-react-reflux.git
    npm install
    npm run start

# Demo Show
 
 ![img](https://github.com/eJayYoung/simple-react-reflux/blob/master/react-todos-demoShow.gif)

## Reflux是什么？

[官方文档在此](https://github.com/reflux/refluxjs)

首先我们已经认识了React是一个通过数据来驱动页面渲染的View层，那么数据之间的通信就会随着应用的扩展变得越来越复杂，常见的数据通信模式有： 
- 父组件到子组件
- 子组件到父组件
- 祖父组件到孙组件
- 兄弟组件之间

所以facebook提出了Flux架构的概念，随之而产生了许多类似实现的解决方法，最常见的就是 Redux和 Reflux 了。

## Reflux长啥样？

```
+---------+       +--------+       +-----------------+
¦ Actions ¦------>¦ Stores ¦------>¦ View Components ¦
+---------+       +--------+       +-----------------+
     ^                                      ¦
     +--------------------------------------+

```

先盗一张官网的图

Reflux分为三个部分：

- Action

    通过用户来触发事件（Publisher）

- Store
    - 监听Action（Subscriber）
    - 触发View更新页面 (Publisher)
- View
    - 监听Store的变化，及时更新页面(Subscriber)

这样我们就很清楚的知道我们要怎么做了

## 简单实现Reflux的三个步骤

首先目录结构为
```
--components
 |- doSomething
  |- doSomething.jsx
  |- actions.js
  |- store.js
```
- 创建Action

    Action的定义方法有两个：

    - Reflux.createAction()
        
        作用：创建单个action

        函数接收的参数为一个对象

            {
                actionName: 'myActionName', //action名字
                children: ['childAction'], 
                //用于异步操作时创建子action
                asyncResult: true,
                //为true时会自动创建 `completed` 和 `failed` 两个子action，可以认为是设置子action的快捷方式
                sync: false,
                //为true时指定action的默认触发方式为同步
                preEmit: function() {...}
                shouldEmit: function() {...}            
            }
    - Reflux.createActions()

        作用：顾名思义，创建多个action

        函数接收的参数为一个数组，里面的数组项为上面的对象

    当然最简单的方法只需要传入actionName即可
    ```
    // actions.js

    module.exports = Reflux.createActions([
        'doSomething1',
        'doSomething2',
        ...
    ]);
    ```

- 创建Store

    Reflux.createStore()

```
// store.js
import Actions from action;
module.exports = Reflux.createStore({
    init() {
        //监听action 方法一
        this.listenTo(Actions.doSomething1);
        this.listenTo(Actions.doSomething2);
        //监听action 方法二
        this.listenToMany(Actions);
    }
    //监听action 方法三 (推荐)
    listenables : [Actions],
    data: {

    },
    //更新页面方法 给action前面加上 `on` 然后Action首字母大写
    onDoSomething1() {
        ...
    }
    onDoSomething2() {
        ...
    }
    getInitialState() {
        return this.data
    }
    updataComponent() {
        //可以通过 trigger来更新state
        this.trigger(this.data);
    }
})

``` 

- View如何触发action,绑定Store
 
```
import reactMixin from 'react-mixin';
import Actions from 'actions';
import Store from 'store';

class DoSomething extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        };
    }

    handleClick() {
        Action.doSomething1();
    }

    render() {
        const me = this;
        return (
            <div>
                <div onClick={me.handleClick}></div>
            </div>
        );
    }
}
//通过Reflux.connect()来连接Store和View中的state 
reactMixin.onClass(DoSomething, Reflux.connet( Store, list])) 
```

这样我们就完成了最基本的 Reflux的实现。

# PS

欢迎各路好汉火钳留star！

