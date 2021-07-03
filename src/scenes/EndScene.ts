import * as PIXI from "pixi.js";
import { Button } from "../classes/Button";
import { GameController } from "../classes/GameController";
import { SceneBase } from "../classes/SceneBase";
import { Constants } from "../helpers/Constants";
import { SolarizedColor } from "../utils/types";

export class EndScene extends SceneBase {
	private _background: PIXI.Sprite;
	private _gameEndText: PIXI.Text;
	private _endButton: Button;

	constructor() {
		super();

		this._background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this._background.tint = SolarizedColor.BASE0;
		this._background.width = Constants.ViewWidth;
		this._background.height = Constants.ViewHeight;
		this.addChild(this._background);

		this._gameEndText = new PIXI.Text('The End',
			new PIXI.TextStyle({
				fontWeight: 'bolder',
				fontSize: 36,
				fill: SolarizedColor.BASE02
			})
		);
		this._gameEndText.anchor.set(0.5);
		this.addChild(this._gameEndText);

		this._createButton();
	}

	private _createButton(): void {
		this._endButton = new Button(PIXI.Texture.WHITE);
		this._endButton.sprite.width = 250;
		this._endButton.sprite.height = 50;
		this._endButton.sprite.tint = SolarizedColor.VIOLET;
		this._endButton.sprite.on('pointerdown', this._switchToScene);
		this.addChild(this._endButton);

		const text = new PIXI.Text('To main menu',
			new PIXI.TextStyle({
				fontWeight: 'bold',
				fontSize: 32,
				fill: SolarizedColor.BASE02
			})
		);
		text.anchor.set(0.5);
		this._endButton.addChild(text);
	}

	load(): void {
		super.load();
	}

	private _switchToScene(): void {
		GameController.getInstance().reset();
	}

	resize(isPortrait: boolean, width: number, height: number, scale: number): void {
		super.resize(isPortrait, width, height, scale);

		const w = this.bottomRight.x - this.topLeft.x;
		const h = this.bottomRight.y - this.topLeft.y;
		const middleX = w / 2;
		const middleY = h / 2;

		this._background.width = w;
		this._background.height = h;

		this._gameEndText.position.set(middleX, middleY - this._gameEndText.height);
		this._endButton.position.set(middleX, middleY + this._endButton.height);
	}
}