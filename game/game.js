import { Button } from "./ui/button"

export function Game(canvas, width, height) {
    this.canvas = canvas
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    // set black background
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0,0,this.width,this.height)

    this.clickActions = []

    this.canvas.addEventListener('click', (e) => {
        this.handleClickEvent(e.offsetX, e.offsetY)
    })

    this.startScreen = () => {
        let btn = new Button([400,400],200,75,'Start')
        btn.draw(this.ctx)
        this.addOnClick(btn, this.play)
    }

    this.play = () => {
        alert('play')
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

}
