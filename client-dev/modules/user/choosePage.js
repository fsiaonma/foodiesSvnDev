var ChoosePage = function() {
	if (choosePageStage) {
		createjs.Ticker.removeListener(choosePageStage);
	}
	choosePageStage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	choosePageStage.update();
	createjs.Ticker.setFPS(24);
	createjs.Ticker.addListener(choosePageStage);
	// this._viewport = new createjs.Rectangle(0,0,1,1);
	// this.handleResize();

	this.choosePage = new libFinding.finding();

	this.choosePage.regX = 0;
	this.choosePage.regY = 0;
	// this.choosePage.x = this._viewport.width / 2;
	// this.choosePage.y = this._viewport.height / 2;
	choosePageStage.addChild(this.choosePage);

	this.initPage();
	this.initEvent();
	this.initInfo();
}

ChoosePage.prototype = {
	initPage: function() {
		this.choosePage.girls_small.visible = false;
		this.choosePage.boys_small.visible = false;

		this.choosePage.girlHead.visible = false;
		this.choosePage.girlHead.instance_2.image = images["lgirlhead"];
		this.choosePage.girlBg.visible = false;

		this.choosePage.boyHead.visible = false;
		this.choosePage.boyHead.instance_9.image = images["lboyhead"];
		this.choosePage.boyBg.visible = false;

		this.choosePage.randomEnemy.visible = false;
		this.choosePage.inviteFriend.visible = false;

		this.choosePage.iamcoming.visible = false;

		this.talkTxt = new createjs.Text("准备好啦!", "20px 黑体", "#000000");
		this.talkTxt.setTransform(230, 525);
		this.choosePage.addChild(this.talkTxt);

		var infoTxt = new createjs.Text("名称:" + UserModel.getUserInfo().username, "20px 黑体", "#000000");
		infoTxt.setTransform(50, 650);
		this.choosePage.addChild(infoTxt);

		var levelTxt = new createjs.Text("级别:" + UserModel.getUserInfo().level, "20px 黑体", "#000000");
		levelTxt.setTransform(220, 650);
		this.choosePage.addChild(levelTxt);

		var battlesTxt = new createjs.Text("总数:" + UserModel.getUserInfo().battles, "20px 黑体", "#000000");
		battlesTxt.setTransform(300, 650);
		this.choosePage.addChild(battlesTxt);
	},

	initEvent: function() {
		var self = this;
		this.choosePage.randomEnemy.onClick = function() {
			self.renderSearch();
		};
		this.choosePage.inviteFriend.onClick = function() {
			console.log('inviteFriend');
		};
		this.choosePage.backToIndex.onClick = function() {
			self.beforeLeave();
			Router.goto("#user/renderIndex");
		};
	},

	initInfo: function() {
		var userInfo = UserModel.getUserInfo();
		if (userInfo.sex == USER_SEX.MALE) {
			this.choosePage.boyBg.visible = true;
			this.choosePage.boyHead.visible = true;
		} else if (userInfo.sex == USER_SEX.FEMALE) {
			this.choosePage.girlBg.visible = true;
			this.choosePage.girlHead.visible = true;
		}
	},

	handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		choosePageStage.canvas.width = screenW;
		choosePageStage.canvas.height = screenH;
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
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) choosePageStage.update();
	},

	renderChoose: function() {
		this.choosePage.randomEnemy.visible = true;
		this.choosePage.inviteFriend.visible = true;
	},

	renderSearch: function() {
		this.choosePage.girls.visible = false;
		this.choosePage.boys.visible = false;

		this.choosePage.randomEnemy.visible = false;
		this.choosePage.inviteFriend.visible = false;
		this.choosePage.instance_5.visible = false;

		this.choosePage.iamcoming.visible = true;

		UserModel.setUserStatus(USER_STATUS.SEARCHING);
		var chooseP = this;

		(function() {
			var callFunc = arguments.callee;
			var self = this;
			chooseP.choosePage.girls.visible = false;
			createjs.Tween.get(chooseP.choosePage.girls_small).to({visible: true}).wait(500).call(function() {
				chooseP.choosePage.girls_small.visible = false;
				createjs.Tween.get(chooseP.choosePage.girls).to({visible: true}).wait(500).call(function() {
					if (UserModel.getUserStatus() == USER_STATUS.SEARCHING) {
						callFunc.call(self);
					}
				});
			});
		})();
		
		(function() {
			var callFunc = arguments.callee;
			var self = this;
			chooseP.choosePage.boys_small.visible = false;
			createjs.Tween.get(chooseP.choosePage.boys).to({visible: true}).wait(500).call(function() {
				chooseP.choosePage.boys.visible = false;
				createjs.Tween.get(chooseP.choosePage.boys_small).to({visible: true}).wait(500).call(function() {
					if (UserModel.getUserStatus() == USER_STATUS.SEARCHING) {
						callFunc.call(self);
					}
				});
			});
		})();

		setTimeout(function() {
			chooseP.choosePage.girlHead.instance_2.image = images["lgirlwait"];
			chooseP.choosePage.boyHead.instance_9.image = images["lboywait"];
			chooseP.talkTxt.text = "快来人吧!";
		}, 3000);

		UserModel.searching(function() {
			var callFunc = arguments.callee;
			var self = this;
		    setTimeout(function() {
				if (UserModel.getUserStatus() == USER_STATUS.SEARCHING) {
					UserModel.searching(function() {
						callFunc.call(self);
					});
				}
			}, 5000);
		});
	},

	beforeLeave: function() {
		UserModel.backToIndex();
	}
}