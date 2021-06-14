import * as PIXI from "pixi.js";
import { SceneManager } from "../managers/SceneManager";
import { Scene } from "./Scene";

export class EndScene extends Scene {
	box: PIXI.Sprite;
	text: PIXI.Text;

	constructor() {
		super();
		this.init();
	}

	init(): void {
		this.box = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.box.tint = 0x0000ff;
		this.box.position.set(100, 100);
		this.box.width = 250;
		this.box.height = 300;
		this.box.interactive = true;
		this.box.on("pointerdown", this.switchToMenuScene);
		this.addChild(this.box);

		this.text = new PIXI.Text(
			"End",
			new PIXI.TextStyle({
				fontWeight: "bold",
				fontSize: 48,
			})
		);
		this.text.tint = 0x000000;
		this.text.position.set(300, 300);
		this.text.anchor.set(0.5);

		this.addChild(this.text);
	}

	start(): void {
		super.start();
	}

	stop(): void {
		super.stop();
	}

	switchToMenuScene(): void {
		SceneManager.switchToScene("menu");
	}
}
