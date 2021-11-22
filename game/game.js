import { Button } from "./ui/button"
import { Player } from "./objects/player"
import { Astroid } from "./objects/astroid"

export function Game(canvas, width, height) {
    // create canvas
    this.canvas = canvas
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    // set black background
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0,0,this.width,this.height)
    this.ctx.imageSmoothingEnabled = false;
    // input handeling
    this.clickActions = []
    this.currentInput = {}

    // game state
    this.fps = 60
    this.running
    this.astroids = []
    this.astroidSpawning
    this.astroidSpawnRate = 2

    this.canvas.addEventListener('click', (e) => {
        this.handleClickEvent(e.offsetX, e.offsetY)
    })

    this.startScreen = () => {
        let btn = new Button([400,400],200,75,'Start')
        btn.draw(this.ctx)
        this.addOnClick(btn, this.play)
    }

    this.play = () => {
        this.player = new Player(
            [ this.canvas.width * .5, this.canvas.height * .9 ],
            [ 100, 100 ],
            'spaceship.png',
            this.canvas.width
        )
        
        this.running = setInterval(run, (1000 / this.fps))
        this.astroidSpawning = setInterval(createAstroid, (1000 * this.astroidSpawnRate))
    }

    this.addOnClick = (elem, action) => {
        this.clickActions.push({
            elem: elem,
            action: action
        })
    }

    this.handleClickEvent = (x,y) => {
        this.clickActions.forEach((object) => {
            if (object.elem.isClicked(x,y)) {
                object.action()
            }
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
        if(this.currentInput[action] != false) {
            this.currentInput[action] = true
        }
    }
    this.removeInput = (action) => {
        delete this.currentInput[action]
    }

    const handleCollision = () => {
        for (let i in this.astroids) {
            let bulletIndex = this.player.bullets.findIndex(bullet => bullet.collideWith(this.astroids[i].box))
            if (bulletIndex != -1) {
                this.astroids.splice(i, 1)
                this.player.bullets.splice(bulletIndex, 1)
                continue
            }
            if (this.player.collideWith(this.astroids[i].box)) {
                this.astroids.splice(i, 1)
                continue
            }
        }
    }

    const createAstroid = () => {
        this.astroids.push(new Astroid(this.canvas.width))
    }


    const run = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handleInput()
        // update objects
        this.player.update()
        for (let i in this.astroids) {
            this.astroids[i].update()
            if (this.astroids[i].position.y >= canvas.height) {
                this.astroids.splice(i,1)
            }
        }
        // check for collision
        handleCollision()
        // draw objects
        this.player.draw(this.ctx)
        this.astroids.forEach(astroid => {
            astroid.draw(this.ctx)
        })
    }
}
