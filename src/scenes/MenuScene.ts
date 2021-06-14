import * as PIXI from "pixi.js";
import { SceneManager } from "../managers/SceneManager";
import { Scene } from "./Scene";

export class MenuScene extends Scene {
	box: PIXI.Sprite;
	text: PIXI.Text;

	constructor() {
		super();
	}

	init(): void {
		this.box = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.box.tint = 0x0000ff;
		this.box.width = 150;
		this.box.height = 30;
		//this.box.position.set(700, 1200);
		this.box.anchor.set(0.5);
		this.box.interactive = true;
		this.box.on("pointerdown", this.switchToEndScene);
		this.addChild(this.box);

		this.text = new PIXI.Text(
			"Start",
			new PIXI.TextStyle({
				fontWeight: "bold",
				fontSize: 40,
				fill: 0xFFFFFF,
			})
		);
		this.text.anchor.set(0.5);
		this.text.position.set(300, 300);

		this.addChild(this.text);
	}

	start(): void {
		super.start();
	}

	stop(): void {
		super.stop();
	}

	switchToEndScene(): void {
		SceneManager.switchToScene("game");
	}

	resize(isPortrait: boolean, width: number, height: number, scale: number): void {
		super.resize(isPortrait, width, height, scale);

		const w = this.bottomRight.x - this.topLeft.x;
		const h = this.bottomRight.y - this.topLeft.y;
		const middleX = w / 2;
		const middleY = h / 2;

		this.box.position.set(middleX, middleY);
		this.text.position.set(middleX, middleY);
	}
}
