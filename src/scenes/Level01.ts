import * as PIXI from "pixi.js";
import { Sprite, Texture } from "pixi.js";
import { Constants } from "../helpers/Constants";
import { Ball } from "../classes/Ball";
import { Player } from "../classes/Player";
import { Scene } from "./Scene";
import { GameBoard } from "../classes/GameBoard";
import { PadPosition } from "../utils/types";

export class Level01 extends Scene {
	private _background: Sprite;
	private _board: GameBoard;
	private _leftPad: Player;
	private _rightPad: Player;
	private _ball: Ball;
	private _started: boolean;

	constructor() {
		super();
		this.init();
	}

	init(): void {
		this._started = false;

		this._background = new Sprite(Texture.WHITE);
		this._background.tint = 0x555555;
		this._background.alpha = 0.8;
		this._background.width = Constants.ViewWidth;
		this._background.height = Constants.ViewHeight;
		this._background.anchor.set(0.5);
		this.addChild(this._background);

		this._board = new GameBoard();
		this._board.interactive = true;
		this._board.on('pointerdown', this.startBallMovement, this);
		this.addChild(this._board);

		this._leftPad = new Player(Texture.WHITE, PadPosition.Left);
		this._board.addChild(this._leftPad);

		this._rightPad = new Player(Texture.WHITE, PadPosition.Right);
		this._board.addChild(this._rightPad);

		this._ball = new Ball(Texture.WHITE);
		this._board.addChild(this._ball);
	}

	start(): void {
		super.start();
		this._paused = false;
	}

	startBallMovement(): void {
		this._started = true;
	}

	stop(): void {
		super.stop();
	}

	resize(isPortrait: boolean, width: number, height: number, scale: number): void {
		super.resize(isPortrait, width, height, scale);

		const w = this.bottomRight.x - this.topLeft.x;
		const h = this.bottomRight.y - this.topLeft.y;
		this._background.width = w;
		this._background.height = h;
		const middleX = w / 2;
		const middleY = h / 2;
		this._background.position.set(middleX, middleY);

		this._board.position.set(middleX - this._board.width / 2, middleY - this._board.height / 2);
	}

	update(dt: number): void {
		if (!this._started) {
			return;
		}

		this._ball.move(dt);
		this.checkCollisions();
	}

	checkCollisions(): void {
		this._ball.collisionWithWalls();

		if (this._ball.collisionWithPads(this._leftPad, this._rightPad)) {
			this._started = false;
		}
	}
}