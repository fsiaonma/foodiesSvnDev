zx_foodies.Main = $hxClasses["zx_foodies.Main"] = function() { }
zx_foodies.Main.__name__ = ["zx","foodies","Main"];
zx_foodies.Main._stage = null;
zx_foodies.Main._game = null;
zx_foodies.Main._ffHeight = null;
zx_foodies.Main.main = function() {
	if (UserModel.getPlayMode() == PLAY_MODE.SINGLE) {
		GameModel.initLevel();
	}
	if (choosePageStage) {
		createjs.Ticker.removeListener(choosePageStage);
	}
	if (matchPageStage) {
		createjs.Ticker.removeListener(matchPageStage);
	}
	if (zx_foodies.Main._stage) {
		createjs.Ticker.removeListener(zx_foodies.Main._stage);
	}
	zx_foodies.Main.testFFHeight();
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);

	zx_foodies.Main._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	zx_foodies.Main._game = new zx_foodies.Game(zx_foodies.Main._stage, zx_foodies.Main._stageBg, zx_foodies.Main._stageTime);
	createjs.Ticker.addListener(zx_foodies.Main._stage);
	createjs.Touch.enable(zx_foodies.Main._stage,true,false);
}
zx_foodies.Main.testFFHeight = function() {
	var isApplicable = /Firefox/.test(navigator.userAgent);
	if(isApplicable && viewporter.ACTIVE) zx_foodies.Main._ffHeight = js.Lib.window.innerHeight;
}
zx_foodies.Main.getFFHeight = function() {
	return zx_foodies.Main._ffHeight;
}