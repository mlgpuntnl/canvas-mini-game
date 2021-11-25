
export class Hearts {
    constructor (position, size) {
        this.size = {
            with: size[0],
            height: size[1]
        }
        this.position = {
            x: position[0] - this.size.with,
            y: position[1]
        }
        this.num_hearts = 3
        this.images = [
            this.createImage('heart-empty.png'),
            this.createImage('heart-half.png'),
            this.createImage('heart-full.png')
        ]
        this.hearts = []

        this.initHearts()
    }

    initHearts() {
        for (let i = 0; i < this.num_hearts; i++) {
            this.hearts.push({
                position: {
                    x: this.position.x - (this.size.with * i),
                    y: this.position.y
                }
            })
        }
    }

    createImage(src) {
        let image = new Image()
        image.src = `/game/assets/hearts/${src}`
        return image
    }

    draw(ctx, hp) {
        this.hearts.forEach(heart => {
            let i = 0
            if (hp >= 2) {
                i = 2
                hp -= 2
            } else if (hp == 1) {
                i = 1
                hp--
            } 

            ctx.drawImage(
                this.images[i],
                heart.position.x,
                heart.position.y,
                this.size.with,
                this.size.height
            )
        })
    }
}