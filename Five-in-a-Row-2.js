export class Chees {
    static BLACK = 1
    static WHITE = 1 << 1
    static curType = Chees.BLACK
    static chess = document.querySelector("#chess")
    static context = Chees.chess.getContext("2d")
    static Cheess = new Set
    static indexCode = "`\${i},\${j}`"

    static async init() {
        let chess = Chees.chess
        let context = Chees.context

        context.strokeStyle = "#bfbfbf"
        context.lineWidth = 1

        let allStep = 26

        let step = allStep / 2 // 移动步长

        let real = chess.height - allStep

        let all = real

        let total = all;

        let one = total / 14

        // for (let i = 0; i <= 15; i++) {
        //     // 横线
        //     context.moveTo(step, one * i + step)
        //     context.lineTo(total + step, one * i + step)
        //     context.stroke() // 绘画
        //     // 竖线
        //     context.moveTo(one * i + step, step)
        //     context.lineTo(one * i + step, total + step)
        //     context.stroke() // 绘画
        // }

        let logo = new Image()
        logo.src = "./cherry.png"
        await new Promise((resolve => {
            logo.addEventListener("load", () => {
                context.drawImage(logo, 0, 0, 450, 450)
                // context.globalAlpha = 0.3
                resolve("ok")
            })
        }))

        for (let i = 0; i <= 15; i++) {
            context.moveTo(15 + i * 30, 15)
            context.lineTo(15 + i * 30, 435)
            context.stroke()

            context.moveTo(15, 15 + i * 30)
            context.lineTo(435, 15 + i * 30)
            context.stroke()
        }

        // Chees.oneStep(0, 0, Chees.BLACK)
        // Chees.oneStep(1, 1, Chees.WHITE)

        chess.addEventListener("click", (event) => {
            // console.log(event)
            // console.log(event.offsetX)
            // console.log(event.offsetY)
            console.log(`i:${Math.round((event.offsetX - 15) / 30) }, j:${Math.round((event.offsetY - 15) / 30)}`)
            let i = Math.round((event.offsetX - 15) / 30)
            let j = Math.round((event.offsetY - 15) / 30)
            let index = eval(Chees.indexCode)
            console.log(index,Chees.Cheess)
            if (Chees.Cheess.has(index)) return
            Chees.oneStep(i, j, Chees.curType)
            Chees.curType = Chees.curType === Chees.WHITE ? Chees.BLACK : Chees.WHITE
        })
    }
    static oneStep(i, j, type) {
        let context = Chees.context
        context.beginPath()
        context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI)
        context.stroke()
        context.closePath()
        let rg = context.createRadialGradient(15 + i * 30 + 2 /*渐变圆心发生偏移 */ , 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0)
        if (type === Chees.BLACK) {
            rg.addColorStop(0, "#0a0a0a")
            rg.addColorStop(1, "#636766")
        } else if (type === Chees.WHITE) {
            rg.addColorStop(0, "#d1d1d1")
            rg.addColorStop(1, "#f9f9f9")
        }
        // context.fillStyle = "#636766"
        context.fillStyle = rg
        context.fill()
        Chees.Cheess.add(eval(Chees.indexCode))
    }
}