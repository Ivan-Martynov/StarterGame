import * as PIXI from "pixi.js";
import { Sprite, Texture } from "pixi.js";
import { Constants } from "../helpers/Constants";
import { PadPosition } from "../utils/types";

export class Player extends Sprite {
    score: number;
    padPosition: PadPosition;
	private _prevY: number;

    constructor(texture: Texture, position: PadPosition) {
        super(texture);
        this.width = 20;
        this.height = 100;
        this.y = (Constants.ViewHeight - this.height) * 0.5;

        this.score = 0;

        this.padPosition = position;

        switch (position) {
            case PadPosition.Left:
                this.x = 0;
                break;
            case PadPosition.Right:
                this.x = Constants.ViewWidth - this.width;
                break;
            default:
                break;
        }

        this.interactive = true;
        this.buttonMode = true;

        this.on("pointerdown", this.onDragStart, this)
            .on("pointerup", this.onDragEnd, this)
            .on("pointerupoutside", this.onDragEnd, this)
            .on("pointermove", this.onDragMove, this);
    }

    onDragStart(event): void {
        this.data = event.data;
		this._prevY = this.data.getLocalPosition(this.parent).y;
        this.alpha = 0.9;
        this.dragging = true;
    }

    onDragEnd(): void {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove(): void {
        if (this.dragging) {
            const y: number = this.data.getLocalPosition(this.parent).y;

			this.y = Math.min(Math.max(0, this.y + y - this._prevY), Constants.ViewHeight - this.height);
			this._prevY = y;
        }
    }
}
