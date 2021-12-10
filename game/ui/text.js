
export class Text {
    constructor(position, fontSize, text = '') {
        this.position = {
            x: position[0],
            y: position[1]
        }
        this.fontSize = fontSize
        this.text = text
    }

    draw(ctx, text = false) {
        if (text) this.text = text
        ctx.font = this.fontSize + 'px monospace';
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'left'
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}