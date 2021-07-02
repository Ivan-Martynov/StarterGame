import { Container, Point } from "pixi.js";
import { IScene } from "./IScene";
import * as WindowHelper from "../helpers/WindowHelper";
import { GameController } from "./GameController";
import { Constants } from "../helpers/Constants";

export abstract class SceneBase extends Container implements IScene {
	private _origTopLeft: Point = new Point();
	private _origBottomRight: Point = new Point();

	protected topLeft: Point = new Point();
	protected bottomRight: Point = new Point();

	load(): void {
		const screen = GameController.getInstance().app.screen;
		this.resize(WindowHelper.isPortrait(screen.width, screen.height),
			screen.width, screen.height,
			WindowHelper.getScale(screen.width, screen.height, Constants.ViewWidth, Constants.ViewHeight)
		);

	}
	
	start(): void {
	}

	unload(): void {
	}

	update(_dt: number): void {
	}

	resize(_isPortrait: boolean, width: number, height: number, scale: number): void {
		this.scale.set(scale);

		this._origTopLeft.set(0, 0);
		this._origBottomRight.set(width, height);

		this.toLocal(this._origTopLeft, null, this.topLeft, false);
		this.toLocal(this._origBottomRight, null, this.bottomRight, false);
	}
}
