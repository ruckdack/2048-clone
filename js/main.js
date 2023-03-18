import { TilesField } from "./tiles_field.js";

let tilesField = new TilesField();

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp' || event.key == 'w') {
        tilesField.move([0, -1])
    } else if (event.key == 'ArrowLeft' || event.key == 'a') {
        tilesField.move([-1, 0])
    } else if (event.key == 'ArrowDown' || event.key == 's') {
        tilesField.move([0, 1])
    } else if (event.key == 'ArrowRight' || event.key == 'd') {
        tilesField.move([1, 0])
    }
})