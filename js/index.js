// import Game from './classes/Game.js'
import Snake from './classes/Snake.js'
const configs = {
    speed: 500
}
//
// const game = new Game(configs);
// console.log(game.fullName)
// game.test()

// const obj = {
//     speed: 150,
//     count: 200,
//     height: 10
// }
// let {speed, count, height} = obj;
// let speed = obj.speed,
//     count = obj.count,
//     height = obj.height;

const snake = new Snake(configs);

window.onload = function () {
    document.querySelector('#gameForm').addEventListener('submit', function (evt) {
        evt.preventDefault()
        let count = +(this.querySelector('input[type="number"]').value);
        if(!count || count <= 3 ) return;
        snake.init(count)
    })
    
}




