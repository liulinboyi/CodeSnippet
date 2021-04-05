console.log("代码片段宏任务开始-0")
let AsyncMicroTask = [] // （模拟）微任务中的异步入队，这里只讨论、展示异步微任务
async function foo() {
    console.log("-2")
    await new Promise(resolve => resolve())
    AsyncMicroTask.push("-1")
    console.log("-1")
    console.log("代码片段宏任务结束-0")
}

new Promise(resolve => {
    console.log("0")
    setTimeout(() => {
        console.log("第一个宏任务开始-1")
        resolve() // 看resolve在哪个宏任务里执行
    }, 0)
}).then(() => {
    AsyncMicroTask.push("1")
    console.log("1")
    new Promise(resolve => resolve()).then(() => {
        AsyncMicroTask.push("1.5")
        console.log("1.5")
        console.log("第一个宏任务结束-1")
    })
})

setTimeout(() => {
    console.log("第二个宏任务开始-2")
    console.log("2")
    new Promise(resolve => resolve()).then(() => {
        AsyncMicroTask.push("3")
        console.log("3")
        console.log("第二个宏任务开始-2")
    })
}, 0)

console.log("4")
console.log("5")
foo()

// 查看结果，不算入其中
setTimeout(() => {
    console.log(AsyncMicroTask)
})