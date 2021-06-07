import * as PIXI from "pixi.js";

export class GameApp {

    private _app: PIXI.Application;

    constructor(parent: HTMLElement, width: number, height: number) {
        const randomColor = PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]);

        this._app = new PIXI.Application({ width, height, backgroundColor: randomColor });

        parent.replaceChild(this._app.view, parent.lastElementChild); // hack for parcel HMR
    }
}