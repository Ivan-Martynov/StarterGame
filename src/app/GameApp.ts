import * as PIXI from "pixi.js";

export class GameApp {

    private _app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this._app = app;

        this.changeAppBackgroundColor();

        this._app.renderer.plugins.interaction.on("pointerdown", () => this.changeAppBackgroundColor());
    }

    onResize(): void {
        this._app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    changeAppBackgroundColor(): void {
        this._app.renderer.backgroundColor = PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]);
    }
}