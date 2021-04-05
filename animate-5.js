export class Timeline {
    constructor() {
        this.animations = []
        this.tickId = 0
        this.isRun = true
        this.restTime = 0
        this.endTime = 0
    }

    tick() {
        //           中间点击停止时的时间
        //  开始时间     Date.now()                    结束时间
        // (startTime)0    stop     (startTime + duration + delay => endTime)200        
        //    |            |       |                                                   
        //     -------------------------------------------------------------
        //                剩余时间相同


        //  开始时间       暂停                    结束时间                          继续 300     结束时间 350
        // (startTime)0  stop 150  (startTime + duration + delay => endTime)200                (结束时间)
        //    |            |       |                                                    |      |
        //     ---------------------------------------------------------------------------------
        //                                                                             剩余时间相同  
        // 时间差是50，在300处继续，那么结束时间应该为350

        let t = Date.now() - this.startTime; // 已经过了的时间
        // console.log(t)
        let animations = this.animations.filter(item => !item.finished)
        for (let animate of animations) {
            let {
                object,
                property,
                template,
                start,
                end,
                timingFunction,
                delay,
                duration,
            } = animate

            this.endTime = this.startTime + duration + delay

            // if (t <= delay) {
            //     continue
            // }

            // 百分比
            // t - delay 真正需要插值的时间段，在delay时间段里面，没有动画，不需要插值
            let progression = timingFunction((t - delay) / duration)

            if (t >= duration + delay) {
                // 当超时时，将进度设置为1
                progression = 1
                animate.finished = true
                this.isRun = false
            }

            let value = start + progression * (end - start)

            let temp = template(value)

            console.log(temp)

            object[property] = temp
            this.isRun = true
        }
        if (this.animations.length) {
            this.tickId = requestAnimationFrame(() => this.tick())
        }
    }

    start() {
        this.startTime = Date.now()
        this.tick()
    }

    continue () {
        if (this.isRun) return
        // startTime + duration + delay - Date.now() = restTime
        // startTime = restTime + Date.now() - duration - delay
        // startTime = restTime + Date.now() - (duration + delay)
        // startTime = this.endTime - Date.now() + Date.now() - (this.endTime - this.startTime)
        // startTime = this.endTime - this.endTime + this.startTime
        // this.startTime = this.restTime + Date.now() - (this.endTime - this.startTime)
        // this.startTime = this.restTime + Date.now() - this.endTime + this.startTime
        this.startTime = this.startTime + this.restTime + Date.now() - this.endTime
        this.tick()

    }

    /**
     * 暂停和继续只有剩余时间（restTime）不变
     * @returns 
     */
    pause() {
        if (!this.isRun) return
        // 取消下一个tick
        cancelAnimationFrame(this.tickId)
        this.isRun = false
        this.restTime = this.endTime - Date.now()
        console.log(this.restTime, "this.restTime")
    }

    add(animate) {
        this.animations.push(animate)
    }
}

export class Animation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object
        this.property = property
        this.template = template
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay || 0
        this.timingFunction = timingFunction
    }
}