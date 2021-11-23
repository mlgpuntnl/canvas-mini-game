import { Object } from "./object";

export class Particle extends Object {
    constructor(position, size, direction, rotation, spd) {
        super(position, size, spd, false)
        this.rotation = rotation
        this.direction = {
            x: direction[0],
            y: direction[1]
        }
    }

    // draw a rotated rectangle
    draw(ctx) {
        // save canvas state
        ctx.save()
        // set canvas origin to the astroid's center
        ctx.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        // rotate canvas
        ctx.rotate(this.rotation * Math.PI / 180)
        // reset canvas origin
        ctx.translate(- (this.position.x + this.size.width / 2), - (this.position.y + this.size.height / 2));
        // draw rect on rotated canvas
        super.draw(ctx)
        // load canvas state
        ctx.restore()
    }
}