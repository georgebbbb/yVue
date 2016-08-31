function VNode(tag, data, children, text) {
  return {
    tag: tag,
    data: data,
    children: children,
    text: text
  }
}

class Vue {
  constructor(options) {
    this.$options = options
    this._data = options.data
    Object.keys(options.data).forEach(key => this._proxy(key))
    observer(options.data)
    const vnode = watch(this, this._render.bind(this), this._update)
  }
  _proxy(key) {
    const self = this
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return self._data[key]
      },
      set: function proxySetter (val) {
        self._data.text = val
      }
    })
  }
  _update(){
    console.log("我需要更新");
  }
  _render(){
    const vnode = this.$options.render.call(this)

    console.log(JSON.stringify(vnode))
  }
  __h__(tag, attr, children){
    return VNode(tag, attr, children.map((child)=>{
      if(typeof child === 'string'){
        return VNode(undefined, undefined, undefined, child)
      }else{
        return child
      }
    }))
  }
  __toString__(val){
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }
}

function observer(value, cb){
  Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive(obj, key, val, cb) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: ()=>{
      if(Dep.target){
        dep.add(Dep.target)
      }
      return val
    },
    set: newVal => {
      if(newVal === val)
        return
      val = newVal
      dep.notify()
    }
  })
}
function watch(vm, exp, cb){
  Dep.target = cb
  return exp()
}

class Dep {
  constructor() {
    this.subs = []
  }
  add(cb) {
    this.subs.push(cb)
  }
  notify() {
    console.log(this.subs);
    this.subs.forEach((cb) => cb())
  }
}
Dep.target = null


var demo = new Vue({
  el: '#demo',
  data: {
    text: "before",
  },
  render(){
    return this.__h__('div', {}, [
      this.__h__('span', {}, [this.__toString__(this.text)])
    ])
  }
})

//<div><span>{{text}}</span></div>

 setTimeout(function(){
   demo.text = "after"
 }, 3000)
