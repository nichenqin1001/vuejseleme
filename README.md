# vuejseleme

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## vuex的使用

``` bash
const state = {
  # 控制位置
  rect: {
    top: 0,
    left: 0
  },
  clsMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
  selectedFood: {},

  # 控制切换的boolean
  textOnly: true,
  showFoodsDetail: false,
  collected: false,
  rateType: 2,

  # 控制滚动的scroller
  detailScroll: '',
  ratingScroll: '',
  rateTypeFatherScroll: '',
  sellerScroll: '',
  imageScroll: ''
}
```
使用vuex作为组件之间传递信息的方式，其中rateTypeFatherScroll变量可以改变不同组件之间复用组件时事件所操作的scroll
