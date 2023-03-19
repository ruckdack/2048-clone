import { TILE_SIZE, GRID_SIZE } from "./constants.js"

export class Tile {
    constructor(x, y) {
        this.position = [x, y]
        this.number = 2
        this.HTML = {}
        this.HTML.tileDiv = document.createElement('div')
        this.HTML.span = document.createElement('span')
        this.HTML.tileDiv.appendChild(this.HTML.span)
        this.HTML.tileDiv.setAttribute('class', 'tile tile-like')
        this.updateHTML()
    }

    updateHTML() {
        this.#updateHTMLPos()
        this.#updateHTMLText()
    }

    #updateHTMLPos() {
        const [top, left] = this.#calcTopLeft()
        this.HTML.tileDiv.style.top = `${top}px`
        this.HTML.tileDiv.style.left = `${left}px`
    }

    #updateHTMLText() {
        this.HTML.span.innerText = `${this.number}`
    }

    
    #calcTopLeft () {
        const gap = TILE_SIZE / 10
        const [x, y] = this.position
        const top = y * (TILE_SIZE + gap) 
        const left = x * (TILE_SIZE + gap) 
        return [top, left]
    }
}