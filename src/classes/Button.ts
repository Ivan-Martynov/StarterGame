import { Container, Sprite, Texture } from "pixi.js";

export class Button extends Container {
	public sprite: Sprite;

	constructor(texture: Texture) {
		super();

		this.sprite = new Sprite(texture);
		this.sprite.interactive = true;
		this.sprite.buttonMode = true;
		this.sprite.anchor.set(0.5);
		this.addChild(this.sprite);
	}
}