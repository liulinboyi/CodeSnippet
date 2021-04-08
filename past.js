function past(start, end) {
    let now = new Date(start).getTime()
    let feature = new Date(end).getTime()
    let past = feature - now
    console.log(`从${start}到${end}还有${past / 1000 / 60 / 60 / 24}天`)
}
past("2021/04/08","2021/06/01")