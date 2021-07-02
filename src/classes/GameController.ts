import * as PIXI from "pixi.js";
import { SceneManager } from "../managers/SceneManager";
import { MenuScene } from "../scenes/MenuScene";

export class GameController {
	private static _instance: GameController;

    public app: PIXI.Application;

    private _gameContainer: PIXI.Container;

    constructor(app: PIXI.Application) {
		GameController._instance = this;

        this.app = app;

		this.reset();
	}

	reset(): void {
		this.app.stage.removeChildren();

        this._gameContainer = new PIXI.Container();
        this.app.stage.addChild(this._gameContainer);

		SceneManager.getInstance();

		this._startNewGame();
	}

	private _startNewGame(): void {
		SceneManager.switchToScene(new MenuScene());
	}

	static getInstance(): GameController {
		return this._instance;
	}

    onResize(isPortrait: boolean, width: number, height: number, scale: number): void {
        this._gameContainer.scale.set(scale);

		SceneManager.getInstance().resize(isPortrait, width, height, scale);
    }

    update(dt: number): void {
		SceneManager.getInstance().update(dt);
    }
}
