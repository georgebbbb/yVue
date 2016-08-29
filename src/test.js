
class Vue {
  constructor(data) {
    this._data = data
    const keys = Object.keys(this._data)
    keys.forEach(key=>defineReactive(this._data,key,this._data[key]))

  }
  $watch(exp,fn) {
    Dep.target = {
      update:fn
    }
    this._data[exp]
    Dep.target=null
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub){
    console.log(777);
    this.subs.push(sub)
  }
  notify(){
    this.subs.forEach(sub=>sub.update())
  }
}
Dep.target = null

function defineReactive(obj,key,val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: ()=>{
      // 说明这是watch 引起的
      if(Dep.target){
        dep.addSub(Dep.target)
      }
      return val
    },
    set:newVal=> {
      var value =  val
      if (newVal === value) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}


const v = new Vue({
  a:1,
  b:2
})


v.$watch('a',()=>console.log(889))


setTimeout(()=>{
  console.log(8);
  v._data.a=4
},3000)
v._data.a
