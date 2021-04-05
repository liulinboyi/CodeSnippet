// 给定一个深度为 n 的多维数组，将其展平。展平后，将其作为 array 实例上的可用方法。

/**
 * [1,2,[3,4]] -> [1,2,3,4]
 */

let arr = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]]

function flatten1(arr) {
    return arr.reduce(function (acc, next) {
        let isArray = Array.isArray(next)
        return acc.concat(isArray ? flatten1(next) : next)
    }, [])
}

if (!Array.prototype.flatten) {
    Array.prototype.flatten1 = function () {
        return flatten1(this)
    }
}
console.log(arr.flatten1());



/**
 * [1,2,[3,4]] -> [1,2,3,4]
 */

function flatten2(arr) {
    let temp = arr.slice() // 为了不修改原数组
    let count = temp.length
    let index = 0
    let output = []
    while (index < count) {
        if (temp[index] instanceof Array) { // 是数组
            temp = temp.concat(temp[index])
            count = count + temp[index].length
            index++
        } else {
            output.push(temp[index])
            index++
        }
    }
    return output
}

// var a = [1,2,[3,4,[5,6]]]
var a = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]]

if (!Array.prototype.flatten2) {
    Array.prototype.flatten2 = function () {
        return flatten2(this)
    }
}
console.log(a.flatten2());