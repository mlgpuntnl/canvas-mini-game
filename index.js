import { Game } from "./game/game";

const canvas = document.getElementById('mini-game')
const width = 800
const height = 800

const game = new Game(canvas, width, height)

game.startScreen()

// keyboard controlls
document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            game.addInput('left')
            break;
    
        case 'ArrowRight':
            game.addInput('right')
            break;

        case 'Space':
            game.addInput('fire')
            break;
    }
});
addEventListener('keyup', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            game.removeInput('left')
            break;

        case 'ArrowRight':
            game.removeInput('right')
            break;

        case 'Space':
            game.removeInput('fire')
            break;
    }
});