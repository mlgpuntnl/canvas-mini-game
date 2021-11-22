import { Object } from "./object";
import { Bullet } from "./bullet";

export class Player extends Object{
    constructor(position, size, image, maxPositionX) {
        let spd = 6
        super(position, size, spd, image)

        this.bullets = []
        this.maxPositionX = maxPositionX - size[0]
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
        if (this.position.x <= 0 &&  this.direction.x < 0) {
            this.direction.x = 0
        } else if(this.position.x >= this.maxPositionX && this.direction.x > 0) {
            this.direction.x = 0
        }
        super.update()
        this.direction.x = 0

        // update bullets
        for (let i in this.bullets) {
            let alive = this.bullets[i].update()
            if (!alive) {
                this.bullets.splice(i, 1)
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