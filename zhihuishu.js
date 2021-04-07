setTimeout(function () {
    $('.speedTab15').click();
    $('.volumeIcon').click();
    console.log("已进行静音和1.5倍加速");
}, 3000);

var title = document.title
setInterval(function () {

    if ($('.el-dialog__header>div>h4').text() == "弹题测验") {
        window.setTimeout(function () {
            $(".topic-list :first-child").click();
            $(".el-dialog[aria-label='弹题测验'] .el-icon-close").click();
            $(".videoArea").click();
        }, 1000);
    }

    if (
        $(".currentTime").text() === $(".duration").text()
        //         $(".current_play div b:nth-child(2)").hasClass('time_icofinish') ||
        //         $(".current_play div b:nth-child(3)").hasClass('time_icofinish')
    ) {
        console.log("检测到视频观看完成，准备跳到下一节");
        $('.nextButton').click()
        $(".videoArea").click();
        setTimeout(function () {
            $('.volumeIcon').click();
            $('.speedTab15').click();
        }, 5000);
    }
    let duration = $(".duration").text().split(":")[0] * 60 * 60 + $(".duration").text().split(":")[1] * 60 + $(".duration").text().split(":")[2]
    let currentTime = $(".currentTime").text().split(":")[0] * 60 * 60 + $(".currentTime").text().split(":")[1] * 60 + $(".currentTime").text().split(":")[2]
    let percent = (currentTime / duration).toFixed(2)
    console.log(percent * 100 + "%")
    document.title = `${percent*100}% ${title} ${$(".currentTime").text()}/${$(".duration").text()}`

}, 3000)