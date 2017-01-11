import {UI} from "UI";
import {TabArea, MinimalistTabAreaStyle} from "tabs/TabArea";
import {SectionDivider} from "SectionDivider";

class ButtonMatrix extends UI.Element {
    render() {
        let buttons = [];
        for (let i = 0; i < 100; i++) {
            buttons.push(
                <UI.Button>{"Btn" + i}</UI.Button>
            );
        }
        return buttons;
    }
}

class DemoTabArea extends UI.Element {
    render() {
        return [<TabArea styleSet={MinimalistTabAreaStyle.getInstance()}>
            <UI.Panel title="Tab1">
                <h2>Tab 1 content</h2>
                <h2>Some more text</h2>
            </UI.Panel>
            <UI.Panel title="Tab2" active>
                <h2>Tab 2 content</h2>
            </UI.Panel>
            <UI.Panel title="Tab3" >
                <h2>Tab 3 content</h2>
            </UI.Panel>
        </TabArea>,
        <SectionDivider style={{width:"100%", height: "200px"}} orientation={UI.Orientation.HORIZONTAL}>
            <UI.Panel style={{display: "inline-block", width: "30%"}} >
                <h3>This is a text on the left</h3>
            </UI.Panel>
            <UI.Panel style={{display: "inline-block", width: "70%"}}>
                <h3>Sdfgedfjkndkgbhdkfjnkdfv dfdfgbd d fgd</h3>
            </UI.Panel>
        </SectionDivider>
        ]
    }
}

export {ButtonMatrix, DemoTabArea};
