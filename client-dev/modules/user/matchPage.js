var MatchPage = function() {
	if (matchPageStage) {
		createjs.Ticker.removeListener(matchPageStage);
	}
	this.timeoutId = null;
	matchPageStage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	matchPageStage.update();
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addListener(matchPageStage);
	// this._viewport = new createjs.Rectangle(0,0,1,1);
	// this.handleResize();

	this.matchPage = new libMatching.matching();

	this.matchPage.regX = 0;
	this.matchPage.regY = 0;
	// this.matchPage.x = this._viewport.width / 2;
	// this.matchPage.y = this._viewport.height / 2;
	matchPageStage.addChild(this.matchPage);
	this.initPage();
	this.initEvent();
	this.initInfo();
	this.waitTofight();
}

MatchPage.prototype = {
	initPage: function() {
		// 对方
		this.matchPage.girlHead.visible = false;
		this.matchPage.girlBg.visible = false;

		// 己方
		this.matchPage.boyHead.visible = false;
		this.matchPage.boyBg.visible = false;

		this.selfPatten = {
			bg: this.matchPage.boyBg.instance_11,
			head: this.matchPage.boyHead.instance_7
		}

		this.competitorPatten = {
			bg: this.matchPage.girlBg.instance_10,
			head: this.matchPage.girlHead.instance_3
		}

		var playerAtalkTxt = new createjs.Text("多多指教哦!", "20px 黑体", "#000000");
		playerAtalkTxt.setTransform(230, 525);
		this.matchPage.addChild(playerAtalkTxt);

		var playerAinfoTxt = new createjs.Text("名称:" + UserModel.getUserInfo().username, "20px 黑体", "#000000");
		playerAinfoTxt.setTransform(50, 650);
		this.matchPage.addChild(playerAinfoTxt);

		var playerAlevelTxt = new createjs.Text("级别:" + UserModel.getUserInfo().level, "20px 黑体", "#000000");
		playerAlevelTxt.setTransform(220, 650);
		this.matchPage.addChild(playerAlevelTxt);

		var playerAbattlesTxt = new createjs.Text("对战数:" + UserModel.getUserInfo().battles, "20px 黑体", "#000000");
		playerAbattlesTxt.setTransform(300, 650);
		this.matchPage.addChild(playerAbattlesTxt);

		var playerBtalkTxt = new createjs.Text("多多指教哦!", "20px 黑体", "#000000");
		playerBtalkTxt.setTransform(230, 230);
		this.matchPage.addChild(playerBtalkTxt);

		var playerBinfoTxt = new createjs.Text("名称:" + UserModel.getCompetitorInfo().username, "20px 黑体", "#000000");
		playerBinfoTxt.setTransform(50, 355);
		this.matchPage.addChild(playerBinfoTxt);

		var playerBlevelTxt = new createjs.Text("级别:" + UserModel.getCompetitorInfo().level, "20px 黑体", "#000000");
		playerBlevelTxt.setTransform(220, 355);
		this.matchPage.addChild(playerBlevelTxt);

		var playerBbattlesTxt = new createjs.Text("对战数:" + UserModel.getCompetitorInfo().battles, "20px 黑体", "#000000");
		playerBbattlesTxt.setTransform(300, 355);
		this.matchPage.addChild(playerBbattlesTxt);
	},

	initEvent: function() {
		var self = this;
		this.matchPage.beginFight.onClick = function() {
			console.log("beginFight");
		};
		this.matchPage.rechoose.onClick = function() {
			console.log('rechoose');
			self.beforeLeave();
			Router.goto("#user/renderSearch");
		};
		this.matchPage.backToIndex.onClick = function() {
			self.beforeLeave();
			Router.goto("#user/renderIndex");
		};
	},

	initInfo: function() {
		if (UserModel.getUserInfo().sex == USER_SEX.MALE) {
			this.selfPatten.bg.image = images.bgboy;
			this.selfPatten.head.image = images.lboyhead;
		} else if (UserModel.getUserInfo().sex == USER_SEX.FEMALE) {
			this.selfPatten.bg.image = images.bggirl;
			this.selfPatten.head.image = images.lgirlhead;
		}
		
		if (UserModel.getCompetitorInfo().sex == USER_SEX.MALE) {
			this.competitorPatten.bg.image = images.bgboy;
			this.competitorPatten.head.image = images.lboyhead;
		} else if (UserModel.getCompetitorInfo().sex == USER_SEX.FEMALE) {
			this.competitorPatten.bg.image = images.bggirl;
			this.competitorPatten.head.image = images.lgirlhead;
		}

		this.matchPage.girlHead.visible = true;
		this.matchPage.girlBg.visible = true;

		this.matchPage.boyHead.visible = true;
		this.matchPage.boyBg.visible = true;
	},

	handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		matchPageStage.canvas.width = screenW;
		matchPageStage.canvas.height = screenH;
		if(!viewporter.isLandscape()) {
			if(isFirefox) {
				screenH = Math.floor(zx_foodies.Main.getFFHeight());
				var ffEstimate = Math.ceil((js.Lib.window.screen.height - 110) * (screenW / js.Lib.window.screen.width));
				if(!isAndroid) ffEstimate = Math.ceil((js.Lib.window.screen.height - 30) * (screenW / js.Lib.window.screen.width));
				if(ffEstimate < screenH) screenH = Math.floor(ffEstimate);
			}
			if(!(viewporter.ACTIVE && screenH < screenW)) {
				this._viewport.width = screenW;
				this._viewport.height = screenH;
				// this.setScale();
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) matchPageStage.update();
	},

	waitTofight: function() {
		this.timeoutId = setTimeout(function() {	
			if (UserModel.getUserStatus() == USER_STATUS.REARY) {
				GameModel.isReadyToFight(function(data) {
					if (data.success) {
						Router.goto("game/renderGame");
					}
				});
			}
		}, 3000);
	},

	beforeLeave: function() {
		UserModel.backToIndex();
		UserModel.resetCompetitorInfo();
		GameModel.setFightKey(null);
		clearTimeout(this.timeoutId);
	}
}