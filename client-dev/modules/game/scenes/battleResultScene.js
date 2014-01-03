zx_foodies.BattleResultScene = $hxClasses["zx_foodies.ScoreScene"] = function(data) {
	this.battleResultPage = new libBattleConclusion.conclusionfor2();
	this.battleResultPage.regX = PIC_SIZE.WIDTH / 2;
	this.battleResultPage.regY = PIC_SIZE.HEIGHT / 2;
	this.battleResultPage.y = zx_foodies.Game.MAX_HEIGHT / 2;
	this.battleResultPage.x = zx_foodies.Game.MAX_WIDTH / 2;
	this.addChild(this.battleResultPage);

	this.initPage();
	this.initEvent();
	this.initInfo();
};

zx_foodies.BattleResultScene.prototype = new createjs.Container();

zx_foodies.BattleResultScene.prototype.initPage = function() {
	this.battleResultPage.continueFight.visible = false;

	this.battleResultPage.winText.visible = false;
	this.battleResultPage.loseText.visible = false;

	this.battleResultPage.girlBg.visible = false;
	this.battleResultPage.boyBg.visible = false;

	this.battleResultPage.boyHead.visible = false;
	this.battleResultPage.girlHead.visible = false;

	this.selfPatten = {
		bg: this.battleResultPage.boyBg.instance_14,
		head: this.battleResultPage.boyHead.instance_10,
		resultTxt: this.battleResultPage.loseText.instance_1
	};

	this.competitorPatten = {
		bg: this.battleResultPage.girlBg.instance_13,
		head: this.battleResultPage.girlHead.instance_6,
		resultTxt: this.battleResultPage.winText.instance_2
	};

	var playerAtalkTxt = new createjs.Text("辛苦了~!", "20px 黑体", "#000000");
	playerAtalkTxt.setTransform(230, 465);
	this.battleResultPage.addChild(playerAtalkTxt);

	var playerBtalkTxt = new createjs.Text("辛苦了~!", "20px 黑体", "#000000");
	playerBtalkTxt.setTransform(230, 170);
	this.battleResultPage.addChild(playerBtalkTxt);

	var playerAinfoTxt = new createjs.Text("名称:" + UserModel.getUserInfo().username, "20px 黑体", "#000000");
	playerAinfoTxt.setTransform(50, 650);
	this.battleResultPage.addChild(playerAinfoTxt);

	var playerAlevelTxt = new createjs.Text("级别:", "20px 黑体", "#000000");
	playerAlevelTxt.setTransform(220, 650);
	this.battleResultPage.addChild(playerAlevelTxt);

	var playerAbattlesTxt = new createjs.Text("对战数:", "20px 黑体", "#000000");
	playerAbattlesTxt.setTransform(300, 650);
	this.battleResultPage.addChild(playerAbattlesTxt);

	var playerBinfoTxt = new createjs.Text("名称:" + UserModel.getCompetitorInfo().username, "20px 黑体", "#000000");
	playerBinfoTxt.setTransform(50, 355);
	this.battleResultPage.addChild(playerBinfoTxt);

	var playerBlevelTxt = new createjs.Text("级别:", "20px 黑体", "#000000");
	playerBlevelTxt.setTransform(220, 355);
	this.battleResultPage.addChild(playerBlevelTxt);

	var playerBbattlesTxt = new createjs.Text("对战数:", "20px 黑体", "#000000");
	playerBbattlesTxt.setTransform(300, 355);
	this.battleResultPage.addChild(playerBbattlesTxt);
};

zx_foodies.BattleResultScene.prototype.initEvent = function() {
	var self = this;
	this.battleResultPage.backToIndex.onClick = function() {
		self.beforeLeave();
		Router.goto("#user/renderIndex");
	}
	this.battleResultPage.continueFight.onClick = function() {
		console.log("continueToFight");
	}
	this.battleResultPage.rechoose.onClick = function() {
		self.beforeLeave();
		Router.goto("#user/renderSearch");
	}
	this.battleResultPage.addFriendBtn.onClick = function() {
		console.log("addFriend");
	}
};

zx_foodies.BattleResultScene.prototype.initInfo = function() {
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

	this.battleResultPage.girlBg.visible = true;
	this.battleResultPage.boyBg.visible = true;

	this.battleResultPage.boyHead.visible = true;
	this.battleResultPage.girlHead.visible = true;
};

zx_foodies.BattleResultScene.prototype.showResult = function(data) {
	var winnerInfo = {
		user_id: data.winner.user_id,
		username: data.winner.username,
		level: data.winner.level,
		battles: data.winner.battles
	};

	var loserInfo = {
		user_id: data.loser.user_id,
		username: data.loser.username,
		level: data.loser.level,
		battles: data.loser.battles
	};

	if (data.winner.user_id == UserModel.getUserInfo().user_id) {

		this.selfPatten.resultTxt.image = images.winTxt;
		this.selfPatten.head.image = showWinHeadResult(UserModel.getUserInfo().sex);
		UserModel.setUserInfo(winnerInfo);

		this.competitorPatten.resultTxt.image = images.loseTxt;
		this.competitorPatten.head.image = showLoseHeadResult(UserModel.getCompetitorInfo().sex);
		UserModel.setCompetitorInfo(loserInfo);

	} else if (data.winner.user_id == UserModel.getCompetitorInfo().user_id) {

		this.selfPatten.resultTxt.image = images.loseTxt;
		this.selfPatten.head.image = showLoseHeadResult(UserModel.getUserInfo().sex);
		UserModel.setUserInfo(loserInfo);

		this.competitorPatten.resultTxt.image = images.winTxt;
		this.competitorPatten.head.image = showWinHeadResult(UserModel.getCompetitorInfo().sex);
		UserModel.setCompetitorInfo(winnerInfo);

	}

	function showWinHeadResult(sex) {
		if (sex == USER_SEX.MALE) {
			return images["lboywin"];
		} else if (sex == USER_SEX.FEMALE) {
			return images["lgirlwin"];
		}
	}

	function showLoseHeadResult(sex) {
		if (sex == USER_SEX.MALE) {
			return images["lboylose"];
		} else if (sex == USER_SEX.FEMALE) {
			return images["lgirllose"];
		}
	}

	this.battleResultPage.winText.scaleX = 2;	
	this.battleResultPage.winText.scaleY = 2;
	this.battleResultPage.winText.visible = true;
	createjs.Tween.get(this.battleResultPage.winText).to({scaleX: 1, scaleY: 1}, 150);

	this.battleResultPage.loseText.scaleX = 2;	
	this.battleResultPage.loseText.scaleY = 2;
	this.battleResultPage.loseText.visible = true;
	createjs.Tween.get(this.battleResultPage.loseText).to({scaleX: 1, scaleY: 1}, 150);

	var playerAlevelTxt = new createjs.Text("级别:" + UserModel.getUserInfo().level, "20px 黑体", "#000000");
	playerAlevelTxt.setTransform(220, 650);
	this.battleResultPage.addChild(playerAlevelTxt);

	var playerAbattlesTxt = new createjs.Text("对战数:" + UserModel.getUserInfo().battles, "20px 黑体", "#000000");
	playerAbattlesTxt.setTransform(300, 650);
	this.battleResultPage.addChild(playerAbattlesTxt);

	var playerBlevelTxt = new createjs.Text("级别:" + UserModel.getCompetitorInfo().level, "20px 黑体", "#000000");
	playerBlevelTxt.setTransform(220, 355);
	this.battleResultPage.addChild(playerBlevelTxt);

	var playerBbattlesTxt = new createjs.Text("对战数:" + UserModel.getCompetitorInfo().battles, "20px 黑体", "#000000");
	playerBbattlesTxt.setTransform(300, 355);
	this.battleResultPage.addChild(playerBbattlesTxt);
};

zx_foodies.BattleResultScene.prototype.beforeLeave = function() {
	UserModel.setUserStatus(USER_STATUS.NONE);
	UserModel.resetCompetitorInfo();
	GameModel.setFightKey(null);
};