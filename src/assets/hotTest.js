
var fn1 = () => {
    console.log('未更新代码块')
}

var fn = () => {
    
    var name = 'HMR01234'

    console.log(name)
}

fn()
export {
    fn,
    fn1
}