import * as PIXI from "pixi.js";
import { SceneManager } from "../managers/SceneManager";
import { EndScene } from "../scenes/EndScene";
import { Level01 } from "../scenes/Level01";
import { MenuScene } from "../scenes/MenuScene";

export class GameApp {
    private _app: PIXI.Application;

    private _gameContainer: PIXI.Container;
    private _background: PIXI.Sprite;

    constructor(app: PIXI.Application) {
        this._app = app;

        this._gameContainer = new PIXI.Container();
        this._app.stage.addChild(this._gameContainer);

        this._background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this._background.tint = 0xff0099;
        this._background.width = 200;
        this._background.height = 200;
        this._background.interactive = true;
        this._background.on("pointerdown", () => {
            this._background.tint = Math.random() * 0xffffff;
        });
        //this._app.stage.addChild(this._background);
        this._gameContainer.addChild(this._background);

        this.createScenes();

        const scene = SceneManager.getScene("menu");
        if (scene) {
            scene.init();
            SceneManager.start("menu", this._app);
        }

        //this._app.renderer.plugins.interaction.on("pointerdown", () => this.changeAppBackgroundColor());
        //this._app.renderer.plugins.interaction.on("pointerdown", () => {
        //    SceneManager.switchToScene("end");
        //    console.log("switching");
        //});
    }

    createScenes(): void {
        SceneManager.add("menu", new MenuScene());
        SceneManager.add("end", new EndScene());
        SceneManager.add("game", new Level01());
        this._app.stage.addChild(SceneManager.getScene("menu"));
        this._app.stage.addChild(SceneManager.getScene("end"));
        this._app.stage.addChild(SceneManager.getScene("game"));
    }

    onResize(
        isPortrait: boolean,
        width: number,
        height: number,
        scale: number
    ): void {
        //this._app.renderer.resize(width, height);
        this._gameContainer.scale.set(scale);
        //this._background.width *= scale;
        //this._background.height *= scale;
        //this._app.stage.children.forEach(child => {
        //	child.scale.set(scale);
        //});
        //SceneManager.getScene("menu").scale.set(scale);
        SceneManager.getScene("menu").resize(isPortrait, width, height, scale);
        SceneManager.getScene("game").resize(isPortrait, width, height, scale);
    }

    update(dt: number): void {
        SceneManager.getScene("game").update(dt);
    }
}
