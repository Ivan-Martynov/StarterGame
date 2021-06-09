import { GameApp } from "./app/GameApp";
import * as PIXI from "pixi.js";

// have to keep the app global
let _app: PIXI.Application;

const WIDTH = 720;
const HEIGHT = 1280;

function main(): void {
    _app = new PIXI.Application({
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]),
        resolution: devicePixelRatio,
        autoDensity: true,
    });

    document.querySelector(".container").appendChild(_app.view);

    const gameApp = new GameApp(_app);

    const updateLayout = (): void => { gameApp.onResize(); }
    
    window.addEventListener("resize", updateLayout);

    updateLayout();
}

main();
