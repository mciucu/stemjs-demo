import {UI} from "UI";
import {StyleSet} from "Style";
import {styleRule} from "decorators/Style";

const SIZE = 200;
const MARGIN = 1.5;

class DotMatrixStyleSet extends StyleSet {
    @styleRule
    dotRow = {
        lineHeight: 0,
        height: () => this.squareSize + "px",
    };

    @styleRule
    dot = {
        display: "inline-block",
        height: () => this.squareSize + "px",
        width: () => this.squareSize + "px",
    };

    constructor() {
        super({
            updateOnResize: true
        });
        this.addBeforeUpdateListener(() => {
            this.squareSize = Math.min(window.innerHeight, window.innerWidth) / (MARGIN * SIZE);
        });
    }
}

let styleSet = new DotMatrixStyleSet();

function randomColor() {
    return "#" + ("000000" + Math.floor(Math.random() * 0xFFFFFF).toString(16)).substr(-6);
}

let updates = 0;

class Dot extends UI.Primitive("span") {
    // extraNodeAttributes(attr) {
    //     attr.clasName = styleSet.dot;
    //     attr.setStyle("backgroundColor", randomColor());
    // }

    // Optimize to a bare minimum this class, as lean as possible
    // applyNodeAttributes() {
    //     this.node.className = String(styleSet.dot);
    //     this.node.style.backgroundColor = this.options.style.backgroundColor;
    // }
    //
    // addListenersFromOptions() {}

    update() {
        updates++;
        this.setStyle("background-color", randomColor());
    }
}

class DotRow extends UI.Element {
    extraNodeAttributes(attr) {
        attr.addClass(styleSet.dotRow);
    }

    render() {
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
    render() {
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
