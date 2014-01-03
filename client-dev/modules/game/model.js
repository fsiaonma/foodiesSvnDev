var GameModel = Model.Extend({
	fightKey: null,
	currentScore: null,
	currentLevel: null,

	setFightKey: function(key) {
		this.fightKey = key;
	},

	getFightKey: function() {
		return this.fightKey;
	},

	initLevel: function() {
		this.currentScore = 0;
		this.currentLevel = 1;
	},

	isReadyToFight: function(callback) {
		if (APP_DEBUG) {
			callback(MOCK_ISREADYTOFIGHT_RES);
			return ;
		}

		var isReadyToFightITF = new SocketInterface["isReadyToFight"]();
		isReadyToFightITF.params.fightKey = this.fightKey;
		P_Socket.request(isReadyToFightITF.url, isReadyToFightITF.params, function(data) {
			callback? callback(data) : '';
		});
	},

	getGemGrid: function(gemgrid, callback) {
		if (APP_DEBUG) {
			var gridSolvable = false;
			var gemTypeNum = GameModel.currentLevel? zx_foodies.LevelDB[GameModel.currentLevel - 1].gemTypeNum : zx_foodies.Gem.GEMS_COUNT;
			while(!gridSolvable) {
				var arr = new Array();
				for (var i = 0; i < gemgrid.COL_COUNT; ++i) {
					arr[i] = new Array();
					for (var j = 0; j < gemgrid.ROW_COUNT; ++j) {
						arr[i][j] = (Math.random() > 0.5)? Std.random(zx_foodies.Gem.GEMS_COUNT) + 1 : (Std.random(6) + 1) + 100;
						// arr[i][j] = this.generateGem(gemTypeNum);
					}
				}
				var _solver = new zx_foodies.GridSolver();
				var _solvingGroups = _solver.getSolvingGroups(-1, arr);
				if(_solvingGroups.length >= zx_foodies.GemGrid.MIN_GROUPS) gridSolvable = true;
			}
			callback(arr, gemTypeNum);
			return ; 
		}

		if (UserModel.getPlayMode() == PLAY_MODE.SINGLE) {
			var gridSolvable = false;
			var gemTypeNum = GameModel.currentLevel? zx_foodies.LevelDB[GameModel.currentLevel - 1].gemTypeNum : zx_foodies.Gem.GEMS_COUNT;
			while(!gridSolvable) {
				var arr = new Array();
				for (var i = 0; i < gemgrid.COL_COUNT; ++i) {
					arr[i] = new Array();
					for (var j = 0; j < gemgrid.ROW_COUNT; ++j) {
						arr[i][j] = this.generateGem(gemTypeNum);
					}
				}
				var _solver = new zx_foodies.GridSolver();
				var _solvingGroups = _solver.getSolvingGroups(-1, arr);
				if(_solvingGroups.length >= zx_foodies.GemGrid.MIN_GROUPS) gridSolvable = true;
			}
			callback(arr, gemTypeNum);
		} else if (UserModel.getPlayMode() == PLAY_MODE.BATTLE) {
			var self = this;
			(function() {
				var callFunc = arguments.callee;
				var inside = this;
				setTimeout(function() {
					var toFightITF = new SocketInterface["toFight"]();
					toFightITF.params.fightKey = self.fightKey;
					P_Socket.request(toFightITF.url, toFightITF.params, function(data) {
						if (data.success) {
							callback? callback(data.data.field, data.data.count) : '';
						} else {
							callFunc.call(inside);
						}
					});
				}, 500);
			})();
		}
	},

	checkIsFinished: function(callback) {
		if (UserModel.getPlayMode() == PLAY_MODE.BATTLE) {
			(function() {
				var inside = this;
				var callFunc = arguments.callee;
				setTimeout(function() {
					GameModel.isFinished(function(data) {
						if (data.success) {
							if (UserModel.getUserStatus() == USER_STATUS.PLAYING) {
								callback? callback() : '';
							}
						} else {
							callFunc.call(inside);
						}
					});
				}, 10000);
			})();
		}
	},

	isFinished: function(callback) {
		if (APP_DEBUG) {
			callback(MOCK_ISFINISHED_RES);
			return ;
		}

		var isFinishedITF = new SocketInterface["isFinished"]();
		isFinishedITF.params = {
			fightKey: this.fightKey
		}
		P_Socket.request(isFinishedITF.url, isFinishedITF.params, function(data) {
			callback? callback(data) : '';
		});
	},

	gemGridConstrutor: function(gemgrid, callback) {
		var gridSolvable = false;
		while(!gridSolvable) {
			var arr = new Array();
			for (var i = 0; i < gemgrid.COL_COUNT; ++i) {
				arr[i] = new Array();
				for (var j = 0; j < gemgrid.ROW_COUNT; ++j) {
					arr[i][j] = this.generateGem(gemgrid.gemTypeNum);
				}
			}
			var _solver = new zx_foodies.GridSolver();
			var _solvingGroups = _solver.getSolvingGroups(-1, arr);
			if (_solvingGroups.length >= zx_foodies.GemGrid.MIN_GROUPS) {
				gridSolvable = true;
			}
		}
		callback(arr);
	},

	generateGem: function(gemTypeNum) {
		var gemProportion = {
            4: [31, 27, 23, 19],
            5: [27, 23, 20, 17, 13],
            6: [24, 21, 18, 15, 12, 10],
            7: [19, 18, 16, 14, 12, 11, 10]
        };
		
		var gemType;
		var rand = Math.ceil(Math.random() * (new Date().getTime())) % 100;
        var temp = 0;
        var proportion = gemProportion[gemTypeNum];

        for(var k = 0, len = proportion.length; k < len; k++) {
            if(rand >= temp && rand < temp + proportion[k]) {
            	gemType = k + 1;
            }
            temp += proportion[k];
        }

        return gemType;
	},

	getScore: function(gemTypeNum, eliminateGems, callback) {
		var gemScore =  {
            4: [10, 12, 14, 18],
            5: [20, 26, 32, 38, 45],
            6: [30, 36, 43, 52, 60, 70],
            7: [40, 50, 60, 70, 80, 90, 100]
        };

        var proportion = gemScore[gemTypeNum];
		var score = 0;

		if (UserModel.getPlayMode() == PLAY_MODE.SINGLE) {
			for (var i = 0; i < gemTypeNum; ++i) {
				score += (eliminateGems[(i + 1) +'']);
			}

			this.currentScore += score; 
			var self = this;
			(function() {
				var targetScore = zx_foodies.LevelDB[self.currentLevel - 1].scoreRequired;
				if (self.currentScore > targetScore) {
					if (self.currentLevel < zx_foodies.LevelDB.length) {
						self.currentScore -= targetScore
						++self.currentLevel;
					} else {
						self.currentScore = zx_foodies.LevelDB[self.currentLevel - 1].scoreRequired;
					}
					arguments.callee();
				}
			})();

			callback({score: this.currentScore, level: this.currentLevel});
		} else if (UserModel.getPlayMode() == PLAY_MODE.BATTLE) {
			if (APP_DEBUG) {
				var scoreStr = '';
				for (var i = 0; i < gemTypeNum; ++i) {
					scoreStr += '' + (((10000 + Number(i + 1)) + '').substr(1)) + (((10000 + eliminateGems[i + 1]) + '').substr(1));
				}
				SceneRouter.battleResultScene.showResult(MOCK_BATTLE_RESULT);
				return ;
			}

			var scoreStr = '';
			for (var i = 0; i < gemTypeNum; ++i) {
				scoreStr += '' + (((10000 + Number(i + 1)) + '').substr(1)) + (((10000 + eliminateGems[i + 1]) + '').substr(1));
			}

			var postResultITF = new SocketInterface["postResult"]();
			postResultITF.params = {
				result: scoreStr,
				fightKey: this.fightKey
			}

			var self = this;
			P_Socket.request(postResultITF.url, postResultITF.params, function(data) {
				if (data.success) {
					(function() {
						var callFunc = arguments.callee;
						var inside = this;
						setTimeout(function() {
							var isFinishCalITF = new SocketInterface["isFinishCal"]();
							isFinishCalITF.params = {
								fightKey: self.fightKey
							},
							P_Socket.request(isFinishCalITF.url, isFinishCalITF.params, function(data) {
								if (!data.success) {
									callFunc.call(inside);
								}
							});
						}, 1000);
					})();
				}
			});
		}
	}
});