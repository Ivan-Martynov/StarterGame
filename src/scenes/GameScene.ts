import * as PIXI from "pixi.js";
import { SceneBase } from "../classes/SceneBase";
import { Constants } from "../helpers/Constants";
import { Ball } from "../classes/Ball";
import { Player } from "../classes/Player";
import { GameBoard } from "../classes/GameBoard";
import { PadPosition, SolarizedColor } from "../utils/types";
import { SceneManager } from "../managers/SceneManager";
import { EndScene } from "./EndScene";
import ball_image from "../assets/images/game_objects/ball.png";

export class GameScene extends SceneBase {
	private _background: PIXI.Sprite;
	private _board: GameBoard;
	private _leftPad: Player;
	private _rightPad: Player;
	private _ball: Ball;
	private _started: boolean;

	constructor() {
		super();

		this._resetLevel();
	}

	private _resetLevel(): void {
		this._started = false;

		this._background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this._background.tint = SolarizedColor.BASE01;
		this._background.alpha = 0.8;
		this._background.width = Constants.ViewWidth;
		this._background.height = Constants.ViewHeight;
		this._background.anchor.set(0.5);
		this.addChild(this._background);

		this._board = new GameBoard();
		this._board.interactive = true;
		this.addChild(this._board);

		this._leftPad = this._addPlayer(PadPosition.LEFT);
		this._rightPad = this._addPlayer(PadPosition.RIGHT);

		this._ball = new Ball(PIXI.Texture.from(ball_image));
		this._ball.interactive = true;
		this._board.on('pointerdown', this._startBallMovement, this);
		this._board.addChild(this._ball);
	}

	private _addPlayer(position: PadPosition): Player {
		const player = new Player(PIXI.Texture.WHITE, position);
		this._board.addChild(player);
		this._board.addChild(player.scoreText);
		return player;
	}

	private _startBallMovement(): void {
		this._started = true;
	}

	public resize(isPortrait: boolean, width: number, height: number, scale: number): void {
		super.resize(isPortrait, width, height, scale);

		const w = this.bottomRight.x - this.topLeft.x;
		const h = this.bottomRight.y - this.topLeft.y;
		const middleX = w / 2;
		const middleY = h / 2;

		this._background.width = w;
		this._background.height = h;
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
		this._ball.collisionWithFloorAndCeiling();

		if (this._ball.passedPad(this._leftPad, this._rightPad)) {
			this._started = false;
			if (this._leftPad.isWinner() || this._rightPad.isWinner()) {
				this.gameOver();
			}
		}
	}

	gameOver(): void {
		SceneManager.switchToScene(new EndScene());
	}
}