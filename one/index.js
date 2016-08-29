class Vue {
  constructor(options) {
    this.$options = options
    this._data = options.data
    Object.keys(options.data).forEach(key => this._proxy(key))
    observer(options.data, this.$options.render)
    options.render()
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
        self._data[key] = val
      }
    })
  }
}

function observer(value, cb){
  Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive(obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: ()=>{},
    set:newVal=> {
      cb()
    }
  })
}

var demo = new Vue({
  el: '#demo',
  data: {
    text: 123,
  },
  render(){
    console.log("我要render了")
  }
})

 setTimeout(function(){
   demo.text = 444
 }, 3000)
