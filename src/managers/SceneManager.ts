import { Scene } from "../scenes/Scene";

export class SceneManager {
    private static _scenes = new Map<string, Scene>();
    private static _currentScene: Scene;

    static createScene(sceneId: string, TScene: new() => Scene = Scene): Scene {
        if (!this._scenes.has(sceneId)) {
            this._scenes.set(sceneId, new TScene());
        }
        return this._scenes[sceneId];
    }

    static switchToScene(sceneId: string): boolean {
        if (this._scenes.has(sceneId)) {
            if (this._currentScene) {
                this._currentScene.pause();
            }

            this._currentScene = this._scenes[sceneId];
            this._currentScene.resume();

            return true;
        }

        return false;
    }
}