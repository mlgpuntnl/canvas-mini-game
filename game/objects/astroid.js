import { Object } from "./object";

export class Astroid extends Object {
    constructor(spawnRange) {
        let size = Math.floor(Math.random() * 100) + 50
        let spawnPadding = 50 + size
        let pos = [Math.floor(Math.random() * (spawnRange - spawnPadding)) + (spawnPadding/2), - size ]
        let spd = 5
        let img_url = 'astroids/astroid-1.png'

        super(pos, [size,size], spd, img_url)

        this.direction.x = (Math.floor(Math.random() * 1.2 * 10) / 10) - .6
        this.direction.y = 1 - this.direction.x
        this.rotSpeed = Math.floor(Math.random() * 7) - 3
        this.rotation = Math.floor(Math.random() * 360)

        this.spawnRange = spawnRange
    }

    update() {
        this.rotation += this.rotSpeed
        if (this.position.x <= 0 || this.position.x > this.spawnRange - this.size.width) {
            this.direction.x = - this.direction.x
        }
        super.update()
    }

    // overrides parent method to draw a rotated image
    draw(ctx) {
        // save canvas state
        ctx.save()
        // set canvas origin to the astroid's center
        ctx.translate(this.position.x + this.size.width/2, this.position.y + this.size.height/2);
        // rotate canvas
        ctx.rotate(this.rotation * Math.PI/180)
        // reset canvas origin
        ctx.translate( - (this.position.x + this.size.width / 2),  - (this.position.y + this.size.height / 2));
        // draw image on rotated canvas
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        )
        // load canvas state
        ctx.restore()
    }
}