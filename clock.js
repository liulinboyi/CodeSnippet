class Clock {
    IntervalId = 0
    constructor() {
        this.refreshTime()
        this.IntervalId = setInterval(() => {
            this.refreshTime()
        }, 1000)
    }

    stop() {
        clearInterval(this.IntervalId)
    }

    refreshTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        // console.log(year,month,day,hours,minutes,seconds)
        let content = `今天是<span class="number">${year}</span>年<span class="number">${month+1}</span>月<span class="number">${day}</span>日<span class="number">${hours}</span>时<span class="number">${minutes}</span>分<span class="number">${seconds}</span>秒`
        document.body.style.fontSize = "30px"
        document.body.innerHTML = content
        document.querySelectorAll(".number").forEach(item => item.style.fontSize = "55px")
    }


}
new Clock()