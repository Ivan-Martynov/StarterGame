import { Point, Sprite, Texture } from "pixi.js";
import { Constants } from "../helpers/Constants";
import { isPortrait } from "../helpers/WindowHelper";
import { PadPosition } from "../utils/types";
import { Player } from "./Player";

export class Ball extends Sprite {

	radius: number;
	velocity: Point;
	private _speedUp: number;

	constructor(texture?: Texture) {
		super(texture);

		this.radius = 10;
		this.width = this.radius + this.radius;
		this.height = this.radius + this.radius;
		this.anchor.set(0.5);

		this.reset();
	}

	reset(): void {
		this.position.set(Constants.ViewWidth / 2, Constants.ViewHeight / 2);
		this.velocity = new Point(this.randomSpeed(3, 5), this.randomSpeed(3, 5));
		this._speedUp = 0.75;
	}

	private randomSpeed(minValue: number, maxValue: number): number {
		const isPositive = Math.random() > 0.5;
		const randomValue = minValue + Math.random() * (maxValue - minValue);
		return isPositive ? randomValue : -randomValue;
	}

	move(dt: number): void {
		const x = this.x + this.velocity.x;
		const y = this.y + this.velocity.y;

		this.x = x;
		this.y = y;
	}

	speedUp(): void {
		if (this.velocity.x > 0) {
			this.velocity.x += this._speedUp;
		} else {
			this.velocity.x -= this._speedUp;
		}

		if (this.velocity.y > 0) {
			this.velocity.y += this._speedUp;
		} else {
			this.velocity.y -= this._speedUp;
		}
	}

	collisionWithWalls(upperBound: number): void {
		if (this.y <= this.radius) {
			this.velocity.y = -this.velocity.y;
		} else if (this.y + this.radius >= upperBound) {
			this.velocity.y = -this.velocity.y;
		}
	}

	collisionWithVerticalPad(pad: Player): boolean {
		let result: boolean;

		if (pad.padPosition === PadPosition.Left) {
			result = this.x - this.radius <= pad.x + pad.width;
		} else {
			result = this.x + this.radius >= pad.x;
		}

		if (result) {
			if (this.y >= pad.y && this.y <= pad.y + pad.height) {
				this.velocity.x = -this.velocity.x;
				this.speedUp();
				return false;
			} else {
				this.reset();
			}
		}

		return result;
	}

	collisionWithPads(leftPad: Player, rightPad: Player): boolean {
		if (this.collisionWithVerticalPad(leftPad)) {
			rightPad.score++;
			return true;
		} else if (this.collisionWithVerticalPad(rightPad)) {
			leftPad.score++;
			return true;
		}

		return false;
	}
}