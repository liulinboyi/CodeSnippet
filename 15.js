// let foo = {
//     a: 0,
//     fn() {
//         return new Promise(resolve => resolve()).then(() => {
//                 this.a = 100;
//                 console.log(this.a, "this.a");
//             }),
//             () => {
//                 console.log(this.a)
//                 return this.a
//             }
//     }
// };
// foo.fn()()
// console.log(foo.a)

// (new Promise(resolve => resolve()).then(() => {
//     global.a = 100;
//     console.log(global.a, "this.a");
// }), function () {
//     console.log(global.a)
//     return global.a
// })()


// new Promise(resolve => resolve()).then(() => {console.log('hello')})

var fn = (new Promise(resolve => resolve()).then(() => {console.log('hello');this.a = 100}),function() {return this.a});
var b = fn();


// var b = (new Promise(resolve => resolve()).then(() => {console.log('hello');this.a = 100}),function() {return this.a})()

// console.log(b)

var fn = (new Promise(resolve => resolve()).then(() => {console.log('hello');this.a = 100}),function() {return this.a});
var b = fn;
b()

