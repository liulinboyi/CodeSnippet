class MyPromise {
    PENDING = "PENDING"
    RESOLVED = "RESOLVED"
    REJECTED = "REJECTED"
    state = this.PENDING
    value = ''
    resolveStack = []
    rejecteStack = []
    constructor(fn) {
        try {
            fn((value) => {
                this.resolve(value)
            }, (error) => {
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
                for (let fn of this.rejecteStack) {
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
                    // reject 也可以return来进行链式调用，让后面的then接收值
                    let res = rejectFn(this.value)
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            }
            this.rejecteStack.push(rejectCall)
        })
        return promise2
    }

    // resolutionProcedure()
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