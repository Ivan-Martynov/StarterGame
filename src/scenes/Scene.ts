import { Container, Point } from "pixi.js";
import { IScene } from "./IScene";

export abstract class Scene extends Container implements IScene {
    protected _paused: boolean;

    private _originTopLeft: Point;
    private _originBottomRight: Point;
    protected topLeft: Point;
    protected bottomRight: Point;

    constructor() {
        super();

        this._paused = true;
        this.visible = false;

        this._originTopLeft = new Point();
        this._originBottomRight = new Point();

        this.topLeft = new Point();
        this.bottomRight = new Point();
    }

    init(): void {
        throw new Error("Method not implemented.");
    }

    start(): void {
        this.visible = true;
    }

    stop(): void {
        this.visible = false;
    }

    update(_dt: number): void {
        throw new Error("Method not implemented.");
    }

    resize(
        isPortrait: boolean,
        width: number,
        height: number,
        scale: number
    ): void {
        this.scale.set(scale);

        this._originTopLeft.set(0, 0);
        this._originBottomRight.set(width, height);

        this.toLocal(this._originTopLeft, null, this.topLeft, false);
        this.toLocal(this._originBottomRight, null, this.bottomRight, false);
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
