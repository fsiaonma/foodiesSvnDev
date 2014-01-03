zx_foodies.ScoreScene = $hxClasses["zx_foodies.ScoreScene"] = function(data) {
	this.scorePage = new libSingleConclusion.conclusionfor1();
	this.scorePage.regX = PIC_SIZE.WIDTH / 2;
	this.scorePage.regY = PIC_SIZE.HEIGHT / 2;
	this.scorePage.y = zx_foodies.Game.MAX_HEIGHT / 2;
	this.scorePage.x = zx_foodies.Game.MAX_WIDTH / 2;
	this.addChild(this.scorePage);

	this.currentLevel = data.level;
	this.currentScore = data.score;

	this.scorePatten = [];
	this.levelNum = [];
	this.level = [];

	this.initPage();
	this.showLevel();
	this.showScore();

	this.initEvent();
};

zx_foodies.ScoreScene.prototype = new createjs.Container();

zx_foodies.ScoreScene.prototype.initPage = function() {
	// 分数
	this.scorePage.x_s.visible = false;
	this.scorePage.num_9.visible = false;
	this.scorePage.num_8.visible = false;
	this.scorePage.num_7.visible = false;
	this.scorePage.num_6.visible = false;
	this.scorePage.num_5.visible = false;
	this.scorePage.num_4.visible = false;
	this.scorePage.num_3.visible = false;
	this.scorePage.num_2.visible = false;
	this.scorePage.num_1.visible = false;
	this.scorePage.num_0.visible = false;

	var self = this;
	(function() {
		for (var i = 0; i < 4; ++i) {
			var container = new createjs.Container();
			var img = new createjs.Bitmap(images["conclusionfor1number0"]);
			img.setTransform(-51.4,-61.5);
			container.addChild(img);
			container.setTransform(170 + 20 * i,516,0.521,0.521,0,0,0,-23.4,-35.9);
			self.scorePage.addChild(container);
			container.visible = false;
			self.scorePatten[i] = container;
		}

		var container = new createjs.Container();
		var img = new createjs.Bitmap(images["conclusionfor1numberx"]);
		img.setTransform(-30.9,-61.5);
		container.addChild(img);
		container.setTransform(250,516.1,0.459,0.481,0,0,0,-18.4,-36.4);
		container.visible = false;
		self.scorePatten[4] = container;
		self.scorePage.addChild(container);

		for (var i = 5; i < 9; ++i) {
			var container = new createjs.Container();
			var img = new createjs.Bitmap(images["conclusionfor1number0"]);
			img.setTransform(-51.4,-61.5);
			container.addChild(img);
			container.setTransform(170 + 22 * i,516,0.521,0.521,0,0,0,-23.4,-35.9);
			self.scorePage.addChild(container);
			container.visible = false;
			self.scorePatten[i] = container;
		}
	})();
	
	// 等级
	this.levelNum[0] = this.scorePage.num_2.instance_7;
	this.levelNum[1] = this.scorePage.num_3.instance_6;

	this.levelNum[0].image = images["conclusionfor1number0"];
	this.levelNum[1].image = images["conclusionfor1number0"];

	this.level[0] = this.scorePage.num_2;
	this.level[1] = this.scorePage.num_3;
};

zx_foodies.ScoreScene.prototype.showLevel = function() {
	var levelStr = this.currentLevel + '';
	var levelIndex = 1;
	for (var i = levelStr.length - 1; i >= 0; --i) {
		this.levelNum[levelIndex].image = images["conclusionfor1number" + levelStr[i]];
		--levelIndex;
	}
	this.level[0].visible = true;
	this.level[1].visible = true;
};

zx_foodies.ScoreScene.prototype.showScore = function() {
	var currentScoreStr = this.currentScore + '';

	var scoreIndex = 3;
	for (var i = currentScoreStr.length - 1; i >= 0; --i) {
		this.scorePatten[scoreIndex].children[0].image = images["conclusionfor1number" + currentScoreStr[i]];
		--scoreIndex;
	}

	var targetScoreStr = zx_foodies.LevelDB[GameModel.currentLevel - 1].scoreRequired + '';
	var scoreIndex = 8;
	for (var i = targetScoreStr.length - 1; i >= 0; --i) {
		this.scorePatten[scoreIndex].children[0].image = images["conclusionfor1number" + targetScoreStr[i]];
		--scoreIndex;
	}

	for(var i = 0; i < 9; ++i) {
		this.scorePatten[i].visible = true;
	}
};

zx_foodies.ScoreScene.prototype.initEvent = function() {
	var self = this;
	this.scorePage.backToIndex.onClick = function() {
		Router.goto("#user/renderIndex");
	}
	this.scorePage.continueFight.onClick = function() {
		self.onContinueFight();
	}
};