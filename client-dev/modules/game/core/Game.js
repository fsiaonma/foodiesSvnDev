zx_foodies.Game = $hxClasses["zx_foodies.Game"] = function(stage, stageBg, stageTime) {
	this._waitingToStart = false;
	this._orientError = null;
	if(zx_foodies.Game.DEBUG) zx_foodies.Persistence.clearAll();
	var isGS3Stock = /Android 4.0.4/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && /GT-I9300/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && !/Chrome/.test(navigator.userAgent);
	if(isGS3Stock) {
		js.Lib.alert("这个手机版本不支持，请更新您的手机。");
		return;
	}

	zx_foodies.Game._stage = stage;
	zx_foodies.Game._stageBg = stageBg;
	zx_foodies.Game._stageTime = stageTime;

	if(viewporter.ACTIVE) {
		// viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
	}
	
	this.readyToStart();
};

zx_foodies.Game.__name__ = ["zx","foodies","Game"];
zx_foodies.Game._stage = null;
zx_foodies.Game._bgMusic = null;

zx_foodies.Game.getViewport = function() {
	return zx_foodies.Game._viewport;
}
zx_foodies.Game.getScale = function() {
	return zx_foodies.Game._scale;
}
zx_foodies.Game.getStage = function() {
	return zx_foodies.Game._stage;
}
// zx_foodies.Game.setScale = function() {
// 	var regScale = zx_foodies.Game._viewport.height / zx_foodies.Game.MAX_HEIGHT;
// 	if(zx_foodies.Game._viewport.width >= zx_foodies.Game._viewport.height) {
// 		zx_foodies.Game._scale = regScale;
// 	} else if(zx_foodies.Game.MAX_WIDTH * regScale < zx_foodies.Game._viewport.width) {
// 		zx_foodies.Game._scale = zx_foodies.Game._viewport.width / zx_foodies.Game.MAX_WIDTH; 
// 	} else {
// 		zx_foodies.Game._scale = regScale;
// 	}
// }
zx_foodies.Game.prototype = {
	readyToStart: function() {
		document.body.style["background-color"] = "#ffe829";
		// js.Lib.window.onresize = $bind(this,this.handleResize);
		// this.handleResize(null);
		this.handleStart();
	}
	,handleStart: function(data) {
		UserModel.setUserStatus(USER_STATUS.PLAYING);
		SceneRouter.toSessionScene(this, {
			onSceneEnd: this.handleSessionSceneEnd
		}, data);
	}
	,continueToFight: function() {
		SceneRouter.toSessionScene(this, {
			onSceneEnd: this.handleSessionSceneEnd
		});
	}
	,handleSessionSceneEnd: function(gemTypeNum, eliminateGems) {
		UserModel.setUserStatus(USER_STATUS.CALCULATE);
		var self = this;
		if (UserModel.getPlayMode() == PLAY_MODE.SINGLE) {
			GameModel.getScore(gemTypeNum, eliminateGems, function(data) {
				SceneRouter.toScoreScene(self, {
					onContinueFight: self.continueToFight
				}, {
					score: data.score,
					level: data.level
				});
			});
		} else if (UserModel.getPlayMode() == PLAY_MODE.BATTLE) {
			zx_foodies.Gem._gemSpriteSheet = null;
			SceneRouter.toBattleResultScene(this);
			GameModel.getScore(gemTypeNum, eliminateGems, function(data) {
				console.log(data);
			});
		}
	}
	,handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		zx_foodies.Game._stage.canvas.width = screenW;
		zx_foodies.Game._stage.canvas.height = screenH;

		if(!viewporter.isLandscape()) {
			if(isFirefox) {
				screenH = Math.floor(zx_foodies.Main.getFFHeight());
				var ffEstimate = Math.ceil((js.Lib.window.screen.height - 110) * (screenW / js.Lib.window.screen.width));
				if(!isAndroid) ffEstimate = Math.ceil((js.Lib.window.screen.height - 30) * (screenW / js.Lib.window.screen.width));
				if(ffEstimate < screenH) screenH = Math.floor(ffEstimate);
			}
			if(!(viewporter.ACTIVE && screenH < screenW)) {
				zx_foodies.Game._viewport.width = screenW;
				zx_foodies.Game._viewport.height = screenH;
				// zx_foodies.Game.setScale();
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) zx_foodies.Game._stage.update();
	}
	,handleViewportChanged: function() {
		if(viewporter.isLandscape()) {
			if(this._orientError == null) {
				this._orientError = zx_foodies.Assets.getImage("images/orientation_error.png");
				this._orientError.regX = this._orientError.image.width / 2;
				this._orientError.regY = this._orientError.image.height / 2;
				this._orientError.x = zx_foodies.Game._viewport.height / 2;
				this._orientError.y = zx_foodies.Game._viewport.width / 2;
				zx_foodies.Game._stage.addChildAt(this._orientError,zx_foodies.Game._stage.getNumChildren());
				zx_foodies.Game._stage.update();
				this._session.pause();
			}
		} else if(this._orientError != null) {
			zx_foodies.Game._stage.removeChild(this._orientError);
			this._orientError = null;
			if(createjs.Ticker.getPaused()) zx_foodies.Game._stage.update();
			if(this._waitingToStart) {
				this._waitingToStart = false;
				zx_foodies.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.showSplash));
			}
		}
	}
	
	,_playerXP: null
	,_lightCircle: null
	,_loadingStroke: null
	,_loadingBar: null
	,_tapToPlayText: null
	,_waitingToStart: null
	,_orientError: null
	,_session: null
	,_menu: null
	,_bush: null
	,_cheetah: null
	,_logo: null
	,__class__: zx_foodies.Game
}