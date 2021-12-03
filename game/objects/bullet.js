import { Object } from "./object";

export class Bullet extends Object {
    constructor(position, size) {
        super(position, [size, size * 4], 10, false)
        this.direction.y = -1
        this.alive = true
    }

    update() {
        super.update()

        if (this.position.y + this.size.height < 0) {
            this.alive = false
        }

        return this.alive
    }
}