class Vue {
  constructor(options) {
    this.$options = options
    this._data = options.data
    observer(options.data, this.$options.render)
    options.render()
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
   demo._data.text = 444
 }, 3000)
