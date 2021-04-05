async function async1() {
    console.log("async 1 start")
    await async2(); // await 之后入队
    console.log("async 1 end")
}

async function async2() {
    console.log("async2")
}

async1()

new Promise(function (resolve) {
    console.log("promise1")
    resolve()
}).then(function () {
    console.log("promise2")
})

/**
 * 宏任务
 *      async 1 start、async2、promise1 这一行同步代码组成一个微任务
 *          async 1 end、promise2 按顺序入微任务队列
 *      async 1 end 这是一个微任务
 *      promise2 这是一个微任务
 * 
 */