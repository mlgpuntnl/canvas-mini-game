import { Animation } from "./animation";
import { Particle } from "../objects/particle";

export class Explosion extends Animation
{
    constructor(origin) {
        super(origin, 10)
        this.particle_speed = 6
        this.particle_size = [7, 30]
        this.create()
    }

    create() {
        let num_particles = 8
        let angle = 360 / num_particles
        let direction = [0, -1]
        let direction_step = (1 / (num_particles / 4))

        for (let i = 0; i < num_particles; i++) {
            let rotation = angle * i     
            this.particles.push(
                new Particle(
                    [this.origin.x, this.origin.y],
                    this.particle_size,
                    direction,
                    rotation,
                    this.particle_speed
                )
            )   
            // calc x direction of next particle
            if (i >= (num_particles / 4) && i < (num_particles / 4) * 3) {
                direction[0] -= direction_step
            }else {
                direction[0] += direction_step
            }
            // calc y direction of next particle
            if (i < (num_particles / 2)) {
                direction[1] += direction_step
            } else if (i == (num_particles / 2)+1){
                direction[1] = 0
            } else {
                direction[1] -= direction_step
            }
        }
    }
}