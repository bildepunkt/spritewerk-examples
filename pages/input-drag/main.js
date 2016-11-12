import Camera from "spritewerk/src/Camera";
import Group from "spritewerk/src/Group";
import Scene from "spritewerk/src/Scene";
import Rectangle from "spritewerk/src/shapes/Rectangle";
import Ticker from "spritewerk/src/Ticker";
import Viewport from "spritewerk/src/Viewport";
// input
import Input from "spritewerk/src/input/Input";
import mouseInput from "spritewerk/src/input/mouseInput";

(() => {
    const size = 512;
    let count = 9;

    let viewport = new Viewport(size, size, {
        parent: document.querySelector("#spritewerk"),
        fitToWindow: false
    });
    let camera = new Camera(0, 0, size, size);
    let scene = new Scene(viewport.canvas, camera, { debug: true });
    let ticker = new Ticker(viewport.screen);
    let grp = new Group();
    
    new Input(viewport.screen, [mouseInput], grp);

    while (--count) {
        let rect = new Rectangle(64 * (count - 1), 64 * (count - 1));

        if (count % 2 === 0) {
            rect.draggable = true;
            rect.fill = "#c4c";
        } else {
            rect.fill = "#4c4";
        }

        grp.collection.add(rect);
    }

    ticker.onTick = ()=> {
        scene.clear("#ccc");
        scene.startRender(grp);
    };
}).call(this);
