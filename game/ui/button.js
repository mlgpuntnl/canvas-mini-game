

export class Button {
    constructor(position, width, height, text) {
        this.position = {
            x: (position[0] - (width / 2)),
            y: (position[1] - (height / 2))
        }
        this.width = width
        this.height = height
        this.text = text
        this.borderRadius = 30
    }


    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.borderRadius, this.position.y);
        ctx.lineTo(this.position.x + this.width - this.borderRadius, this.position.y);
        ctx.arcTo(
            this.position.x + this.width,
            this.position.y,
            this.position.x + this.width,
            this.position.y + this.borderRadius,
            this.borderRadius);
        ctx.lineTo(this.position.x + this.width, this.position.y + this.height - this.borderRadius);
        ctx.arcTo(
            this.position.x + this.width,
            this.position.y + this.height,
            this.position.x + this.width - this.borderRadius,
            this.position.y + this.height,
            this.borderRadius);
        ctx.lineTo(this.position.x + this.borderRadius, this.position.y + this.height)
        ctx.arcTo(
            this.position.x,
            this.position.y + this.height,
            this.position.x,
            this.position.y + this.height - this.borderRadius,
            this.borderRadius);
        ctx.lineTo(this.position.x, this.position.y + this.borderRadius)
        ctx.arcTo(
            this.position.x,
            this.position.y,
            this.position.x + this.borderRadius,
            this.position.y,
            this.borderRadius);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#fff'
        ctx.stroke();

        ctx.font = (this.height * .5) + 'px monospace';
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'center'
        ctx.fillText(this.text, this.position.x + (this.width / 2), this.position.y + (this.height / 1.5), this.width);
    }

    isClicked(x, y) {
        return (
            x > this.position.x &&
            x < this.position.x + this.width &&
            y > this.position.y &&
            y < this.position.y + this.height
        )
    }
}