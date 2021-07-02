import * as PIXI from "pixi.js";
import { SceneBase } from "../classes/SceneBase";
import { Constants } from "../helpers/Constants";
import { SceneManager } from "../managers/SceneManager";
import { GameScene } from "./GameScene";
import { SolarizedColor } from "../utils/types";
import buttonImage from "../assets/images/gui_objects/button_simple.png";

export class MenuScene extends SceneBase {
	private _background: PIXI.Sprite;
	private _buttonContainer: PIXI.Container;
	private _box: PIXI.Sprite;
	private _text: PIXI.Text;

	constructor() {
		super();

		this._background = new PIXI.Sprite(PIXI.Texture.WHITE);
		this._background.tint = SolarizedColor.BASE0;
		this._background.width = Constants.ViewWidth;
		this._background.height = Constants.ViewHeight;
		this.addChild(this._background);

		this._createButton();
	}

	private _createButton(): void {
		this._buttonContainer = new PIXI.Container();
		this._buttonContainer.position.set(Constants.ViewWidth / 2, Constants.ViewHeight / 2);
		this.addChild(this._buttonContainer);

		this._box = PIXI.Sprite.from(buttonImage);
		this._box.anchor.set(0.5);
		this._box.interactive = true;
		this._box.buttonMode = true;
		this._box.on('pointerdown', this._switchToScene);
		this._buttonContainer.addChild(this._box);

		this._text = new PIXI.Text('Start',
			new PIXI.TextStyle({
				fontWeight: 'bold',
				fontSize: 36,
				fill: SolarizedColor.BASE00
			})
		);
		this._text.anchor.set(0.5);
		this._buttonContainer.addChild(this._text);
	}

	load(): void {
		super.load();
	}

	private _switchToScene(): void {
		SceneManager.switchToScene(new GameScene());
	}

	resize(isPortrait: boolean, width: number, height: number, scale: number): void {
		super.resize(isPortrait, width, height, scale);

		const w = this.bottomRight.x - this.topLeft.x;
		const h = this.bottomRight.y - this.topLeft.y;
		const middleX = w / 2;
		const middleY = h / 2;

		this._background.width = w;
		this._background.height = h;
		this._buttonContainer.position.set(middleX, middleY);
	}
}