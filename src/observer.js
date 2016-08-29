export default function observer(data){

  new Observer(data)

}

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


//因为是极简方式所以我们只考虑要Observer的只有一层，而且只是简单对象
class  Observer {
  constructor(value) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key]))
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(){
    this.subs.forEach(sub=>sub.update())
  }
}


aaa = {
  bbb: 1
}

Object.defineProperty(aaa, "bbb", {
  enumerable: true,
  configurable: true,
  get: ()=>{
    //call when  aaa.bbb
  },
  set:newVal=> {
    // call when aaa.bbb = ???
  }
})
