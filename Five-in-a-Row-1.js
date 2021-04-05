export function init() {
    let chess = document.querySelector("#chess")
    let context = chess.getContext("2d")

    context.strokeStyle = "#bfbfbf"
    context.lineWidth = 1

    let padding = 8

    // let all = 20 * 14 + 15 + padding * 2
    let all = 30 * 14 + 15
    console.log(all,"all")

    // chess.style.width = `${all}px`
    // chess.style.height = `${all}px`

    let total = all;

    let one = total / 14

    console.log(one, "one")

    for (let i = 0; i <= 13; i++) {
        // 横线
        context.moveTo(padding, padding + one * i)
        context.lineTo(total, padding + one * i)
        context.stroke() // 绘画
        // 竖线
        context.moveTo(padding + one * i, padding)
        context.lineTo(padding + one * i, total)
        context.stroke() // 绘画

        context.moveTo(total, padding)
        context.lineTo(total, total)
        context.stroke() // 绘画

        context.moveTo(padding, total)
        context.lineTo(total, total)
        context.stroke() // 绘画
    }
}