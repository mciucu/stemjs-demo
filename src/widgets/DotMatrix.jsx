import {UI} from "UI";
import {StyleSet} from "Style";

const SIZE = 200;
const MARGIN = 1.3 + Math.random() / 2;

class DotMatrixStyleSet extends StyleSet {
    constructor() {
        super({
            updateOnResize: true
        });
        let squareSize;

        this.addBeforeUpdateListener(() => {
            squareSize = Math.min(window.innerHeight, window.innerWidth) / (MARGIN * SIZE);
        });

        this.update();

        this.dotRow = this.css({
            "line-height": 0,
            height: () => squareSize + "px",
        });

        this.dot = this.css({
            display: "inline-block",
            height: () => squareSize + "px",
            width: () => squareSize + "px",
        });
    }
}

let styleSet = new DotMatrixStyleSet();

function randomColor() {
    return "#" + ("000000" + Math.floor(Math.random() * 0xFFFFFF).toString(16)).substr(-6);
}

let updates = 0;

class Dot extends UI.Element {
    getPrimitiveTag() {
        return "span";
    }

    // getDOMAttributes() {
    //     let attr = super.getDOMAttributes();
    //
    //     attr.addClass(styleSet.dot);
    //     attr.setStyle("background-color", randomColor());
    //
    //     return attr;
    // }

    // applyDOMAttributes() {
    //     this.node.className = String(styleSet.dot);
    //     this.setStyle("background-color", randomColor());
    // }

    update() {
        updates++;
        this.setStyle("background-color", randomColor());
    }
}

class DotRow extends UI.Element {
    getDOMAttributes() {
        let attr = super.getDOMAttributes();

        attr.addClass(styleSet.dotRow);

        return attr;
    }

    renderHTML() {
        let ans = new Array(SIZE);
        for (let i = 0; i < SIZE; i += 1) {
            ans[i] = <Dot className={styleSet.dot} style={{backgroundColor: randomColor()}} />;
        }
        return ans;
    }

    update() {
        for (let i = 0; i < this.children.length; i += Math.floor(Math.random() * 50 + 1)) {
            this.children[i].update();
        }
    }
}

class DotMatrix extends UI.Element {
    renderHTML() {
        let ans = [];
        for (let i = 0; i < SIZE; i++) {
            ans.push(UI.createElement(DotRow, {}));
        }
        return ans;
    }

    update() {
        for (let ch of this.children) {
            ch.update();
        }
    }
}

export {DotMatrix};
