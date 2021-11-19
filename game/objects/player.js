import { Object } from "./object";

export class Player extends Object{
    constructor(position, size, image) {
        super(position, size, image)
    }

    move(direction) {
        this.direction.x = direction
    }

    update() {
        super.update()
        this.direction.x = 0
    }
}