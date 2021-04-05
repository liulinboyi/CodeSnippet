export class Timeline {
    constructor() {
        this.animations = []
    }

    tick() {
        let t = Date.now() - this.startTime;
        // console.log(t)
        for (let animate of this.animations) {
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

            // if (t <= delay) {
            //     continue
            // }
            if (t >= duration + delay) {
                // 当超时时，将进度设置为1
                let progression = 1
                let value = start + progression * (end - start)

                let temp = template(value)

                console.log(temp)

                object[property] = temp
                debugger
                continue
            }

            // 百分比
            // t - delay 真正需要插值的时间段，在delay时间段里面，没有动画，不需要插值
            let progression = timingFunction((t - delay) / duration)

            let value = start + progression * (end - start)

            let temp = template(value)

            console.log(temp)

            object[property] = temp
        }
        requestAnimationFrame(() => this.tick())
    }

    start() {
        this.startTime = Date.now()
        this.tick()
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