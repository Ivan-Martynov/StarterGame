import { Howl } from "howler";
import { Point, Sprite, Texture } from "pixi.js";
import { Constants } from "../helpers/Constants";
import { PadPosition } from "../utils/types";
import { Player } from "./Player";

import bounceSound from "../assets/sounds/bounce.mp3";

export class Ball extends Sprite {
	private _radius: number;
	private _velocity: Point;
	private _speedUp: number;

	private _bounceSound: Howl;

	constructor(texture?: Texture) {
		super(texture);

		this._radius = 10;
		this.width = this._radius + this._radius;
		this.height = this._radius + this._radius;
		this.anchor.set(0.5);

		this._bounceSound = new Howl({ src: bounceSound });

		this.reset();
	}

	reset(): void {
		this.position.set(Constants.ViewWidth / 2, Constants.ViewHeight / 2);
		this._velocity = new Point(this.randomSpeed(3, 5), this.randomSpeed(3, 5));
		this._speedUp = 0.75;
	}

	private randomSpeed(minValue: number, maxValue: number): number {
		const isPositive = Math.random() > 0.5;
		const randomValue = minValue + Math.random() * (maxValue - minValue);
		return isPositive ? randomValue : -randomValue;
	}

	move(dt: number): void {
		const x = this.x + this._velocity.x;
		const y = this.y + this._velocity.y;

		this.x = x;
		this.y = y;
	}

	speedUp(): void {
		if (this._velocity.x > 0) {
			this._velocity.x += this._speedUp;
		} else {
			this._velocity.x -= this._speedUp;
		}

		if (this._velocity.y > 0) {
			this._velocity.y += this._speedUp;
		} else {
			this._velocity.y -= this._speedUp;
		}
	}

	collisionWithFloorAndCeiling(): void {
		if (this.y <= this._radius) {
			this._velocity.y = -this._velocity.y;
		} else if (this.y + this._radius >= Constants.ViewHeight) {
			this._velocity.y = -this._velocity.y;
		}
	}

	verticalPadMissedBall(pad: Player): boolean {
		let result: boolean;

		if (pad.padPosition === PadPosition.LEFT) {
			result = this.x - this._radius <= pad.x + pad.width;
		} else {
			result = this.x + this._radius >= pad.x;
		}

		if (result) {
			if (this.y >= pad.y && this.y <= pad.y + pad.height) {
				this._ballReflectsFromPad();
				return false;
			} else {
				this.reset();
			}
		}

		return result;
	}

	private _ballReflectsFromPad(): void {
		this._velocity.x = -this._velocity.x;

		this._bounceSound.play();

		this.speedUp();
	}

	passedPad(leftPad: Player, rightPad: Player): boolean {
		if (this.verticalPadMissedBall(leftPad)) {
			rightPad.updateScore();
			return true;
		} else if (this.verticalPadMissedBall(rightPad)) {
			leftPad.updateScore();
			return true;
		}

		return false;
	}
}