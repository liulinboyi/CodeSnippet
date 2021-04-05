class MyPromise {
    PENDING = "PENDING"
    RESOLVED = "RESOLVED"
    REJECTED = "REJECTED"
    state = this.PENDING
    value = ''
    resolveStack = []
    rejectStack = []

    constructor(fn) {
        try {
            fn( /*将这个函数传递出去，在回调函数中执行*/ (value) => {
                // this.resolve执行是在try catch中执行的
                this.resolve(value)
            }, /*将这个函数传递出去，在回调函数中执行*/ (error) => {
                // this.reject执行是在try catch中执行的
                this.reject(error)
            })
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        setTimeout(() => {
            if (this.state === this.PENDING) {
                this.state = this.RESOLVED
                this.value = value
                for (let fn of this.resolveStack) {
                    // resolve方法的执行已经在构造函数中catch，捕获错误了
                    fn()
                }
            }
        })
    }

    reject(value) {
        setTimeout(() => {
            if (this.state === this.PENDING) {
                this.state = this.REJECTED
                this.value = value
                for (let fn of this.rejectStack) {
                    // reject方法的执行已经在构造函数中catch，捕获错误了
                    fn()
                }
            }
        })
    }

    then(resolve, reject) {
        let resolveFn = resolve ? resolve : value => value;
        let rejectFn = reject ? reject : error => {
            throw error
        };
        let promise2 = new MyPromise((resolve, reject) => {
            let resolveCall = () => {
                try {
                    let res = resolveFn(this.value)
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            }
            this.resolveStack.push(resolveCall)
            let rejectCall = () => {
                try {
                    let res = rejectFn(this.value)
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            }
            this.rejectStack.push(rejectCall)
        })
        return promise2
    }
}

var p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("ok")
    }, 2000)
})


// console.log(p)

p.then((res) => {
    console.log(res)
}, (error) => {
    console.log(error)
})

