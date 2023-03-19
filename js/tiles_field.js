import { GRID_SIZE } from "./constants.js"
import { Tile  } from "./tile.js"

export class TilesField {
    constructor() {
        this.field = Array(GRID_SIZE).fill(0).map(_ => Array(GRID_SIZE).fill(0).map(_ => []))
        for (let i = 0; i < 2; ++i) this.#addTile()
        this.score = 0
        this.updateHTML()
    }

    destructor() {
        for (let x = 0; x < GRID_SIZE; ++x) {
            for (let y = 0; y < GRID_SIZE; ++y) {
                if (!this.field[x][y].length) continue
                this.field[x][y].forEach(tile => tile.HTML.tileDiv.remove())
            }
        }
    }

    updateHTML() {
        for (let x = 0; x < GRID_SIZE; ++x) {
            for (let y = 0; y < GRID_SIZE; ++y) {
                if (!this.field[x][y].length) continue
                this.field[x][y].forEach(tile => tile.updateHTML())
            }
        }
        document.querySelector('#score-span').textContent = this.score
    }

    move(dir) {
        let i = 0
        for (;; ++i) {
            let changesInIter = false
            for (let x = 0; x < GRID_SIZE; ++x) {
                for (let y = 0; y < GRID_SIZE; ++y) {
                    if (!this.field[x][y].length) continue
                    const [newX, newY] = this.#movedTilePos([x,y], dir)
                    if (x == newX && y == newY) continue
                    changesInIter = true
                    for (let tile of this.field[x][y]) {
                        tile.position = [newX, newY]
                        this.field[newX][newY].push(tile)
                    }
                    this.field[x][y] = []
                }
            }
            if (!changesInIter) break;
        }
        if (i == 0) return
        this.updateHTML()
        setTimeout(() => {
            this.#mergeTiles()
            if (!this.#addTile()) {
                this.#handleEnd()
            }
            this.updateHTML()
        }, 200)
    }

    #handleEnd() {
    }

    #movedTilePos(pos, dir) {
        const [x, y] = pos
        const [dirX, dirY] = dir
        const newX = this.#clamp(x+dirX)
        const newY = this.#clamp(y+dirY)
        if (this.field[newX][newY].length) {
            const tiles = this.field[x][y]
            const newPosTiles = this.field[newX][newY]
            if (tiles.length == newPosTiles.length && tiles[0].number == newPosTiles[0].number) return [newX, newY]
            return pos
        }
        return [newX, newY]
    }
    
    #mergeTiles() {
        for (let x = 0; x < GRID_SIZE; ++x) {
            for (let y = 0; y < GRID_SIZE; ++y) {
                if (!this.field[x][y].length) continue
                let representative = this.field[x][y][0]
                representative.number *= this.field[x][y].length
                if (this.field[x][y].length > 1) this.score += representative.number
                for (let i = 1; i < this.field[x][y].length; ++i) {
                    this.field[x][y][i].HTML.tileDiv.remove()
                }
                this.field[x][y] = [representative]
            }
        }
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

    #addTile() {
        let freeTiles = []
        for (let x = 0; x < GRID_SIZE; ++x) {
            for (let y = 0; y < GRID_SIZE; ++y) {
                if (!this.field[x][y].length) freeTiles.push([x, y])
            }
        }
        if (!freeTiles.length) return false
        const [x, y] = freeTiles[Math.floor(Math.random() * freeTiles.length)]
        let tile = new Tile(x, y)
        this.field[x][y].push(tile)
        document.querySelector('#tiles').appendChild(tile.HTML.tileDiv)
        return true
    }
}