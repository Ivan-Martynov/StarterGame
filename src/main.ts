import { GameController } from "./classes/GameController";
import { Constants } from "./helpers/Constants";
import { Application } from "@pixi/app";
import * as WindowHelper from "./helpers/WindowHelper";

// have to keep the app global
let _app: Application;

function main(): void {
    _app = new Application({
        width: Constants.ViewWidth,
        height: Constants.ViewHeight,
        backgroundColor: 0x000000,
		backgroundAlpha: 1,
        resolution: devicePixelRatio,
        autoDensity: true,
    });

    document.querySelector(".container").appendChild(_app.view);

    const gameApp = new GameController(_app);

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
	//window.onkeydown = (event: KeyboardEvent):any => { console.log("pressed key: " + event.code + "; " + event.key); };

    _app.ticker.add(() => {
        //const dt = _app.ticker.elapsedMS * 0.001;
        const dt = Constants.deltaTime;
        gameApp.update(dt);
    });
}

main();
