import {UI} from "UI";
import {DOMAttributes, ATTRIBUTE_NAMES_MAP} from "DOMAttributes";
import {DotMatrix} from "widgets/DotMatrix";
import {ButtonMatrix, DemoTabArea} from "widgets/ButtonMatrix";

let start = performance.now();
let dotMatrix = DotMatrix.create(document.body);

console.log("Duration: ", performance.now() - start);
// setInterval(() => {
//     dotMatrix.update();
// }, 10);

start = performance.now();

let options = {
    className: "ceva nou",
    style: {
        backgroundColor: "red",
        width: "10px",
        height: "10px",
    },
};

const ITER = 1e6 | 0;

for (let i = 0; i < ITER; i++) {
    let attr = UI.T("Ceva fodfkgjh dfgd gdf g df gd fg s fgsg ");
}

console.log("Duration2: ", performance.now() - start);

// DemoTabArea.create(document.body);
//
// let buttonMatrix = ButtonMatrix.create(document.body);
