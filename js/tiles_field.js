import { GRID_SIZE } from "./constants.js"
import { Tile  } from "./tile.js"

export class TilesField {
    constructor() {
        this.field = Array(GRID_SIZE).fill(0).map(_ => Array(GRID_SIZE).fill(null))
        let tileCounter = 0
        while (tileCounter < 2) {
            let tile = new Tile()
            const [x, y] = tile.position
            if (this.field[x][y]) continue
            this.field[x][y] = tile
            tileCounter++
            document.querySelector('#tiles').appendChild(tile.HTML.tileDiv)
        }
    }

    updateHTML() {
        for (let x = 0; x < GRID_SIZE; ++x) {
            for (let y = 0; y < GRID_SIZE; ++y) {
                if (!this.field[x][y]) continue
                this.field[x][y].updateHTML()
            }
        }
    }

    move(dir) {
        for (let i = 0; i < GRID_SIZE+1; ++i) {
            for (let x = 0; x < GRID_SIZE; ++x) {
                for (let y = 0; y < GRID_SIZE; ++y) {
                    if (!this.field[x][y]) continue
                    const [newX, newY] = this.#movedTilePos([x,y], dir)
                    if (x == newX && y == newY) continue
                    this.field[newX][newY] = this.field[x][y]
                    this.field[newX][newY].position = [newX, newY]
                    this.field[x][y] = null
                }
            }
        }
        this.updateHTML()
    }

    #movedTilePos(pos, dir) {
        const [x, y] = pos
        const [dirX, dirY] = dir
        const newX = this.#clamp(x+dirX)
        const newY = this.#clamp(y+dirY)
        if (this.field[newX][newY]) {
            if (this.field[newX][newY].number == this.field[x][y].number) return [newX, newY]
            return pos
        }
        return [newX, newY]
    }
    
    #mergeTiles(pos, dir) {
        
    }

    #clamp(num) {
        const min = 0
        const max = GRID_SIZE-1
        return num <= min 
            ? min 
            : num >= max 
                ? max 
                : num
    }
}