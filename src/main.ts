import { GameApp } from "./app/GameApp";
import * as PIXI from "pixi.js";

// have to keep the app global
let _app: PIXI.Application;

function main(): void {
    _app = new PIXI.Application({
        width: Math.max(1, window.innerWidth),
        height: Math.max(1, window.innerHeight),
        resolution: devicePixelRatio,
        autoDensity: true,
    });

    document.body.replaceChild(_app.view, document.body.lastElementChild); // hack for parcel HMR

    window.addEventListener('resize', onResize);

    const gameApp = new GameApp(_app);
}

function onResize(): void {
    _app.renderer.resize(window.innerWidth, window.innerHeight);
}

main();