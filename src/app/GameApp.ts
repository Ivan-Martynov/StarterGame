import * as PIXI from "pixi.js";
import { SceneManager } from "../managers/SceneManager";
import { MenuScene } from "../scenes/MenuScene";

export class GameApp {

    private _app: PIXI.Application;

    private _background: PIXI.Sprite;

    constructor(app: PIXI.Application) {
        this._app = app;

        this._background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this._background.tint = 0xff0099;
        this._background.width = 200;
        this._background.height = 200;
        this._background.interactive = true;
        this._background.on("pointerdown", () => this.changeBackgroundColor());
        this._app.stage.addChild(this._background);

        this.changeAppBackgroundColor();

        this.addScenes();

        //this._app.renderer.plugins.interaction.on("pointerdown", () => this.changeAppBackgroundColor());
    }

    addScenes(): void {
        SceneManager.createScene("menu", MenuScene);
        //SceneManager.switchToScene("menu");
    }

    onResize(): void {
        this._app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    changeBackgroundColor(): void {
        this._background.tint = PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]);
    }

    changeAppBackgroundColor(): void {
        this._app.renderer.backgroundColor = PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()]);
    }
}