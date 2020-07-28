import helpers from "../modules/helpers.js";
import ParentClass from "./ParentClass.js"

class Game extends ParentClass{

    constructor({speed}) {
        super()
        this.speed = speed;
        this.first_name = 'John';
        this.last_name = 'Doe'
    }

    get fullName() {
        return `${this.first_name} ${this.last_name}`
    }

    test() {
        console.log(this.parentFunction())
        console.log('test')
        Game.staticFunction()
    }

    static staticFunction() {
        console.log('static fn')
    }

}
export default Game