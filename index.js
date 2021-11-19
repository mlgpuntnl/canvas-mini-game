import { Game } from "./game/game";

const canvas = document.getElementById('mini-game')
const width = 800
const height = 800

const game = new Game(canvas, width, height)

game.startScreen()