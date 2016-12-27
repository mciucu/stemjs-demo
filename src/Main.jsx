import {UI} from "UIBase";
import {DotMatrix} from "widgets/DotMatrix";
import {ButtonMatrix, DemoTabArea} from "widgets/ButtonMatrix";

// let dotMatrix = DotMatrix.create(document.body);
class DemoElement extends UI.Element {
    extraNodeAttributes(attr) {
        attr.setStyle("margin", "10px");
    }

    render() {
        return [
            <h1>Demo element</h1>,
            <ButtonMatrix />,
            <DemoTabArea />
        ]
    }
}

let demoElement = DemoElement.create(document.body);

console.log("Done!!!");