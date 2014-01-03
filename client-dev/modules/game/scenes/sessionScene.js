zx_foodies.SessionScene = $hxClasses["zx_foodies.SessionScene"] = function(data) {
	this._sessionEnded = false;
	this.exportRoot = null;
	createjs.Container.call(this);
	var self = this;
	this.constructGame(function() {
		self._eliminateGems = (function() {
			var o = {};
			for(var i = 1; i <= zx_foodies.Gem.GEMS_COUNT; ++i) {
				o[i] = 0;
			}
			return o;
		})();
		self._remainingTime = self._sessionTime = 60;
		self.gameTimer();
		self.newPowerup();
		var now = createjs.Ticker.getTime(true);
		self._lastGemBlastTime = now;
		createjs.Ticker.addListener(self)
;	});
};
zx_foodies.SessionScene.__name__ = ["zx","foodies","Session"];
zx_foodies.SessionScene.__super__ = createjs.Container;
zx_foodies.SessionScene.prototype = $extend(createjs.Container.prototype,{
	getSpreePercent: function() {
		return this._spree / this._requiredSpree;
	}
	,isSpreeComplete: function() {
		return this._spree >= this._requiredSpree;
	}
	,timesUp: function() {
		if(this._sessionEnded) return;
		this._sessionEnded = true;
		if(this.onSceneEnd != null) {
			this.handlerSessionEnd();
		} 
		this._grid.terminate();
		this._grid.mouseEnabled = false;
		createjs.Tween.get(this._grid).to({ x : zx_foodies.Game.MAX_WIDTH + this._grid.getWidth() * zx_foodies.Game.getScale() / 2},600,createjs.Ease.sineIn).wait(300);
	}
	,resetSpree: function() {
		this._spree = 0;
	}
	,handleWrongGroup: function() {
		this.resetSpree();
	}
	,handleGemBlast: function(gem, rearrange) {
		if(rearrange || gem.getType() >= zx_foodies.Gem.PowerupIndex) return;
		this._eliminateGems[gem.getType()] += 1;
		this._spree += 1;
		this._lastGemBlastTime = createjs.Ticker.getTime(true);
	}
	,handleTweenEnd: function() {
		createjs.Tween.get(this._grid).to({ alpha : 1},500);
		this._grid.mouseEnabled = true;
		this._grid.placePowerup();
		this.newPowerup();
	}
	,handleReadyForPowerup: function() {
		var result = null;
		if(this._sessionEnded) return;
		if(this.isSpreeComplete()) {
			result = this._currPowerupType;
			this._spree = 0;
			this.newPowerup();
		}
		return result;
	}
	,constructGame: function(callback) {	
		if (APP_DEBUG) {
			this._fps = new createjs.Text("0","Arial 22px","#FF0000");
			this.addChild(this._fps);
			this._fps.x = 100;
			this._fps.y = 100;
		}

		this.playingPage = new libPlaying.playing();
		this.playingPage.regX = PIC_SIZE.WIDTH / 2;
		this.playingPage.regY = PIC_SIZE.HEIGHT / 2;
		this.playingPage.y = zx_foodies.Game.MAX_HEIGHT / 2;
		this.playingPage.x = zx_foodies.Game.MAX_WIDTH / 2;
		this.addChild(this.playingPage);

		this.initPage();
		this.initInfo();

		var ready = new createjs.Bitmap(images.ready);
		ready.regX = ready.image.width / 2;
		ready.regY = ready.image.height / 2;
		ready.y = zx_foodies.Game.MAX_HEIGHT / 2;
		ready.x = zx_foodies.Game.MAX_WIDTH / 2;
		this.addChild(ready);

		var self = this;
		createjs.Tween.get(ready).to({alpha: 0, scaleX: 1.5, scaleY: 1.5}, 600).wait(200).call(function() {
			self.removeChild(ready);

			var go = new createjs.Bitmap(images.go);
			go.regX = go.image.width / 2;
			go.regY = go.image.height / 2;
			go.y = zx_foodies.Game.MAX_HEIGHT / 2;
			go.x = zx_foodies.Game.MAX_WIDTH / 2;
			self.addChild(go);

			createjs.Tween.get(go).to({alpha: 0, scaleX: 1.5, scaleY: 1.5}, 600).call(function() {
				self.removeChild(go);
				
				self._grid = new zx_foodies.GemGrid(zx_foodies.DataLoader.getAvailPassivePowerupIds());
				self._grid.onGemBlast = $bind(self,self.handleGemBlast);
				self._grid.onWrongGroup = $bind(self,self.handleWrongGroup);
				self._grid.onReadyForPowerup = $bind(self,self.handleReadyForPowerup);
				self.addChild(self._grid);
				callback? callback() : '';
				GameModel.checkIsFinished(function() {
					self.timesUp();
				});
			})
		});
	}
	,initPage: function() {
		// 己方
		this.playingPage.player1Head.visible = false;
		this.playerA = this.playingPage.player1Head.instance_7;

		// 对方
		this.playingPage.player2Head.visible = false;
		this.playerB = this.playingPage.player2Head.instance_6;

		// 对话框
		this.playingPage.player1Text.visible = false;
		this.playingPage.player2Text.visible = false;
	}
	,initInfo: function() {
		if (UserModel.getPlayMode() == PLAY_MODE.BATTLE) {
			// 己方
			if (UserModel.getUserInfo().sex == USER_SEX.MALE) {
				this.playerA.image = images["lboyhead"];
			} else if (UserModel.getUserInfo().sex == USER_SEX.FEMALE) {
				this.playerA.image = images["lgirlhead"];
			}

			// 对方
			if (UserModel.getCompetitorInfo().sex == USER_SEX.MALE) {
				this.playerB.image = images["rboyhead"];
			} else if (UserModel.getCompetitorInfo().sex == USER_SEX.FEMALE) {
				this.playerB.image = images["rgirlhead"];
			}

			this.playingPage.player1Text.visible = true;
			this.playingPage.player2Text.visible = true;
		} else if (UserModel.getPlayMode() == PLAY_MODE.SINGLE) {
			this.playerA.image = images["lboyhead"];

			var ranHeadIds = ["hamburger-man", "ice-lolly-man", "pingcake-man"];
			var img = ranHeadIds[Math.floor(Math.random() * 10) % 3];
			this.playerB.image = images[img];
		}

		this.playingPage.player1Head.visible = true;
		this.playingPage.player2Head.visible = true;
	}
	,gameTimer: function() {
		if(this._remainingTime > 0) {
			this.playingPage.time.x -= 338 / 60;
			var progress = this._remainingTime / this._sessionTime;
			if(progress > 1) progress = 1;
			this._remainingTime -= 1;
			zx_foodies.Utils.waitAndCall(this,1000,$bind(this,this.gameTimer));
		} else if (UserModel.getPlayMode() == PLAY_MODE.SINGLE) {
			this.timesUp();
		}
	}
	,tick: function() {
		var now = createjs.Ticker.getTime(true);
		if(now > this._lastGemBlastTime + zx_foodies.SessionScene.SPREE_RESET_INTERVAL && this._spree > 0) {
			this._lastGemBlastTime = now;
			this.resetSpree();
		}
	}
	,newPowerup: function() {
		var powerups = zx_foodies.DataLoader.getAvailablePowerups(true);
		var randNum = Std.random(powerups.length);
		this._currPowerupType = powerups[randNum].id | 0;
		this._requiredSpree = powerups[GameModel.currentLevel? (zx_foodies.LevelDB[GameModel.currentLevel - 1].powerUpNum - 1) : randNum].spreeToActivate | 0;
	}
	,tick: function() {
		if (APP_DEBUG) {
			this._fps.text = "" + createjs.Ticker.getMeasuredFPS();
		}
	}
	,handlerSessionEnd: function() {
		this.onSceneEnd(this._grid.gemTypeNum, this._eliminateGems);
		createjs.Ticker.removeListener(this);
	}
	,_lastGemBlastTime: null
	,_remainingTime: null
	,_sessionTime: null
	,_sessionEnded: null
	,_requiredSpree: null
	,_currPowerupBlock: null
	,_currPowerupType: null
	,_grid: null
	,_background: null
	,_spree: null
	,_scoreMutliplier: null
	,_score: null
	,__class__: zx_foodies.SessionScene
});