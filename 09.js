// call

Function.prototype.call2 = function (context, ...args) {
    let getGlobal = function () {
        if (typeof self !== 'undefined') {
            return self;
        }
        if (typeof window !== 'undefined') {
            return window;
        }
        if (typeof global !== 'undefined') {
            return global;
        }
        throw new Error('unable to locate global object');
    };
    let originFn = this
    let fnName = Symbol("originFn")
    context = context || getGlobal() // 如果传入将要绑定的this值为null/undefined则绑定this为window

    context[fnName] = originFn
    const res = context[fnName](...args)
    delete context[fnName]
    return res
}

// function test() {
//     console.log(this.a)
// }

// test.call2({
//     a: "哈哈"
// })

// 测试一下
let value = 2;

let obj = {
    value: 1
}

console.log(value)
console.log(global.value)
console.log(this)

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
