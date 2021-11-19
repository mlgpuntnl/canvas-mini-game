import { Button } from "./ui/button"
import { Player } from "./objects/player"

export function Game(canvas, width, height) {
    this.canvas = canvas
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    // set black background
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0,0,this.width,this.height)
    this.ctx.imageSmoothingEnabled = false;

    this.clickActions = []
    this.currentInput = {}

    this.fps = 60
    this.running

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
            [ this.canvas.width * .5, this.canvas.height * .8 ],
            [ 100, 100 ],
            'spaceship.png'
        )
        
        this.running = setInterval(run, (1000 / this.fps))
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
        for (const action in this.currentInput) {
            switch (action) {
                case 'left':
                    this.player.move(-1)
                    break;

                case 'right':
                    this.player.move(1)
                    break;

                case 'fire':
                    console.log('Fire!!');
                    break;
            }
        }
    }
    
    this.removeInput = (action) => {
        this.keysPressed[action] = true
    }
    this.removeInput = (action) => {
        delete this.keysPressed[action]
    }


    const run = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handleInput()
        this.player.update()
        this.player.draw(this.ctx)
    }
}
