import { TilesField } from "./tiles_field.js";

var tilesField = new TilesField();

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight' || event.key == 'd') {
        tilesField.move()
    }
})