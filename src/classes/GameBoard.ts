import { Container, Sprite, Texture } from "pixi.js";
import { Constants } from "../helpers/Constants";

export class GameBoard extends Container {
    private _background: Sprite;

    constructor() {
        super();
        this._background = new Sprite(Texture.WHITE);
        this._background.tint = 0x0000dd;
        this._background.width = Constants.ViewWidth;
        this._background.height = Constants.ViewHeight;
        this._background.anchor.set(0.5);
        this._background.position.set(
            this._background.width / 2,
            this._background.height / 2
        );
        this.addChild(this._background);
    }
}
