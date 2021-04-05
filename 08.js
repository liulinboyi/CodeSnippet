// bind

// bind 传参
// Function.prototype.bind2 = function (context, ...args) {

//     let self = this;
//     // 获取bind2函数从第二个参数到最后一个参数
//     // let args = Array.prototype.slice.call(arguments, 1);

//     return function (...bindArgs) {
//         // 这个时候的arguments是指bind返回的函数传入的参数
//         // let bindArgs = Array.prototype.slice.call(arguments);
//         return self.apply(context, args.concat(bindArgs));
//     }

// }


// 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
Function.prototype.bind2 = function (context, ...args) {

    let self = this;
    // let args = Array.prototype.slice.call(arguments, 1);

    let fNOP = function () {};

    let fBound = function (...bindArgs) {
        // let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    // fBound.prototype = this.prototype; // 这种写法，有问题 // 直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype
    fBound.prototype = new fNOP();
    return fBound;
}


function test() {
    console.log(this.a)
}

test.bind2({
    a: "哈哈"
})()

