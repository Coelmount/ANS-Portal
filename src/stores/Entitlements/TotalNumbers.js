// import { observable } from 'mobx'

// import { decorate } from 'mobx'
class TotalNumbers {
  arr = []
  map = new Map()

  add(value, id) {
    let obj = this.map.get(id)
    if (obj) {
      obj.value = value
    } else {
      obj = { id, value }
      this.map.set(id, obj)
      this.arr.push(obj)
    }
    console.log(this.arr, 'this arr')
  }
}

// decorate(TotalNumbers, {
//   arr: observable
// })
export default TotalNumbers
