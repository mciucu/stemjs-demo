import {UI} from "UI";

class MSweeperButton extends UI.Button {
    getDOMAttributes() {
        let attr = super.getDOMAttributes();
        let style = {
            "width": "70px",
            "max-width": "70px",
            "height": "30px",
            "max-height": "30px",
            "white-space": "nowrap",
            "float": "left",
            "display": "inline-block",
            "border": "1px solid red",
        };

        for (var key in style) {
            attr.setStyle(key, style[key]);
        }

        return attr;
    }

    onMount() {
        console.log("onMount in button!");
        this.addClickListener(() => {
            if (!this.options.revealed && this.options.isBomb) {
                //die motherfucker die
                this.options.game.dispatch("clickedBomb", this);
            }
            this.reveal();
        });
    }

    bombsNear() {
        let ret = 0;
        for (let neighbour of this.options.getNeighbours()) {
            if (neighbour.options.isBomb) {
                ret += 1;
            }
        }
        return ret;
    }

    reveal() {
        if (this.options.revealed) {
            return;
        }
        this.options.revealed = true;

        if (this.options.isBomb) {
            this.setFaIcon("bomb");
        } else {
            let near = this.bombsNear();
            if (near == 0) {
                this.setFaIcon("circle-thin");
            } else {
                this.setFaIcon("");
                this.setLabel(near.toString());
            }
        }

        if (this.bombsNear() == 0) {
            for (let neighbour of this.options.getNeighbours()) {
                neighbour.reveal();
            }
        }
    }
}

class MSweeperButtonMatrix extends UI.Element {
    getDOMAttributes() {
        let attr = super.getDOMAttributes();

        attr.setStyle("max-width", 72 * this.options.cols + "px");

        return attr;
    }

    getNeighbours(i, j) {
        let ret = [];
        for (let di = -1; di <= 1; di += 1) {
            for (let dj = -1; dj <= 1; dj += 1) {
                let ii = i + di;
                let jj = j + dj;

                if (0 <= ii && ii < this.options.rows &&
                    0 <= jj && jj < this.options.cols) {

                    ret.push(this.at(ii, jj));
                }
            }
        }
        return ret;
    }

    makeMatrix() {
        let matrix = [];
        for (let i = 0; i < this.options.rows; i += 1) {
            let row = [];
            for (let j = 0; j < this.options.cols; j += 1) {
                let isBomb = Math.random() < 0.2;
                let bomb = (<MSweeperButton faIcon="question"
                                            ref={i + "." + j}
                                            isBomb={isBomb}
                                            game={this.options.game} />);

                bomb.options.getNeighbours = () => {
                    return this.getNeighbours(i, j);
                };

                row.push(bomb);
            }

            matrix.push(row);
        }
        return matrix;
    }

    renderHTML() {
        console.log("in renderHTML of Matrix");
        return this.makeMatrix();
    }

    revealAll() {
        for (let cell of this.children) {
            cell.reveal();
        }
    }

    at(i, j) {
        return this[i + "." + j];
    }
}

class MSweeperGame extends UI.Element {
    renderHTML() {
        let restartButton = <UI.Button ref="restartButton" label="Restart"/>;

        return [
            <MSweeperButtonMatrix ref="matrix"
                                  game={this}
                                  rows={this.options.rows}
                                  cols={this.options.cols} />,

            <div>
                {restartButton}
            </div>];
    }


    onMount() {
        this.addListener("clickedBomb", () => {
            console.log("DEAD!");
            this.matrix.revealAll();
        });

        this.restartButton.addClickListener(() => {
            this.matrix.redraw();
        });
    }

}

export {MSweeperGame};
