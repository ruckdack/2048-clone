import { GRID_SIZE, DIR } from "./constants.js"
import { Tile  } from "./tile.js"

export class TilesField {
    constructor() {
        this.field =  Array(GRID_SIZE).fill(0).map(_ => Array(GRID_SIZE))
        for (var i = 0; i < 2; ++i) {
            var tile = new Tile()
            const [x, y] = tile.position
            this.field[x][y] = tile
            document.querySelector('#tiles').appendChild(tile.HTML.tileDiv)
        }
    }

    move(dir) {
        this.#moveRight()
    }

    #moveRight() {
        console.log('tralala')
    }

}