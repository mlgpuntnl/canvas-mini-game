
export class Object {
    constructor(position, size, speed, image = false) {
        this.position = {
            x: position[0] - size[0] / 2,
            y: position[1] - size[1] / 2
        }
        this.size = {
            width: size[0],
            height: size[1]
        }
        this.direction = {
            x: 0,
            y: 0
        }
        this.speed = speed
        
        if(image) {
            // image data
            this.image_url = `/game/assets/${image}`
            this.image = new Image()
            this.image.src = this.image_url
        } else {
            this.image = false
        }

    }

    draw(ctx) {
        if (this.image) {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height
            )
        } else {
            ctx.fillStyle = '#fff'
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height
            )
        }
    }

    update() {
        this.position.x += this.direction.x * this.speed
        this.position.y += this.direction.y * this.speed
    }
}