export class Chees {
    static BLACK = 1
    static WHITE = 1 << 1
    static space = 0
    static step = 0
    static curType = Chees.BLACK
    static chess = document.querySelector("#chess")
    static context = Chees.chess.getContext("2d")
    static Cheess = new Set
    static indexCode = "`\${i},\${j}`"
    // 赢法数组 三维数组
    static wins = []
    static winsCount = 0
    // 赢法统计数组 一维
    static peopleWin = [] // 人类赢法 白子
    static machineWin = [] // 机器赢法 黑子

    static over = false // 这一局是否结束

    static async init() {
        let chess = Chees.chess
        let context = Chees.context

        context.strokeStyle = "#bfbfbf"
        context.lineWidth = 1

        let allStep = 26

        let step = allStep / 2 // 移动步长

        Chees.step = step

        let real = chess.height - allStep

        let all = real

        let total = all;

        let space = total / 14

        Chees.space = space

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
            // 横线
            context.moveTo(step, space * i + step)
            context.lineTo(total + step, space * i + step)
            context.stroke() // 绘画
            // 竖线
            context.moveTo(space * i + step, step)
            context.lineTo(space * i + step, total + step)
            context.stroke() // 绘画
        }

        // for (let i = 0; i <= 15; i++) {
        //     context.moveTo(15 + i * 30, 15)
        //     context.lineTo(15 + i * 30, 435)
        //     context.stroke()

        //     context.moveTo(15, 15 + i * 30)
        //     context.lineTo(435, 15 + i * 30)
        //     context.stroke()
        // }

        // Chees.oneStep(0, 0, Chees.BLACK)
        // Chees.oneStep(1, 1, Chees.WHITE)
        Chees.addEvent()
        Chees.calcWins()
        Chees.calcWinCounts()

    }

    static updateState(i, j, judgeType, otherType, msg) {
        for (let k = 0; k < Chees.winsCount; k++) {
            // 在(i,j)处，第k中赢法是true，并且此时(i,j)处有黑子
            if (Chees.wins[i][j][k]) {
                Chees[judgeType][k]++
                Chees[otherType][k] = 6 // 每种赢法最对5个子，这里让白子不可能赢
                if (Chees[judgeType][k] === 5) {
                    // 这种赢法，5颗子都已经被黑子占领了
                    Chees.over = true
                    setTimeout(() => {
                        alert(msg)
                    })
                }
            }
        }
    }
    static calcWinCounts() {
        for (let i = 0; i < Chees.winsCount; i++) {
            Chees.peopleWin[i] = 0
            Chees.machineWin[i] = 0
        }
        console.log(Chees.machineWin, Chees.peopleWin)
    }

    static calcWins() {
        // [[[1]]]
        for (let i = 0; i < 15; i++) {
            Chees.wins[i] = []
            for (let j = 0; j < 15; j++) {
                Chees.wins[i][j] = []
            }
        }

        // 所有竖线的赢法
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 11; j++) {
                // i = 0;j = 0;k = 从0开始自增到4
                //  x坐标 y坐标 第0(winsCount)种赢法
                //     |   |  |
                // wins[0][0][0] = true
                // wins[0][1][0] = true
                // wins[0][2][0] = true
                // wins[0][3][0] = true
                // wins[0][4][0] = true
                // (0,0)(0,1)(0,2)(0,3)(0,4) 可以练成一条线

                // i = 0;j = 1;k = 从0开始自增到4
                //  x坐标 y坐标 第1(winsCount)种赢法
                //     |   |  |
                // wins[0][1][1] = true
                // wins[0][2][1] = true
                // wins[0][3][1] = true
                // wins[0][4][1] = true
                // wins[0][5][1] = true
                // (0,1)(0,2)(0,3)(0,4)(0,5) 可以练成一条线

                for (let k = 0; k < 5; k++) {
                    Chees.wins[i][j + k][Chees.winsCount] = true
                }
                Chees.winsCount++
            }
        }

        // 所有横线的赢法
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 11; j++) {
                // i = 0;j = 0;k = 从0开始自增到4
                //  x坐标 y坐标 第0(winsCount)种赢法
                //     |   |  |
                // wins[0][0][0] = true
                // wins[1][0][0] = true
                // wins[2][0][0] = true
                // wins[3][0][0] = true
                // wins[4][0][0] = true
                // (0,0)(0,1)(0,2)(0,3)(0,4) 可以练成一条线

                // i = 0;j = 1;k = 从0开始自增到4
                //  x坐标 y坐标 第1(winsCount)种赢法
                //     |   |  |
                // wins[1][0][1] = true
                // wins[2][0][1] = true
                // wins[3][0][1] = true
                // wins[4][0][1] = true
                // wins[5][0][1] = true
                // (0,1)(0,2)(0,3)(0,4)(0,5) 可以练成一条线

                for (let k = 0; k < 5; k++) {
                    Chees.wins[j + k][i][Chees.winsCount] = true
                }
                Chees.winsCount++
            }
        }

        // 所有斜线的赢法
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 11; j++) {
                // i = 0;j = 0;k = 从0开始自增到4
                //  x坐标 y坐标 第0(winsCount)种赢法
                //     |   |  |
                // wins[0][0][0] = true
                // wins[1][0][0] = true
                // wins[2][0][0] = true
                // wins[3][0][0] = true
                // wins[4][0][0] = true
                // (0,0)(0,1)(0,2)(0,3)(0,4) 可以练成一条线

                // i = 0;j = 1;k = 从0开始自增到4
                //  x坐标 y坐标 第1(winsCount)种赢法
                //     |   |  |
                // wins[1][0][1] = true
                // wins[2][0][1] = true
                // wins[3][0][1] = true
                // wins[4][0][1] = true
                // wins[5][0][1] = true
                // (0,1)(0,2)(0,3)(0,4)(0,5) 可以练成一条线

                for (let k = 0; k < 5; k++) {
                    Chees.wins[i + k][j + k][Chees.winsCount] = true
                }
                Chees.winsCount++
            }
        }

        // 所有反斜线的赢法
        for (let i = 0; i < 11; i++) {
            for (let j = 14; j > 3; j--) {
                // i = 0;j = 0;k = 从0开始自增到4
                //  x坐标 y坐标 第0(winsCount)种赢法
                //     |   |  |
                // wins[0][0][0] = true
                // wins[1][0][0] = true
                // wins[2][0][0] = true
                // wins[3][0][0] = true
                // wins[4][0][0] = true
                // (0,0)(0,1)(0,2)(0,3)(0,4) 可以练成一条线

                // i = 0;j = 1;k = 从0开始自增到4
                //  x坐标 y坐标 第1(winsCount)种赢法
                //     |   |  |
                // wins[1][0][1] = true
                // wins[2][0][1] = true
                // wins[3][0][1] = true
                // wins[4][0][1] = true
                // wins[5][0][1] = true
                // (0,1)(0,2)(0,3)(0,4)(0,5) 可以练成一条线

                for (let k = 0; k < 5; k++) {
                    Chees.wins[i + k][j - k][Chees.winsCount] = true
                }
                Chees.winsCount++
            }
        }
        console.log(Chees.wins, Chees.winsCount)
    }

    static addEvent() {
        let chess = Chees.chess
        chess.addEventListener("click", (event) => {
            if (Chees.over) return
            if (Chees.curType !== Chees.BLACK) return // 白子下棋时，点击无效
            // console.log(event)
            // console.log(event.offsetX)
            // console.log(event.offsetY)
            const space = Chees.space
            const step = Chees.step
            console.log(`i:${Math.round((event.offsetX - step) / space) }, j:${Math.round((event.offsetY - step) / space)}`)
            let i = Math.round((event.offsetX - step) / space)
            let j = Math.round((event.offsetY - step) / space)
            let index = eval(Chees.indexCode)
            console.log(index, Chees.Cheess)
            if (Chees.Cheess.has(index)) return
            Chees.oneStep(i, j, Chees.curType)
            Chees.updateState(i, j, "peopleWin", "machineWin", "你赢了")
            if (!Chees.over) {
                Chees.computedAI()
            }
        })
    }
    static oneStep(i, j, type) {
        let context = Chees.context
        const space = Chees.space
        const step = Chees.step
        context.beginPath()
        context.arc(step + i * space, step + j * space, 13, 0, 2 * Math.PI)
        context.stroke()
        context.closePath()
        let rg = context.createRadialGradient(step + i * space + 2 /*渐变圆心发生偏移 */ , step + j * space - 2, 13, step + i * space + 2, step + j * space - 2, 0)
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
        Chees.curType = Chees.curType === Chees.WHITE ? Chees.BLACK : Chees.WHITE
    }

    /**
     * 在优解前3中随机取一个，作为最优解
     */
    static computedAIFromThree() {
        // 计算所有空闲的点，计算得分
        let peopleScore = [] // 人类得分
        let machineScore = [] // 机器得分
        // let x = 0
        // let y = 0
        // let max = 0

        for (let i = 0; i < 15; i++) {
            peopleScore[i] = []
            machineScore[i] = []
            for (let j = 0; j < 15; j++) {
                peopleScore[i][j] = 0
                machineScore[i][j] = 0
            }
        }

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let index = eval(Chees.indexCode)
                if (!Chees.Cheess.has(index)) {
                    // 如果这个点没有落子,遍历所有赢法
                    for (let k = 0; k < Chees.winsCount; k++) {
                        // 有可能(i,j)同时在多种赢法上面，得分是所有累加的
                        if (Chees.wins[i][j][k]) {
                            // 拦截
                            // 第k中赢法，已经落了一颗黑子了，需要白子进行拦截
                            if (Chees.peopleWin[k] === 1) {
                                peopleScore[i][j] += 200
                            } else if (Chees.peopleWin[k] === 2) {
                                // 这时，第k中赢法，已经落了两颗黑子，这时进行拦截，收益更大
                                peopleScore[i][j] += 400
                            } else if (Chees.peopleWin[k] === 3) {
                                // 这时，第k中赢法，已经落了三颗黑子，这时进行拦截，收益更大
                                peopleScore[i][j] += 2000
                            } else if (Chees.peopleWin[k] === 4) {
                                // 这时，第k中赢法，已经落了四颗黑子，这时进行拦截，收益更大
                                peopleScore[i][j] += 10000
                            }

                            // 机器本身
                            if (Chees.machineWin[k] === 1) {
                                machineScore[i][j] += 220
                            } else if (Chees.machineWin[k] === 2) {
                                // 这时，第k中赢法，已经落了两颗白子，这时进行拦截，收益更大
                                machineScore[i][j] += 420
                            } else if (Chees.machineWin[k] === 3) {
                                // 这时，第k中赢法，已经落了三颗白子，这时进行拦截，收益更大
                                machineScore[i][j] += 2200
                            } else if (Chees.machineWin[k] === 4) {
                                // 这时，第k中赢法，已经落了四颗白子，这时进行拦截，收益更大
                                machineScore[i][j] += 20000
                            }
                        }
                    }
                }
            }
        }

        let peopleScoreMax = 0
        let machineScoreMax = 0
        let max = 0
        let x = 0
        let y = 0
        let a = 0
        let b = 0
        let positionx = 0
        let positiony = 0

        /*
        去machineScore和peopleScore去找分数最高的点
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
        */

        let problalyMax = [] // 记录8个可能赢的分数

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (peopleScore[i][j] > peopleScoreMax) {
                    x = i
                    y = j
                    peopleScoreMax = peopleScore[i][j]
                    problalyMax.push({
                        location: {
                            x,
                            y,
                        },
                        score: peopleScoreMax,
                    })
                }
                if (machineScore[i][j] > machineScoreMax) {
                    a = i
                    b = j
                    machineScoreMax = machineScore[i][j]
                    problalyMax.push({
                        location: {
                            x: a,
                            y: b,
                        },
                        score: machineScoreMax,
                    })
                }
            }
        }

        console.log(peopleScoreMax, machineScoreMax)
        console.log(positionx, positiony)
        console.log(problalyMax.sort((a, b) => -(a.score - b.score))) // a - b < 0 , a在前面
        problalyMax = problalyMax.slice(0, 8)
        console.log(problalyMax, "problalyMax")
        let fil = problalyMax.filter(item => item.score > 10000)
        if (fil.length > 0) {
            problalyMax = fil
        }

        const range = problalyMax.length >= 3 ? 3 : problalyMax.length
        const maxInfo = problalyMax[Math.floor(Math.random() * range)]

        // console.log(max)
        console.log(maxInfo)
        console.log(maxInfo.score)

        Chees.oneStep(maxInfo.location.x, maxInfo.location.y, Chees.WHITE)
    }

    /**
     * 最优解
     */
    static computedAI() {
        // 计算所有空闲的点，计算得分
        let peopleScore = [] // 人类得分
        let machineScore = [] // 机器得分
        // let x = 0
        // let y = 0
        // let max = 0

        for (let i = 0; i < 15; i++) {
            peopleScore[i] = []
            machineScore[i] = []
            for (let j = 0; j < 15; j++) {
                peopleScore[i][j] = 0
                machineScore[i][j] = 0
            }
        }

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let index = eval(Chees.indexCode)
                if (!Chees.Cheess.has(index)) {
                    // 如果这个点没有落子,遍历所有赢法
                    for (let k = 0; k < Chees.winsCount; k++) {
                        // 有可能(i,j)同时在多种赢法上面，得分是所有累加的
                        if (Chees.wins[i][j][k]) {
                            // 拦截
                            // 第k中赢法，已经落了一颗黑子了，需要白子进行拦截
                            if (Chees.peopleWin[k] === 1) {
                                peopleScore[i][j] += 200
                            } else if (Chees.peopleWin[k] === 2) {
                                // 这时，第k中赢法，已经落了两颗黑子，这时进行拦截，收益更大
                                peopleScore[i][j] += 400
                            } else if (Chees.peopleWin[k] === 3) {
                                // 这时，第k中赢法，已经落了三颗黑子，这时进行拦截，收益更大
                                peopleScore[i][j] += 2000
                            } else if (Chees.peopleWin[k] === 4) {
                                // 这时，第k中赢法，已经落了四颗黑子，这时进行拦截，收益更大
                                peopleScore[i][j] += 10000
                            }

                            // 机器本身
                            if (Chees.machineWin[k] === 1) {
                                machineScore[i][j] += 220
                            } else if (Chees.machineWin[k] === 2) {
                                // 这时，第k中赢法，已经落了两颗白子，这时进行拦截，收益更大
                                machineScore[i][j] += 420
                            } else if (Chees.machineWin[k] === 3) {
                                // 这时，第k中赢法，已经落了三颗白子，这时进行拦截，收益更大
                                machineScore[i][j] += 2200
                            } else if (Chees.machineWin[k] === 4) {
                                // 这时，第k中赢法，已经落了四颗白子，这时进行拦截，收益更大
                                machineScore[i][j] += 20000
                            }
                        }
                    }
                }

                // 去machineScore和peopleScore去找分数最高的点
                // if (peopleScore[i][j] > max) {
                //     max = peopleScore[i][j]
                //     x = i
                //     y = j
                // } else if (peopleScore[i][j] === max) {
                //     if (machineScore[i][j] > machineScore[x][y]) {
                //         x = i
                //         y = j
                //     }
                // }

                // if (machineScore[i][j] > max) {
                //     max = machineScore[i][j]
                //     x = i
                //     y = j
                // } else if (machineScore[i][j] === max) {
                //     if (peopleScore[i][j] > peopleScore[x][y]) {
                //         x = i
                //         y = j
                //     }
                // }
            }
        }

        // Chees.oneStep(x, y, Chees.WHITE)
        // Chees.updateState(x, y, "machineWin", "peopleWin", "机器赢了")


        let peopleScoreMax = 0
        let machineScoreMax = 0
        let max = 0
        let x = 0
        let y = 0
        let a = 0
        let b = 0
        let positionx = 0
        let positiony = 0

        /*
        去machineScore和peopleScore去找分数最高的点
        [[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
        */

        let problalyMax = [] // 记录8个可能赢的分数

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (peopleScore[i][j] > peopleScoreMax) {
                    x = i
                    y = j
                    peopleScoreMax = peopleScore[i][j]
                    problalyMax.push({
                        location: {
                            x,
                            y,
                        },
                        score: peopleScoreMax,
                    })
                }
                if (machineScore[i][j] > machineScoreMax) {
                    a = i
                    b = j
                    machineScoreMax = machineScore[i][j]
                    problalyMax.push({
                        location: {
                            x: a,
                            y: b,
                        },
                        score: machineScoreMax,
                    })
                }
            }
        }
        if (peopleScoreMax > machineScoreMax) {
            max = peopleScoreMax
            positionx = x
            positiony = y
        } else {
            max = machineScoreMax
            positionx = a
            positiony = b
        }
        Chees.oneStep(positionx, positiony, Chees.WHITE)
    }
}