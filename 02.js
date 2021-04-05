// 从零开始创建一项 promise。

class CustomPromise {
    state = "PENDING" // 状态
    value = undefined // 值
    thenCallbacks = [] // 存储then的栈
    errorCallbacks = [] // 存储error的栈

    constructor(action) { // 构造函数
        action(this.resolver.bind(this) /*传入resolve回调 */ , this.reject.bind(this) /**传入reject回调 */ )
    }

    resolver(value) {
        setTimeout(() => {
            this.state = "RESOLVED"
            this.value = value
            for (let thenCall of this.thenCallbacks) {
                try {
                    this.value = thenCall(this.value)
                } catch (error) {
                    this.reject(error)
                    break;
                }
            }
        })
    }

    reject(value) {
        setTimeout(() => {
            this.state = "REJECTED"
            this.value = value
            // this.errorCallbacks[0](this.value)
            const error = this.errorCallbacks.shift()
            if (!error) {
                throw new Error("Uncaught (in promise) Error:" + this.value)
            } else {
                error(this.value)
            }
            // for (let errorCallback of this.errorCallbacks) {
            //     errorCallback(this.value)
            // }
        })
    }

    then(callback) {
        this.thenCallbacks.push(callback)
        return this
    }

    catch (callback) {
        this.errorCallbacks.push(callback)
        return this
    }
}

let promise = new CustomPromise((resolver, reject) => {
    resolver("Success")
    // setTimeout(() => {
    // const rand = Math.ceil(Math.random(1 * 1 + 6) * 6)
    // if (rand > 2) {
    //     resolver("Success")
    // } else {
    //     reject("Error")
    // }
    // }, 1000)
})

// promise
//     .then(function (response) {
//         console.log(response, "first")
//         throw Error("Error")
//     })
//     .then(function (res) {
//         console.log(res, "second")
//     })
//     .catch(function (error) {
//         console.log("出错了，进入cath了 first")
//         console.log(error)
//     })
//     .catch(function (error) {
//         console.log("出错了，进入cath了 second")
//         console.log(error)
//     })

// promise
//     .then(function (response) {
//         console.log(response, "first")
//         throw Error("Error")
//     })
//     .catch(function (error) {
//         console.log("出错了，进入cath了 first")
//         console.log(error)
//         return error
//     })
//     .then(function (res) {
//         console.log(res, "second")
//     })
//     .catch(function (err) {
//         console.log("出错了，进入cath了 second")
//         console.log(err)
//     })

// promise
//     .then(function (response) {
//         console.log(response, "first")
//         throw Error("Error")
//     })
//     .then(function (res) {
//         console.log(res, "second")
//     })


promise
    .then(function (response) {
        console.log(response, "first")
        // return "second"
    })
    .then(function (res) {
        console.log(res, "second")
    })