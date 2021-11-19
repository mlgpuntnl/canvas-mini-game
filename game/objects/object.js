
export class Object {
    constructor(position, size, image) {
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
        this.speed = 5
        
        // image data
        this.image_url = `/game/assets/${image}`
        this.image = new Image()
        this.image.src = this.image_url
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        )
    }

    update() {
        this.position.x += this.direction.x * this.speed
        this.position.y += this.direction.y * this.speed
    }
}