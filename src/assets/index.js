import img from '../images/77kb.jpg'
import {fn, fn1} from './hotTest'
let n1 = 100005;
let n2 = 100;
let n3 = 200
let foo = (a, b) => {
    return a + b + img
}

fn1()

// 配置HMR
if (module.hot) {
    module.hot.accept(["./hotTest.js"]);
}
export {
    n1, n2, n3,
    foo
}
