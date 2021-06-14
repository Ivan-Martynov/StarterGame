import { Container } from "pixi.js";

export interface IScene extends Container {
	init(): void;
	start(): void;
	stop(): void;
	destroy(): void;
	update(_dt: number): void;
	resize(isPortrait: boolean, width: number, height: number, scale: number): void;
}
