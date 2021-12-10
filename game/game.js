import { Button } from "./ui/button"
import { Player } from "./objects/player"
import { Astroid } from "./objects/astroid"
import { Explosion } from "./animations/explosion"
import { Hearts } from "./ui/hearts"
import { Text } from "./ui/text"
import { Cookie } from "./utility/cookie"

export function Game(canvas) {
    // create canvas
    this.canvas = canvas
    this.canvas.width = canvas.offsetWidth
    this.canvas.height = canvas.clientHeight
    this.ctx = this.canvas.getContext('2d')
    this.scaleMod = canvas.offsetWidth / 800
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
    this.score = 0
    this.highScore = 0
    this.astroids = []
    this.animations = []
    this.astroidSpawning
    this.astroidSpawnRate = 2

    this.canvas.addEventListener('click', (e) => {
        this.handleClickEvent(e.offsetX, e.offsetY)
    })

    window.addEventListener('blur', () => {
        if (this.running) {
            gameOver()
        }
    });

    this.startScreen = () => {
        let btn = new Button(
            [this.canvas.width / 2, this.canvas.height / 2],
            200 * this.scaleMod,
            75 * this.scaleMod,
            'Start')
        btn.draw(this.ctx)
        this.addOnClick(btn, this.play, true)
    }

    this.play = () => {
        this.player = new Player(
            [this.canvas.width * .5, this.canvas.height * .9],
            [100 * this.scaleMod, 100 * this.scaleMod],
            'Spaceship.png',
            this.canvas.width
        )
        this.highScore = parseInt(Cookie.getCookie('highscore'))
        if (!this.highScore) this.highScore = 0
        this.score = 0
        this.astroids = []
        this.animations = []

        this.hearts = new Hearts([this.canvas.width - 10, 10], [90 * this.scaleMod, 90 * this.scaleMod])
        this.scoreText = new Text([15, (100 * this.scaleMod) + 10], 45 * this.scaleMod, this.score)
        this.highScoreText = new Text([15, (40 * this.scaleMod) + 10], 45 * this.scaleMod)

        this.running = setInterval(run, (1000 / this.fps))
        this.astroidSpawning = setInterval(createAstroid, (1000 * this.astroidSpawnRate))
    }

    this.addOnClick = (elem, action, once = false) => {
        this.clickActions.push({
            elem: elem,
            action: action,
            once: once
        })
    }

    this.handleClickEvent = (x, y) => {
        for (let i in this.clickActions) {
            if (this.clickActions[i].elem.isClicked(x, y)) {
                this.clickActions[i].action()
                if (this.clickActions[i].once) {
                    this.clickActions.splice(i, 1)
                }
            }
        }
        // this.clickActions.forEach((object) => {
        //     if (object.elem.isClicked(x, y)) {
        //         object.action()
        //     }
        // })
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
                    this.animations.push(new Explosion([point.x, point.y], this.scaleMod))
                    collision = true
                }
            }
            if (collision) {
                this.astroids.splice(i, 1)
                this.score++
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
            this.astroids.push(new Astroid(this.canvas.width, 125 * this.scaleMod))
        } else {
            clearInterval(this.astroidSpawning)
        }
    }

    const drawUI = () => {
        this.hearts.draw(this.ctx, this.player.hp)
        this.highScoreText.draw(this.ctx, `Highscore:${this.highScore}`)
        this.scoreText.draw(this.ctx, `Score:${this.score}`)
    }

    const run = () => {
        let game_over = false
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.player.hp <= 0) {
            game_over = true
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
        if (game_over) {
            gameOver()
        }
    }

    const gameOver = () => {
        // clear timed intervalls
        clearInterval(this.running)
        this.running = false

        if (this.score > this.highScore) {
            // set highscore
            Cookie.setCookie('highscore', this.score)
        }
        this.ctx.fillStyle = '#000'
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let gameOver = new Text(
            [this.canvas.width / 2, this.canvas.height / 3],
            100 * this.scaleMod,
            'Game over',
            'center'
        )
        gameOver.draw(this.ctx)
        let btn = new Button(
            [this.canvas.width / 2, this.canvas.height / 2],
            300 * this.scaleMod,
            75 * this.scaleMod,
            'Play again')
        btn.draw(this.ctx)
        this.addOnClick(btn, this.play, true)
    }
}
