import * as PIXI from "pixi.js";

export class Scene extends PIXI.Container {

    private _paused: boolean;

    constructor() {
        super();

        this._paused = false;
    }

    pause(): void {
        this._paused = true;
    }

    resume(): void {
        this._paused = false;
    }

    isPaused(): boolean {
        return this._paused;
    }
}