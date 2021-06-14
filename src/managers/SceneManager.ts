import { Application } from "pixi.js";
import { IScene } from "../scenes/IScene";

export class SceneManager {
    private static _currentSceneName: string;
    private static _currentScene: IScene;
    private static _scenes = new Map<string, IScene>();

    static add(sceneName: string, scene: IScene): void {
        if (!sceneName || this.contains(sceneName)) {
            return;
        }

        this._scenes[sceneName] = scene;
    }

    static getScene(sceneName: string): IScene {
        if (!this.contains(sceneName)) {
            return null;
        }

        return this._scenes[sceneName];
    }

    static start(sceneName: string, _app: Application): void {
        if (!this.contains(sceneName)) {
            return;
        }

        this._currentSceneName === sceneName;
        this._currentScene = this._scenes[sceneName];
        this._scenes[sceneName].start();
    }

    static switchToScene(sceneName: string): void {
        if (!this.contains(sceneName) || sceneName === this._currentSceneName) {
            return;
        }

        if (this._currentScene) {
            this._currentScene.stop();
        }

        this._currentSceneName = sceneName;
        this._currentScene = this._scenes[sceneName];

        //this._currentScene.init();
        this._currentScene.start();
    }

    static contains(sceneName: string): boolean {
        return sceneName in this._scenes;
    }
}
