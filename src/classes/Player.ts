import { Sprite, Texture } from "pixi.js";
import { Constants } from "../helpers/Constants";
import { PadPosition } from "../utils/types";

export class Player extends Sprite {

	score: number;
	padPosition: PadPosition;

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
		this.on('pointerdown', this.onDragStart)
			.on('pointerup', this.onDragEnd)
			.on('pointerupoutside', this.onDragEnd)
			.on('pointermove', this.onDragMove);
	}

	onDragStart(event): void {
		this.data = event.data;
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
			const upperBound = Constants.ViewHeight - this.height;

			if (y <= 0) {
				this.y = 0;
			} else if (y >= upperBound) {
				this.y = upperBound;
			} else {
				this.y = y;
			}
		}
	}
}