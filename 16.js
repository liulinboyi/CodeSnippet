/**
 * 宏任务
 *     0,4,5,-2
 *        - 入队1,-1
 *     1
 *        - 入队1.5
 *     -1
 *        - 入队-0.5
 *     1.5
 *     -0.5
 * 宏任务
 *     2
 *     3
 */

let AsyncMicroTask = [] // （模拟）微任务中的异步入队，这里只讨论、展示异步微任务
// 所有同步代码都归为一个微任务
// promise 什么时候resolve什么时候入队列
async function foo() {
    console.log("-2")
    await new Promise(resolve => resolve())
    AsyncMicroTask.push("-1")
    console.log("-1")
    await new Promise(resolve => resolve())
    AsyncMicroTask.push("-0.5")
    console.log("-0.5")
}

new Promise(resolve => {
    console.log("0")
    resolve() // 看resolve在哪个宏任务里执行
}).then(() => {
    AsyncMicroTask.push("1")
    console.log("1")
    new Promise(resolve => resolve()).then(() => {
        AsyncMicroTask.push("1.5")
        console.log("1.5")
    })
})

setTimeout(() => {
    console.log("2")
    new Promise(resolve => resolve()).then(() => {
        AsyncMicroTask.push("3")
        console.log("3")
    })
}, 0)

console.log("4")
console.log("5")
foo()

setTimeout(() => {
    console.log(AsyncMicroTask)
})