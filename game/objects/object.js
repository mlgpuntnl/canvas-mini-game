
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

        this.box = {
            tl: { x: this.position.x, y: this.position.y },
            tr: { x: this.position.x + this.size.width, y: this.position.y },
            br: { x: this.position.x + this.size.width, y: this.position.y + this.size.height },
            bl: { x: this.position.x, y: this.position.y + this.size.height },
        }
    }

    collideWith(box) {
        for (let i in this.box) {
            if (
                this.box[i].x > box.tl.x && 
                this.box[i].x < box.tr.x && 
                this.box[i].y > box.tl.y && 
                this.box[i].y < box.bl.y
            ) {
                return true
            }
        }
        return false
    }
}