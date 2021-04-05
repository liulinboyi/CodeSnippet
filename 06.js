class MyPromise {
    // 三种状态
    PENDING = "pending";
    RESOLVED = "fulfilled";
    REJECTED = "rejected";
    uid = 0;
    static id = 0;

    state = this.PENDING;
    value = undefined;

    // 用于保存 then 中的回调，只有当 promise
    // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
    resolvedCallbacks = [];
    rejectedCallbacks = [];
    constructor(fn) {
        if (typeof fn !== "function") {
            throw new Error(`Uncaught TypeError: Promise resolver ${fn} is not a function`)
        }
        // 用于解决以下问题
        // new Promise(() => throw Error('error))
        try {
            let newResolve = this.resolve.bind(this)
            let newReject = this.reject.bind(this)
            fn(newResolve, newReject);
        } catch (e) {
            this.reject(e);
        }
    }

    resolve(value) {
        if (value instanceof MyPromise) {
            // 如果 value 是个 Promise，递归执行
            return value.then(this.resolve, this.reject)
        }
        setTimeout(() => { // 异步执行，保证执行顺序
            if (this.state === this.PENDING) {
                this.state = this.RESOLVED;
                this.value = value;
                this.resolvedCallbacks.forEach(cb => cb());
            }
        })
    };

    reject(reason) {
        setTimeout(() => { // 异步执行，保证执行顺序
            if (this.state === this.PENDING) {
                this.state = this.REJECTED;
                this.value = reason;
                this.rejectedCallbacks.forEach(cb => cb());
            }
            // promise链式调用，是当前promise里面存着下一个promise（then）里面定义的resolve和rejected
            // 当前rejectedCalls的长度为0，表示这个是最后一个，没有下一个then
            // 并且state是REJECTED，表示没有在当前以及前面的then中执行rejected回调
            if (this.rejectedCallbacks.length === 0 && this.state === this.REJECTED) {
                throw new Error(`Uncaught (in promise) ${this.value}`)
            }
        })
    }

    then(onResolved, onRejected) {
        // 规范 2.2.7，then 必须返回一个新的 promise
        let promise2;
        // 规范 2.2.onResolved 和 onRejected 都为可选参数
        // 如果类型不是函数需要忽略，同时也实现了透传
        // Promise.resolve(4).then().then((value) => console.log(value))
        onResolved = typeof onResolved === 'function' ? onResolved : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : r => {
            throw new Error(r)
        };
        // if (this.state === this.RESOLVED) {
        //     MyPromise.id++;
        //     promise2 = new MyPromise((resolve, reject) => {
        //         // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
        //         // 所以用了 setTimeout 包裹下
        //         setTimeout(() => {
        //             try {
        //                 const x = onResolved(this.value);
        //                 this.resolutionProcedure(promise2, x, resolve, reject);
        //             } catch (reason) {
        //                 reject(reason);
        //             }
        //         });
        //     })
        //     promise2.uid = MyPromise.id
        //     return promise2
        // }
        // if (this.state === this.REJECTED) {
        //     MyPromise.id++;
        //     promise2 = new MyPromise((resolve, reject) => {
        //         setTimeout(() => {
        //             // 异步执行onRejected
        //             try {
        //                 const x = onRejected(this.value);
        //                 this.resolutionProcedure(promise2, x, resolve, reject);
        //             } catch (reason) {
        //                 reject(reason);
        //             }
        //         });
        //     })
        //     promise2.uid = MyPromise.id
        //     return promise2
        // }
        if (this.state === this.PENDING) {
            MyPromise.id++;
            promise2 = new MyPromise((resolve, reject) => {
                this.resolvedCallbacks.push(() => {
                    // 考虑到可能会有报错，所以使用 try/catch 包裹
                    try {
                        const x = onResolved(this.value);
                        this.resolutionProcedure(promise2, x, resolve, reject);
                    } catch (r) {
                        reject(r);
                    }
                });
                this.rejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.value);
                        this.resolutionProcedure(promise2, x, resolve, reject);
                    } catch (r) {
                        reject(r);
                    }
                });
            })
            promise2.uid = MyPromise.id
            return promise2
        }
    };

    catch (onRejected) {
        // 规范 2.2.7，then 必须返回一个新的 promise
        let promise2;
        // 规范 2.2.onResolved 和 onRejected 都为可选参数
        // 如果类型不是函数需要忽略，同时也实现了透传
        // Promise.resolve(4).then().then((value) => console.log(value))
        const onResolved = v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : r => {
            throw new Error(r)
        };
        // if (this.state === this.RESOLVED) {
        //     MyPromise.id++;
        //     promise2 = new MyPromise((resolve, reject) => {
        //         // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
        //         // 所以用了 setTimeout 包裹下
        //         setTimeout(() => {
        //             try {
        //                 const x = onResolved(this.value);
        //                 this.resolutionProcedure(promise2, x, resolve, reject);
        //             } catch (reason) {
        //                 reject(reason);
        //             }
        //         });
        //     })
        //     promise2.uid = MyPromise.id
        //     return promise2
        // }
        // if (this.state === this.REJECTED) {
        //     MyPromise.id++;
        //     promise2 = new MyPromise((resolve, reject) => {
        //         setTimeout(() => {
        //             // 异步执行onRejected
        //             try {
        //                 const x = onRejected(this.value);
        //                 this.resolutionProcedure(promise2, x, resolve, reject);
        //             } catch (reason) {
        //                 reject(reason);
        //             }
        //         });
        //     })
        //     promise2.uid = MyPromise.id
        //     return promise2
        // }
        if (this.state === this.PENDING) {
            MyPromise.id++;
            promise2 = new MyPromise((resolve, reject) => {
                this.resolvedCallbacks.push(() => {
                    // 考虑到可能会有报错，所以使用 try/catch 包裹
                    try {
                        const x = onResolved(this.value);
                        this.resolutionProcedure(promise2, x, resolve, reject);
                    } catch (r) {
                        reject(r);
                    }
                });
                this.rejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.value);
                        this.resolutionProcedure(promise2, x, resolve, reject);
                    } catch (r) {
                        reject(r);
                    }
                });
            })
            promise2.uid = MyPromise.id
            return promise2
        }
    };

    resolutionProcedure(promise2, x, resolve, reject) {
        // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
        if (promise2 === x) {
            return reject(new TypeError("Error"));
        }
        // 规范 2.3.2
        // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
        if (x instanceof MyPromise) {
            if (x.state === this.PENDING) {
                x.then((value) => {
                    // 再次调用该函数是为了确认 x resolve 的
                    // 参数是什么类型，如果是基本类型就再次 resolve
                    // 把值传给下个 then
                    this.resolutionProcedure(promise2, value, resolve, reject);
                }, reject);
            } else {
                x.then(resolve, reject);
            }
            return;
        }
        // 规范 2.3.3.3.3
        // reject 或者 resolve 其中一个执行过得话，忽略其他的
        let called = false;
        // 规范 2.3.3，判断 x 是否为对象或者函数
        if (x !== null && (typeof x === "object" || typeof x === "function")) {
            // 规范 2.3.3.2，如果不能取出 then，就 reject
            try {
                // 规范 2.3.3.1
                let then = x.then;
                // 如果 then 是函数，调用 x.then
                if (typeof then === "function") {
                    // 规范 2.3.3.3
                    then.call(
                        x,
                        y => {
                            if (called) return;
                            called = true;
                            // 规范 2.3.3.3.1
                            this.resolutionProcedure(promise2, y, resolve, reject);
                        },
                        e => {
                            if (called) return;
                            called = true;
                            reject(e);
                        }
                    );
                } else {
                    // 规范 2.3.3.4
                    resolve(x);
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            // 规范 2.3.4，x 为基本类型
            resolve(x);
        }
    }
}

module.exports = MyPromise

const promise = new MyPromise(function promise1(resolve /* 从Promise的方法中传递出来的 */ ) {
    resolve("Success") // 把参数传递给回调
});

// promise.then((res) => {
//     console.log(res, "执行了")
// })

let p2 = promise.then(res => {
    console.log(res)
    return p2
})

p2.then(res => {
    console.log(res)
    return p2
})

// promise
//     .then(function then1(response) {
//         console.log(response, "first")
//         // return "second"
//         throw new Error("Error")
//     })
//     .then(function then2(res) {
//         console.log(res, "second")
//     })
//     .catch(function catch1(err) {
//         console.log(err)
//     })
//     .catch(function catch1(err) {
//         console.log(err)
//     })