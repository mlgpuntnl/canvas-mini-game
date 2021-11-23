
export class Animation 
{
    constructor(origin, frames) {
        this.origin = {
            x: origin[0],
            y: origin[1]
        }
        this.frames = frames
        this.particles = []
    }

    update() {
        if (this.frames <= 0) {
            console.log('animation end');
            return false
        }

        this.particles.forEach(particle => {
            particle.update()
        })

        this.frames = this.frames -1
        return true
    }

    draw(ctx) {
        this.particles.forEach(particle => {
            particle.draw(ctx)
        })
    }
}