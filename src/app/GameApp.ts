import * as PIXI from "pixi.js";
import { ColorHelper } from "../utils/colors/ColorHelper";

export class GameApp {

    private _app: PIXI.Application;

    private _background: PIXI.Graphics;

    constructor(parent: HTMLElement, width: number, height: number) {
        this._app = new PIXI.Application({ width, height });
        parent.replaceChild(this._app.view, parent.lastElementChild); // hack for parcel HMR

        const randomColor = ColorHelper.generateRandomColor();

        this._background = new PIXI.Graphics()
            .beginFill(randomColor)
            .drawRect(0, 0, width, height)
            .endFill();
        this._app.stage.addChild(this._background);
    }
}