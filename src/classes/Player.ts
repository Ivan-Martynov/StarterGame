import * as PIXI from "pixi.js";
import { Constants } from "../helpers/Constants";
import { PadPosition } from "../utils/types";

export class Player extends PIXI.Sprite {
    private _score: number;

	private _prevY: number;
	private _data: PIXI.InteractionData;
	private _dragging: boolean = false;

	public scoreText: PIXI.Text;
    public padPosition: PadPosition;

    constructor(texture: PIXI.Texture, position: PadPosition) {
        super(texture);

        this.width = 20;
        this.height = 100;

        this._score = 0;

		this.scoreText = new PIXI.Text(this._score.toString(), new PIXI.TextStyle({
			fontWeight: "bold",
			fontSize: 32,
			fill: 0xffffff,
		}));

        this.padPosition = position;

        this.y = (Constants.ViewHeight - this.height) * 0.5;
		this.scoreText.y = 0;
        switch (position) {
            case PadPosition.LEFT:
                this.x = 0;
				this.scoreText.x = Constants.ViewWidth / 2 - this.scoreText.width * 2;
                break;
            case PadPosition.RIGHT:
                this.x = Constants.ViewWidth - this.width;
				this.scoreText.x = Constants.ViewWidth / 2 + this.scoreText.width;
                break;
            default:
                break;
        }

        this.interactive = true;

        this.on("pointerdown", this.onDragStart, this)
            .on("pointerup", this.onDragEnd, this)
            .on("pointerupoutside", this.onDragEnd, this)
            .on("pointermove", this.onDragMove, this);
    }

	updateScore(): void {
		this.scoreText.text = (++this._score).toString();
	}

	isWinner(): boolean {
		return this._score >= Constants.scoreToWin;
	}

    onDragStart(event: PIXI.InteractionEvent): void {
        this._data = event.data;
		this._prevY = this._data.getLocalPosition(this.parent).y;
		event.stopPropagation(); // avoid click event on the background
        this.alpha = 0.9;
        this._dragging = true;
    }

    onDragEnd(): void {
        this.alpha = 1;
        this._dragging = false;
		this._data.reset();
    }

    onDragMove(): void {
        if (this._dragging) {
            const y: number = this._data.getLocalPosition(this.parent).y;

			this.y = Math.min(Math.max(0, this.y + y - this._prevY), Constants.ViewHeight - this.height);
			this._prevY = y;
        }
    }
}
