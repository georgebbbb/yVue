import observer from './observer'
import {query, getOuterHTML} from './util'

class Vue {
  constructor(options) {
    this.$options = options

    observer(options.data)
    // initRender(this)
  }
  $mount(el){
    el = el && query(el)
    //这里真实情况要判断options.render，和options.template，这里为了简化我们不判断了，直接拿el来生成template
    let template = getOuterHTML(el)

    //中间要让template 先变成js对象，在边城函数 __h__
    this.$options.render = compile(template)

    this._mount(el)

  }
  _mount(el){

      new Watcher()
  }
  _render(){
    const {render} = this.$options
    const vnode = render.call(this)
    return vnode
  }


}

// function initRender(vm){
//   if (vm.$options.el) {
//     vm.$mount(vm.$options.el)
//   }
// }


var demo = new Vue({
  el: '#demo',
  data: {
    qqqq: 123,
    pppp: 321,
    isShow: false
  },
  methods: {
    add: function(){
      this.qqqq = this.qqqq + 11
    },
    mut: function(){
      this.pppp = this.pppp + 222
    }
  }
})
