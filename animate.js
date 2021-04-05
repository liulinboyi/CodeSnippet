export class Timeline {
    INITTED = 1
    PALYING = 1 << 1
    PAUSED = 1 << 2
    constructor() {
        this.animations = []
        this.tickId = 0
        this.state = this.INITTED
    }

    tick() {
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
                addStartTime,
            } = animate

            // if (t <= delay) {
            //     continue
            // }

            // let div = addStartTime === 0 ? 0 : addStartTime - this.startTime
            // console.log(div, "div")
            // 百分比
            // t - delay 真正需要插值的时间段，在delay时间段里面，没有动画，不需要插值
            // let progression = timingFunction((t - delay + div) / duration)
            let progression = timingFunction((t - delay - addStartTime) / duration)
            // console.log(progression, "progression")

            if (t > duration + delay + addStartTime) {
                // 当超时时，将进度设置为1
                progression = 1
                animate.finished = true
                // this.state = this.INITTED
            }

            let value = animate.valueFromProgerssion(progression)

            let temp = template(value)

            // console.log(temp)

            object[property] = temp
        }
        if (this.animations.length) {
            this.tickId = requestAnimationFrame(() => this.tick())
        }
    }

    restart() {
        if (this.state === this.PALYING) {
            this.pause()
        }
        this.animations = []
        this.tickId = 0
        this.state = this.INITTED
        this.pauseTime = null
        this.start()
    }

    start() {
        if (this.state === this.INITTED) {
            this.state = this.PALYING
            this.startTime = Date.now()
            this.tick()
        }
    }

    resume() {
        if (this.state === this.PAUSED) {
            this.state = this.PALYING
            //                                30
            // 0(start)        20 (pause)      |                50(resume)
            // |                |              |                 |
            // --------------------------------------------------------------------
            this.startTime = this.startTime + Date.now() - this.pauseTime // Date.now() - this.pauseTime 继续时的时间戳减去暂停时的时间戳，为空闲的时间段
            this.tick()
        }
    }

    /**
     * 暂停和继续只有剩余时间（restTime）不变
     * @returns 
     */
    pause() {
        if (this.state === this.PALYING) {
            // 取消下一个tick
            cancelAnimationFrame(this.tickId)
            this.state = this.PAUSED
            this.pauseTime = Date.now()
        }
    }

    add(animate, addStartTime) { // addStartTime：0 => 像是从0开始，还是从现在开始动画
        animate.finished = false
        this.animations.push(animate)
        if (this.state === this.PALYING) {
            // animate.addStartTime = addStartTime || Date.now()
            animate.addStartTime = addStartTime === void 0 ? Date.now() - this.startTime : addStartTime
        } else {
            animate.addStartTime = addStartTime === void 0 ? 0 : addStartTime
        }
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

    valueFromProgerssion(progression) {
        return this.start + progression * (this.end - this.start)
    }
}

export class ColorAnimation {
    constructor(object, property, template, start, end, duration, delay, timingFunction) {
        this.object = object
        this.property = property
        this.template = template || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`)
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay || 0
        this.timingFunction = timingFunction
    }

    valueFromProgerssion(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}