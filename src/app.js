import './css/a.css'
import './css/b.less'
import {n1, n2, n3, foo} from './assets/index'
var add = (a, b) => {
    return a + b
}

var bbb = 0
let res = foo(100, 8)
console.log(add(n1, n2))
console.log('res:',res)
console.log('EXPRESSION', EXPRESSION)
console.log('BOOLEAN1', BOOLEAN)
console.log('URL235', URL)
// 配置HMR
// if (module.hot) {
//     module.hot.accept(["./assets/index.js"]);
// }
