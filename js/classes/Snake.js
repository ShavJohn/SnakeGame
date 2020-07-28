class Snake {
    constructor({speed}) {
        this.speed = speed;
        this.name = "Snake";
        this.snake_positions = [
            {x: 0, y: 0}
        ];
        this.current_direction = null;
        this.directions = {
            Up: 1,
            Left: 2,
            Down: 3,
            Right: 4
        }
    }
    init(count) {
        this.gameArea = document.querySelector('#gameArea');
        this.area_length = count;
        if(!this.gameArea) return;
        this.snake_positions[0] = {
            x: Math.floor(count / 2),
            y: Math.floor(count / 2)
        }
        this.drawArea(count);
        this.showSnake();
        this.addFood();
        this.addEvents()
        this.checkPosition()
    }
    drawArea(count) {
        this.gameArea.innerHTML = '';
        for (let i = 0; i < count; i++) {
            let row = document.createElement('div');
            row.classList.add('rows');
            for (let j = 0; j < count; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cells');
                cell.setAttribute('data-x', j)
                cell.setAttribute('data-y', i)
                row.appendChild(cell)
            }
            this.gameArea.appendChild(row)
        }
    }
    getCellElement({x, y}) {
        return document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
    }
    showSnake() {
        this.snake_positions.map(coords => {
            this.getCellElement(coords).classList.add('snake-body')
            this.getCellElement(this.snake_positions[0]).classList.add('snake-head')

        })
    }
    clearSnake() {
        document.querySelectorAll('.snake-body').forEach(item => {
            item.classList.remove('snake-head')
            item.classList.remove('snake-body')
        })
    }
    addFood() {
        let food_elem = this.getCellElement({
            x: Math.floor(Math.random() * this.area_length),
            y: Math.floor(Math.random() * this.area_length)
        });

        if(!food_elem.classList.contains('snake-body')) {
            food_elem.classList.add('food')
        }else {
            this.addFood()
        }
    }
    nyamNyam() {
        let next_cell = this.getCellElement(this.snake_positions[0])
        if(next_cell.classList.contains('food')) {
            next_cell.classList.remove('food');
            this.snake_positions.push(this.snake_positions[0])
            this.addFood()
        }else if(next_cell.classList.contains('snake-body')) {
            alert('game over')
        }
    }
    /*checkPosition() {
        let snake = document.querySelectorAll('.snake-body')
            if(snake !== null){
                console.log(snake.length)
            }
    }
    levelup(){
        let level = document.querySelector('.level')
        let snake = document.querySelectorAll('.snake-body')
        if(snake !== null){
            console.log(snake.length)
        }

        if(snake.length == 7){

        }
        console.log('level')
        level.innerHTML = 1;
        console.log(this.speed)
    }*/
    addEvents(){
        document.addEventListener('keydown', (evt) => {
            switch (evt.code) {
                case('ArrowRight'): this.move('Right');
                break;
                case('ArrowUp'): this.move('Up');
                break;
                case('ArrowDown'): this.move('Down');
                break;
                case('ArrowLeft'): this.move('Left');
                break;
            }
        })
    }
    move(key) {
        if(this.directions[key] % 2 === this.current_direction % 2) return;
        if(this.move_interval) clearInterval(this.move_interval)
        this.nextStep(key)
        this.move_interval = setInterval(() => {
            this.nextStep(key)
        }, this.speed)
    }
    nextStep(key) {
        this[`move${key}`]();
        this.checkPosition()
        this.nyamNyam()
        this.clearSnake();
        this.showSnake();
    }
    moveUp() {
        this.current_direction = this.directions.Up;
        this.snake_positions.unshift({
            x: this.snake_positions[0].x,
            y: this.snake_positions[0].y - 1
        })
        this.snake_positions.pop();
    }
    moveDown() {
        this.current_direction = this.directions.Down;
        this.snake_positions.unshift({
            x: this.snake_positions[0].x,
            y: this.snake_positions[0].y + 1
        })
        this.snake_positions.pop();
    }
    moveLeft() {
        this.current_direction = this.directions.Left;
        this.snake_positions.unshift({
            x: this.snake_positions[0].x - 1,
            y: this.snake_positions[0].y
        })
        this.snake_positions.pop();
    }
    moveRight() {
        this.current_direction = this.directions.Right;
        this.snake_positions.unshift({
            x: this.snake_positions[0].x + 1,
            y: this.snake_positions[0].y
        })
        this.snake_positions.pop();
    }

    
}
export default Snake