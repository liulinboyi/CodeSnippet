export class Timeline {
    constructor() {
        this.animations = []
    }

    tick() {
        let t = Date.now() - this.startTime;
        console.log(t)
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

            if (t > duration + delay) {
                debugger
                break
            }

            object[property] = template(timingFunction(start, end)(t - delay))
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
        this.timingFunction = timingFunction || ((start, end) => {
            return (t) => start + (t / duration) * (end - start)
        })
    }
}