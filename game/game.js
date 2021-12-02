import { Button } from "./ui/button"
import { Player } from "./objects/player"
import { Astroid } from "./objects/astroid"
import { Explosion } from "./animations/explosion"
import { Hearts } from "./ui/hearts"

export function Game(canvas) {
    // create canvas
    this.canvas = canvas
    this.canvas.width = canvas.offsetWidth
    this.canvas.height = canvas.clientHeight
    this.ctx = this.canvas.getContext('2d')
    // set black background
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.imageSmoothingEnabled = false;
    // input handeling
    this.clickActions = []
    this.currentInput = {}

    // game state
    this.fps = 60
    this.running
    this.animations = []
    this.astroids = []
    this.astroidSpawning
    this.astroidSpawnRate = 2

    this.canvas.addEventListener('click', (e) => {
        this.handleClickEvent(e.offsetX, e.offsetY)
    })

    this.startScreen = () => {
        let btn = new Button(
            [this.canvas.width / 2, this.canvas.height / 2],
            200,
            75,
            'Start')
        btn.draw(this.ctx)
        this.addOnClick(btn, this.play)
    }

    this.play = () => {
        this.player = new Player(
            [this.canvas.width * .5, this.canvas.height * .9],
            [100, 100],
            'Spaceship.png',
            this.canvas.width
        )
        this.hearts = new Hearts([this.canvas.width - 10, 10], [75, 75])

        this.running = setInterval(run, (1000 / this.fps))
        this.astroidSpawning = setInterval(createAstroid, (1000 * this.astroidSpawnRate))
    }

    this.addOnClick = (elem, action) => {
        this.clickActions.push({
            elem: elem,
            action: action
        })
    }

    this.handleClickEvent = (x, y) => {
        this.clickActions.forEach((object) => {
            if (object.elem.isClicked(x, y)) {
                object.action()
            }
            // this.animations.push(new Explosion([x,y], 1, this.fps))
        })
    }

    this.handleInput = () => {
        for (let action in this.currentInput) {
            switch (action) {
                case 'left':
                    this.player.move(-1)
                    break;

                case 'right':
                    this.player.move(1)
                    break;

                case 'fire':
                    if (this.currentInput['fire'] == true) {
                        this.player.fire()
                        this.currentInput['fire'] = false
                    }
                    break;
            }
        }
    }

    this.addInput = (action) => {
        if (this.currentInput[action] != false) {
            this.currentInput[action] = true
        }
    }
    this.removeInput = (action) => {
        delete this.currentInput[action]
    }

    const handleCollision = () => {
        for (let i in this.astroids) {
            let collision = false
            for (let j in this.player.bullets) {
                let point = this.player.bullets[j].collideWith(this.astroids[i].box)
                if (point != false) {
                    this.player.bullets.splice(j, 1)
                    this.animations.push(new Explosion([point.x, point.y]))
                    collision = true
                }
            }
            if (collision) {
                this.astroids.splice(i, 1)
                continue
            }
            if (this.player.collideWith(this.astroids[i].box)) {
                this.astroids.splice(i, 1)
                this.player.hp--
                continue
            }
        }
    }

    const createAstroid = () => {
        if (this.running) {
            this.astroids.push(new Astroid(this.canvas.width))
        } else {
            clearInterval(this.astroidSpawning)
        }
    }

    const drawUI = () => {
        this.hearts.draw(this.ctx, this.player.hp)
    }


    const run = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.hp <= 0) {
            clearInterval(this.running)
            this.running = false
        }
        this.handleInput()
        // update objects
        this.player.update()
        for (let i in this.astroids) {
            this.astroids[i].update()
            if (this.astroids[i].position.y >= canvas.height) {
                this.astroids.splice(i, 1)
                this.player.hp--
            }
        }
        for (let i in this.animations) {
            if (!this.animations[i].update()) {
                this.animations.splice(i, 1)
            }
        }
        // check for collision
        handleCollision()
        // draw objects
        this.player.draw(this.ctx)
        this.astroids.forEach(astroid => {
            astroid.draw(this.ctx)
        })
        this.animations.forEach(animation => {
            animation.draw(this.ctx)
        })
        drawUI()
    }
}
