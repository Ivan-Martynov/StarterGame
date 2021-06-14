import { GameApp } from "./app/GameApp";
import { Constants } from "./helpers/Constants";
import * as PIXI from "pixi.js";
import * as WindowHelper from "./helpers/WindowHelper";

// have to keep the app global
let _app: PIXI.Application;

function main(): void {
    _app = new PIXI.Application({
        width: Constants.ViewWidth,
        height: Constants.ViewHeight,
        backgroundColor: 0xff00ff,
        resolution: devicePixelRatio,
        autoDensity: true,
    });

    document.querySelector(".container").appendChild(_app.view);

    const gameApp = new GameApp(_app);

    _app.renderer.resize(window.innerWidth, window.innerHeight);
    gameApp.onResize(
        WindowHelper.isPortrait(_app.screen.width, _app.screen.height),
        _app.screen.width,
        _app.screen.height,
        WindowHelper.getScale(
            _app.screen.width,
            _app.screen.height,
            Constants.ViewWidth,
            Constants.ViewHeight
        )
    );

    const updateLayout = (): void => {
        _app.renderer.resize(window.innerWidth, window.innerHeight);
        gameApp.onResize(
            WindowHelper.isPortrait(_app.screen.width, _app.screen.height),
            _app.screen.width,
            _app.screen.height,
            WindowHelper.getScale(
                _app.screen.width,
                _app.screen.height,
                Constants.ViewWidth,
                Constants.ViewHeight
            )
        );
    };

    window.addEventListener("resize", updateLayout);

    _app.ticker.add(() => {
        const dt = _app.ticker.elapsedMS * 0.001;
        gameApp.update(dt);
    });
}

main();
