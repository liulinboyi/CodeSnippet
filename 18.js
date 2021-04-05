new Promise(resolve => resolve()).then(() => console.log("haha")),(1 + 1)

setTimeout(() => {console.log("haha")}),(1 + 1)



function foo() {
    // new Promise(resolve => resolve()).then(() => console.log("haha"));
    setTimeout(() => {
        console.log("haha")
    })
    return (1 + 1)
}

foo()
