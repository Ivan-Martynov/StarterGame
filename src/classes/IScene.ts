import { Container  } from "@pixi/display";

export interface IScene extends Container {
	load(): void;
	start(): void;
	unload(): void;
	update(_dt: number): void;
	resize(_isPortrait: boolean, _width: number, _height: number, _scale: number): void;
}