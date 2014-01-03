var Load = Load || function(callback) {
	this._waitingToStart = false;
	this._orientError = null;
	this.callback = callback
	this._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));

	if(viewporter.ACTIVE) {
		viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
		if(viewporter.isLandscape()) {
			Assets.loadAndCall("images/orientation_error.png",$bind(this,this.waitForPortrait)); 
		} else {
			Assets.loadAndCall("images/orientation_error.png",$bind(this,this.loadBarFill));
		}
	} else {
		Assets.loadAndCall("images/orientation_error.png",$bind(this,this.loadBarFill));
	}

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(this._stage);
}

Load.prototype = {
	loadBarFill: function() {
		Assets.loadAndCall("images/loading_fill.png",$bind(this,this.loadBarStroke));
	}
	,loadBarStroke: function() {
		Assets.loadAndCall("images/loading_stroke.png",$bind(this, this.showSplash));
	}
	,showSplash: function() {
		if(viewporter.ACTIVE) js.Lib.document.body.bgColor = "#ffe829"; else js.Lib.document.body.bgColor = "#ffe829";
		this._loadingStroke = Assets.getImage("images/loading_stroke.png");
		this._loadingStroke.regX = this._loadingStroke.image.width / 2;
		this._stage.addChildAt(this._loadingStroke,0);
		this._loadingBar = Assets.getImage("images/loading_fill.png");
		this._loadingBar.regX = this._loadingBar.image.width / 2;
		this._stage.addChildAt(this._loadingBar,1);
		this._loadingBar.x = js.Lib.window.innerWidth / 2;
		this._loadingBar.y = 310;
		this._loadingStroke.x = this._loadingBar.x;
		this._loadingStroke.y = this._loadingBar.y;
		this._loadingBar.visible = false;
		this.updateLoading();
		this._stage.canvas.width = js.Lib.window.innerWidth;
		this._stage.canvas.height = js.Lib.window.innerHeight;
		if (cookie.get('FOODIESID')) {
			var self = this;
			P_Socket.connect(function() {
				console.log("socket connect success");
				self.handleDoneLoading();
			});
			Assets.onLoadAll = function() {
				console.log("wait for socket connect success");
			}
		} else {
			Assets.onLoadAll = $bind(this,this.handleDoneLoading);
		}
		Assets.loadAll();
		document.addEventListener('mozvisibilitychange', this.exitFocus);
	}
	,handleDoneLoading: function() {
		// createjs.Tween.get(this._splash).wait(200).to({ alpha : 0},800).call($bind(this,this.splashEnded));
		this._stage.removeChild(this._loadingBar);
		this._stage.removeChild(this._loadingStroke);
		this.splashEnded();
	}
	,splashEnded: function() {
		createjs.Ticker.removeListener(this._stage);
		this.callback? this.callback() : '';
	}
	,updateLoading: function() {
		if(Assets.loaded != 1) {
			Assets.loaded = (Assets.loaded < 0.95)? Assets.loaded : 0.95; 
			this._loadingBar.visible = true;
			var percent = Assets.loaded;
			var barMask = new createjs.Shape();
			barMask.graphics.beginFill("#00000000");
			barMask.graphics.drawRect(this._loadingBar.x - this._loadingBar.image.width / 2,this._loadingBar.y,this._loadingBar.image.width * percent | 0,this._loadingBar.image.height);
			barMask.graphics.endFill();
			this._loadingBar.mask = barMask;
		 	zx_foodies.Utils.waitAndCall(this,10,$bind(this,this.updateLoading));
		}
	}
	,exitFocus: function() {
		var hidden = document.mozHidden;
	}
	,waitForPortrait: function() {
		this._waitingToStart = true;
		this._orientError = Assets.getImage("images/orientation_error.png");
		this._orientError.regX = this._orientError.image.width / 2;
		this._orientError.regY = this._orientError.image.height / 2;
		this._orientError.x = js.Lib.window.innerWidth / 2;
		this._orientError.y = js.Lib.window.innerHeight / 2;
		this._stage.addChildAt(this._orientError,Game._stage.getNumChildren());
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
}
