import observer from './observer'
import {query, getOuterHTML} from './util'
import {compile} from './compile'

class Vue {
  constructor(options) {
    this.$options = options
    observer(options.data)
    const el = options.el && query(options.el)
    let template = getOuterHTML(el)
    this.$options.render = compile(template)


  }
  _render(){
    const {render} = this.$options
    const vnode = render.call(this)
    return vnode
  }
}

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
