import { Object } from "./object";
import { Bullet } from "./bullet";

export class Player extends Object{
    constructor(position, size, image) {
        super(position, size, 5, image)
        this.bullets = []
    }

    move(direction) {
        this.direction.x = direction
    }

    fire() {
        this.bullets.push(
            new Bullet([
                this.position.x + (this.size.width / 2), 
                this.position.y
            ])
        )
    }

    update() {
        super.update()
        this.direction.x = 0

        for (let i in this.bullets) {
            let alive = this.bullets[i].update()
            if (!alive) {
                delete this.bullets[i]
            }
        }
    }
    draw(ctx) {
        super.draw(ctx)
        this.bullets.forEach(bullet => {
            bullet.draw(ctx)
        });
    }
}