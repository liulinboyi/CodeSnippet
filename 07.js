class MyPromise {
    PENDING = "pending"
    RESOLVED = "resolved"
    REJECTED = "rejected"

    state = this.PENDING

    resolvedCalls = []
    rejectedCalls = []
    constructor(fn) {
        try {
            fn((value) => {
                this.resolve(value)
            }, (value) => {
                this.reject(value)
            }) // 执行Promise中的回调函数
        } catch (error) { // 捕获错误，执行reject
            this.reject(error)
        }
    }

    resolve(value) {
        setTimeout(() => {
            if (this.state === this.PENDING) {
                this.value = value
                this.state = this.RESOLVED
                this.resolvedCalls.forEach(call => call())
            }
        })
    }

    reject(value) {
        setTimeout(() => {
            if (this.state === this.PENDING) {
                this.value = value
                this.state = this.REJECTED
                this.rejectedCalls.forEach(call => call())
            }
            // promise链式调用，是当前promise里面存着下一个promise（then）里面定义的resolve和rejected
            // 当前rejectedCalls的长度为0，表示这个是最后一个，没有下一个then
            // 并且state是REJECTED，表示没有在当前以及前面的then中执行rejected回调
            if (this.rejectedCalls.length === 0 && this.state === this.REJECTED) {
                throw new Error(`Uncaught (in promise) ${this.value}`)
            }
        })
    }


    then(prevResolved, prevRejected) {
        prevResolved = prevResolved || (v => v)
        prevRejected = prevRejected || (r => {
            throw r
        })

        if (this.state === this.PENDING) {
            const promise2 = new MyPromise((resolve, reject) => {
                let resolveCall = () => {
                    try {
                        const res = prevResolved(this.value)
                        // resolve(res)
                        this.resolutionProcedure(promise2, res, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }
                this.resolvedCalls.push(resolveCall)

                let rejecteCall = () => {
                    try {
                        const res = prevRejected(this.value)
                        this.resolutionProcedure(promise2, res, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }
                this.rejectedCalls.push(rejecteCall)
            })

            return promise2
        }
    }

    resolutionProcedure(promise2, x, resolve, reject) {
        resolve(x)
        // // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
        // if (promise2 === x) {
        //     return reject(new TypeError("Error"));
        // }
        // // 规范 2.3.2
        // // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
        // if (x instanceof MyPromise) {
        //     if (x.state === this.PENDING) {
        //         x.then((value) => {
        //             // 再次调用该函数是为了确认 x resolve 的
        //             // 参数是什么类型，如果是基本类型就再次 resolve
        //             // 把值传给下个 then
        //             this.resolutionProcedure(promise2, value, resolve, reject);
        //         }, reject);
        //     } else {
        //         x.then(resolve, reject);
        //     }
        //     return;
        // }
        // // 规范 2.3.3.3.3
        // // reject 或者 resolve 其中一个执行过得话，忽略其他的
        // let called = false;
        // // 规范 2.3.3，判断 x 是否为对象或者函数
        // if (x !== null && (typeof x === "object" || typeof x === "function")) {
        //     // 规范 2.3.3.2，如果不能取出 then，就 reject
        //     try {
        //         // 规范 2.3.3.1
        //         let then = x.then;
        //         // 如果 then 是函数，调用 x.then
        //         if (typeof then === "function") {
        //             // 规范 2.3.3.3
        //             then.call(
        //                 x,
        //                 y => {
        //                     if (called) return;
        //                     called = true;
        //                     // 规范 2.3.3.3.1
        //                     this.resolutionProcedure(promise2, y, resolve, reject);
        //                 },
        //                 e => {
        //                     if (called) return;
        //                     called = true;
        //                     reject(e);
        //                 }
        //             );
        //         } else {
        //             // 规范 2.3.3.4
        //             resolve(x);
        //         }
        //     } catch (e) {
        //         if (called) return;
        //         called = true;
        //         reject(e);
        //     }
        // } else {
        //     // 规范 2.3.4，x 为基本类型
        //     resolve(x);
        // }
    }

}

let promise = new MyPromise((resolve, reject) => {
    resolve("Success")
    // reject("Error")
})

// promise.then((res) => {
//         console.log(res)
//     })
//     .then((res) => {
//         console.log(res)
//     })

promise.then((res) => {
            console.log(res)
        },
        (err) => {
            console.log(err)
        }
    )
    .then((res) => {
        console.log(res)
    })