import * as PIXI from "pixi.js";

export class GameApp {

    private _app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this._app = app;
    }

    onResize(): void {
        this._app.renderer.resize(window.innerWidth, window.innerHeight);
    }
}