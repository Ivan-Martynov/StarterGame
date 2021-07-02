import { GameController } from "../classes/GameController";
import { IScene } from "../classes/IScene";

export class SceneManager {
	private static _instance: SceneManager;
	private _currentScene: IScene;

	public static getInstance(): SceneManager {
		if (this._instance == null)
		{
			this._instance = new SceneManager();
		}

		return this._instance;
	}

	public update(dt: number): void {
		if (this._currentScene != null) {
			this._currentScene.update(dt);
		}
	}

	public resize(isPortrait: boolean, width: number, height: number, scale: number): void {
		if (this._currentScene != null) {
			this._currentScene.resize(isPortrait, width, height, scale);
		}
	}

	public static switchToScene(scene: IScene): void {
		if (this._instance._currentScene != null) {
			this._instance._currentScene.unload();
			
			GameController.getInstance().app.stage.removeChild(this._instance._currentScene);

			this._instance._currentScene.destroy();
		}

		scene.load();

		GameController.getInstance().app.stage.addChild(scene);

		this._instance._currentScene = scene;
	}
}