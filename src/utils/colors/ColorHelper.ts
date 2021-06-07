import { utils } from "pixi.js"

export class ColorHelper {
    static generateRandomColor(): number {
        return utils.rgb2hex([Math.random(), Math.random(), Math.random()]);
    }
}