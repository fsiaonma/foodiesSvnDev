zx_foodies.GemGrid = $hxClasses["zx_foodies.GemGrid"] = function() {
	this._shouldPlayDing = false;
	this._groupExplodeBomb = null;
	this._isInSpecialSight = false;
	this._poweredGem = null;
	this._landingTested = false;
	this._hintTime = -1;
	this.COL_COUNT = 7;
	this.ROW_COUNT = 8;
	this.gemTypeNum = GameModel.currentLevel? zx_foodies.LevelDB[GameModel.currentLevel - 1].gemTypeNum : zx_foodies.Gem.GEMS_COUNT;
	this.nextPowerup = null;
	createjs.Container.call(this);
	this.regX = this.getWidth() / 2;
	this.regY = this.getHeight() / 2;
	this.scaleX = this.scaleY = zx_foodies.Game.getScale();
	this.x = zx_foodies.Game.MAX_WIDTH / 2;
	this.y = zx_foodies.Game.MAX_HEIGHT * 2 / 3;
	this.initGemGrid();
	this.onTick = $bind(this,this.handleTick);
};
zx_foodies.GemGrid.__name__ = ["zx","foodies","GemGrid"];
zx_foodies.GemGrid.__super__ = createjs.Container;
zx_foodies.GemGrid.prototype = $extend(createjs.Container.prototype,{
	initGemGrid: function() {
		var self = this;
		GameModel.getGemGrid(this, function(arr, gemTypeNum) {
			self.gemTypeNum = gemTypeNum;
			self.gems = new Array();
			for (var col = 0; col < self.COL_COUNT; ++col) {
				self.gems[col] = new Array();
				self.fillGemCol(col, arr);
			}
			self._solver = new zx_foodies.GridSolver(self);
			var _g1 = 0, _g = self.COL_COUNT;
			while(_g1 < _g) {
				var col = _g1++;
				self.gems[col][self.ROW_COUNT - 1].drop();
			}
		});
	},
	getHeight: function() {
		return this.ROW_COUNT * zx_foodies.Gem.GEM_SIZE;
	}
	,getWidth: function() {
		return this.COL_COUNT * zx_foodies.Gem.GEM_SIZE;
	}
	,getGemBelow: function(gem) {
		var gemIndex = Lambda.indexOf(this.gems[gem.getCol()],gem);
		if(gemIndex != -1) {
			if(gemIndex == this.gems[gem.getCol()].length - 1) return null;
			return this.getGem(gemIndex + 1,gem.getCol());
		}
		return null;
	}
	,getGemAbove: function(gem) {
		var gemIndex = Lambda.indexOf(this.gems[gem.getCol()],gem);
		if(gemIndex != -1) {
			if(gemIndex == 0) return null;
			return this.getGem(gemIndex - 1,gem.getCol());
		}
		return null;
	}
	,terminate: function() {
		createjs.Tween.removeTweens(this);
		var _g1 = 0, _g = this.gems.length;
		while(_g1 < _g) {
			var i = _g1++;
			var _g3 = 0, _g2 = this.gems[i].length;
			while(_g3 < _g2) {
				var j = _g3++;
				this.gems[i][j].destroy();
				createjs.Tween.removeTweens(this.gems[i][j]);
			}
		}
	}
	,handleGemRemove: function(gem) {
		gem.destroy();
		this.removeChild(gem);
	}
	,activateColorBlast: function(gem) {
		var gemType = Std.random(this.gemTypeNum) + 1;
		var _g1 = 0, _g = this.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			var _g3 = 0, _g2 = this.ROW_COUNT;
			while(_g3 < _g2) {
				var row = _g3++;
				if(this.getGem(row,col).getType() == gemType) this.getGem(row,col).explode();
			}
		}
		this.dropNeededGems();
	}
	,activateColorSplash: function() {
		var gemType = Std.random(this.gemTypeNum) + 1;
		var srcType = -1;
		while(srcType == -1) {
			srcType = Std.random(this.gemTypeNum) + 1;
			if(srcType == gemType) srcType = -1;
		}
		var _g1 = 0, _g = this.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			var _g3 = 0, _g2 = this.ROW_COUNT;
			while(_g3 < _g2) {
				var row = _g3++;
				if(this.getGem(row,col).getType() == srcType) {
					this.getGem(row,col).changeType(gemType,true);
				}
			}
		}
	}
	,activateRearrange: function() {
		var _g1 = 0, _g = this.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			var _g3 = 0, _g2 = this.ROW_COUNT;
			while(_g3 < _g2) {
				var row = _g3++;
				this.getGem(row,col).explode(this.getGem(row,col), true);
			}
		}
		var self = this;
		GameModel.gemGridConstrutor(this, function(arr) {
			self.gems = new Array();
			for (var col = 0; col < self.COL_COUNT; ++col) {
				self.gems[col] = new Array();
				self.fillGemCol(col, arr);
			}
			self._solver = new zx_foodies.GridSolver(self);
			var _g1 = 0, _g = self.COL_COUNT;
			while(_g1 < _g) {
				var col = _g1++;
				self.gems[col][self.ROW_COUNT - 1].drop();
			}
		});
	}
	,startSpecialSight: function() {
		this._specialSightEnd = createjs.Ticker.getTime(true) + zx_foodies.GemGrid.SPECIAL_SIGHT_TIME;
		if(!this._isInSpecialSight) {
			this._isInSpecialSight = true;
			var _g1 = 0, _g = this.COL_COUNT;
			while(_g1 < _g) {
				var col = _g1++;
				var _g3 = 0, _g2 = this.ROW_COUNT;
				while(_g3 < _g2) {
					var row = _g3++;
					this.getGem(row,col).startFocusFade();
				}
			}
		}
	}
	,handleEndLightning: function() {
		this.removeChild(this._lightHoriz);
		this.removeChild(this._lightVerti);
		var _g1 = 0, _g = this._lightningAffected.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._lightningAffected[i].explode();
		}
		this.dropNeededGems();
		this.mouseEnabled = true;
	}
	,startLightningBolt: function(gem) {
		this.mouseEnabled = false;
		var img = zx_foodies.Assets.getRawImage("images/gems/lightning.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : img.width, height : img.height, regX : img.width / 2, regY : img.height / 2};
		initObject.animations = { };
		initObject.animations.lightning = { frames : [0,1,0,1,0,1,0,1], frequency : 1.5};
		var sprites = new createjs.SpriteSheet(initObject);

		if(this._lightHoriz == null) {
			this._lightHoriz = new createjs.BitmapAnimation(sprites);
			this._lightHoriz.rotation = 90;
		}
		this._lightHoriz.gotoAndPlay("lightning");
		this._lightHoriz.x = this.getWidth() / 2;
		this._lightHoriz.y = gem.y;
		this.addChild(this._lightHoriz);

		if(this._lightVerti == null) {
			this._lightVerti = new createjs.BitmapAnimation(sprites);
		}
		this._lightVerti.gotoAndPlay("lightning");
		this._lightVerti.onAnimationEnd = $bind(this,this.handleEndLightning);
		this._lightVerti.x = gem.x;
		this._lightVerti.y = this.getHeight() / 2;
		this.addChild(this._lightVerti);

		this._lightningAffected = new Array();
		var _g1 = 0, _g = this.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			if(col == gem.getCol()) continue;
			this._lightningAffected.push(this.getGem(gem.getRow(),col));
		}
		var _g1 = 0, _g = this.ROW_COUNT;
		while(_g1 < _g) {
			var row = _g1++;
			if(row == gem.getRow()) continue;
			this._lightningAffected.push(this.getGem(row,gem.getCol()));
		}
	}
	,handlePowerupActivated: function(gem) {
		var power = gem.getPowerup() || -1;
		var name = zx_foodies.DataLoader.getPowerById(power).name;
		switch(name) {
			case "bomb_blast":
				this.handleBomb(gem);
				break;
			case "lightningbolt":
				this.startLightningBolt(gem);
				this._decorativeSoundActivated = true;
				break;
			case "specialSight":
				this.startSpecialSight();
				break;
			case "colorSplash":
				this.activateColorSplash();
				break;
			case "colorBlast":
				this.activateColorBlast();
				break;
			case "rearrange":
				this.activateRearrange();
			default:
		}
	}
	,handleGemExplode: function(gem, rearrange) {
		HxOverrides.remove(this.gems[gem.getCol()],gem);
		if(this.onGemBlast != null) this.onGemBlast(gem, rearrange);
		this.fillGemCol(gem.getCol());
		var _g1 = 0, _g = gem.getRow() + 1;
		while(_g1 < _g) {
			var i = _g1++;
			this.getGem(i,gem.getCol()).setNotInPlace();
		}
		this._shouldPlayDing = true;
		var session = this.parent;
		this._noteToPlay = session.getSpreePercent() * 9 | 0;
	}
	,handleTick: function() {
		if(this._hintTime != -1) {
			if(createjs.Ticker.getTime(true) >= this._hintTime) {
				// if(this._solvingGroups.length > 0) {
				// 	this._hintTime = -1;
				// 	if(!this._isInSpecialSight) {
				// 		var group = Std.random(this._solvingGroups.length);
				// 		this._hintGroup = this._solvingGroups[group];
				// 		var _g1 = 0, _g = this._hintGroup.length;
				// 		while(_g1 < _g) {
				// 			var i = _g1++;
				// 			console.log('aaa');
				// 			this._hintGroup[i].startHintGlow();
				// 		}
				// 	}
				// } else this.addSolvingGroups(zx_foodies.GemGrid.MIN_GROUPS);
				if (this._solvingGroups.length <= 0) {
					this.addSolvingGroups(zx_foodies.GemGrid.MIN_GROUPS);
				}
			}
		}
		if(this._isInSpecialSight) {
			if(createjs.Ticker.getTime(true) >= this._specialSightEnd) {
				this._isInSpecialSight = false;
				var _g1 = 0, _g = this.COL_COUNT;
				while(_g1 < _g) {
					var col = _g1++;
					var _g3 = 0, _g2 = this.ROW_COUNT;
					while(_g3 < _g2) {
						var row = _g3++;
						this.getGem(row,col).stopZenGlow();
						this.getGem(row,col).stopFocusFade();
					}
				}
				this._hintTime = createjs.Ticker.getTime(true) + zx_foodies.GemGrid.HINT_INTERVAL;
			}
		}
	}
	,dropNeededGems: function() {
		var _g1 = 0, _g = this.COL_COUNT;
		while(_g1 < _g) {
			var col = _g1++;
			var inPlace = true;
			var row = this.ROW_COUNT - 1;
			while(inPlace && row >= 0) {
				inPlace = this.getGem(row,col).isInPlace();
				inPlace = inPlace && this.getGem(row,col).isAlive();
				row--;
			}
			row++;
			if(row == 0 && inPlace) continue;
			if(row >= 0 && row < this.ROW_COUNT) this.getGem(row,col).drop();
		}
	}
	,addSolvingGroups: function(atLeast) {
		for (var i = 0; i < this.COL_COUNT; ++i) {
			for (var j = 0; j < this.ROW_COUNT; ++j) {
				if (this.getGem(j, i).getType() > 99 && this.getGem(j, i) != 103) {
					console.log("return");
					return ;
				}
			}
		}
		while(this._solvingGroups.length < atLeast) {
			var newGroupsToAdd = atLeast - this._solvingGroups.length;
			var _g = 0;
			while(_g < newGroupsToAdd) {
				var i = _g++;
				var randCol = Std.random(this.COL_COUNT - 2) + 1;
				var randRow = Std.random(this.ROW_COUNT - 2) + 1;
				

				if(Std.random(2) == 0) {
					if (this.getGem(randRow + 1,randCol).getType() < this.gemTypeNum) {
						this.getGem(randRow + 1,randCol).changeType(Std.random(this.gemTypeNum) + 1); 
					}
				} else {
					if (this.getGem(randRow - 1,randCol).getType() < this.gemTypeNum) {
						this.getGem(randRow - 1,randCol).changeType(Std.random(this.gemTypeNum) + 1);
					}
				}
				if(Std.random(2) == 0) {
					if (this.getGem(randRow,randCol + 1).getType() < this.gemTypeNum) {
						this.getGem(randRow,randCol + 1).changeType(Std.random(this.gemTypeNum) + 1); 
					}
				} else {
					if (this.getGem(randRow,randCol - 1).getType() < this.gemTypeNum) {
						this.getGem(randRow,randCol - 1).changeType(Std.random(this.gemTypeNum) + 1);
					}
				}
			}
			this._solvingGroups = this._solver.getSolvingGroups();
		}
	}
	,handleGemLand: function(gem) {
		var movingGems = 0;
		var _g1 = 0, _g = this.gems.length;
		while(_g1 < _g) {
			var col = _g1++;
			var _g3 = 0, _g2 = this.gems[col].length;
			while(_g3 < _g2) {
				var row = _g3++;
				if(this.gems[col][row].getSpeed() != 0) movingGems++;
			}
		}
		if(movingGems == 0) {
			if(!this._landingTested) {
				this._landingTested = true;
				this._solvingGroups = this._solver.getSolvingGroups();
				this.addSolvingGroups(zx_foodies.GemGrid.MIN_GROUPS);
				this._hintTime = createjs.Ticker.getTime(true) + zx_foodies.GemGrid.HINT_INTERVAL;
				if(this._isInSpecialSight) {
					if(createjs.Ticker.getTime(true) + zx_foodies.GemGrid.SIGHT_STOP_THRESH >= this._specialSightEnd) this._specialSightEnd = createjs.Ticker.getTime(true) - 1; else {
						if(this._prevSolvingGroups != null) {
							var _g1 = 0, _g = this._prevSolvingGroups.length;
							while(_g1 < _g) {
								var group = _g1++;
								var _g3 = 0, _g2 = this._prevSolvingGroups[group].length;
								while(_g3 < _g2) {
									var i = _g3++;
									if(this._prevSolvingGroups[group][i] != null) this._prevSolvingGroups[group][i].stopZenGlow();
								}
							}
						}
						var _g1 = 0, _g = this._solvingGroups.length;
						while(_g1 < _g) {
							var group = _g1++;
							var _g3 = 0, _g2 = this._solvingGroups[group].length;
							while(_g3 < _g2) {
								var i = _g3++;
								this._solvingGroups[group][i].startZenGlow();
							}
						}
					}
				}
				this._prevSolvingGroups = this._solvingGroups;
				if(this.onReadyForPowerup != null) {
					this.nextPowerup = this.onReadyForPowerup();
				}
			}
		} else this._landingTested = false;
	}
	,handleBomb: function(gem) {
		var img = images.explode;
		var initObject = {
			"animations": {
				"all": {
					"frames": [0, 1, 2, 3, 4, 5, 6, 7, 8]}
				}, 
			"images": [images.explode], 
			"frames": [
				[473, 575, 200, 195, 0, -67, -35], 
				[0, 575, 228, 247, 0, -47, -23], 
				[0, 0, 307, 290, 0, -5, 0], 
				[228, 575, 245, 233, 0, -30, -30], 
				[0, 290, 293, 285, 0, -12, -2], 
				[293, 290, 303, 283, 0, 0, 0], 
				[622, 0, 305, 290, 0, 0, 0], 
				[307, 0, 315, 290, 0, 0, 0], 
				[596, 290, 305, 275, 0, -3, -5]
			]
		}

		var sprites = new createjs.SpriteSheet(initObject);
		this.explode = new createjs.BitmapAnimation(sprites);
		this.explode.regX = zx_foodies.bombPicSize.width / 6;
		this.explode.regY = zx_foodies.bombPicSize.height / 6;
		this.explode.x = gem.x;
		this.explode.y = gem.y;
		this.addChild(this.explode);

		var self = this;
		this.explode.onAnimationEnd = function() {
			self.removeChild(self.explode);
			var col = gem.getCol();
			var row = gem.getRow();
			for (var i = row - 1; i < row + 2; ++i) {
				for (var j = col - 1; j < col + 2; ++j) {
					self.getGem(i, j)? self.getGem(i, j).explode() : '';
				}
			}
			self.dropNeededGems();
		}

		this.explode.gotoAndPlay("all");
	}
	,handleGemClick: function(gem) {
		if(gem._gemType >= zx_foodies.Gem.PowerupIndex) {
			gem.explode();
			this.dropNeededGems();
			return ;
		}
		this._clickedGroup = new Array();
		if(this._solver.isInSolvingGroup(gem,this._clickedGroup)) {
			if(this._isInSpecialSight) {
				var _g1 = 0, _g = this.COL_COUNT;
				while(_g1 < _g) {
					var col = _g1++;
					var _g3 = 0, _g2 = this.ROW_COUNT;
					while(_g3 < _g2) {
						var row = _g3++;
						this.getGem(row,col).stopZenGlow();
					}
				}
			}
			this._decorativeSoundActivated = false;
			var _g1 = 0, _g = this._clickedGroup.length;
			while(_g1 < _g) {
				var i = _g1++;
				this._clickedGroup[i].explode();
			}
			if(!this._decorativeSoundActivated) {
				var effectNum = Std.random(3) + 1;
			}
			if(this._groupExplodeBomb != null) {
				var gemsToExplode = new Array();
				var _g1 = 0, _g = this._clickedGroup.length;
				while(_g1 < _g) {
					var i = _g1++;
					var _g2 = -1;
					while(_g2 < 2) {
						var posx = _g2++;
						var _g3 = -1;
						while(_g3 < 2) {
							var posy = _g3++;
							if(posx == 0 && posy == 0) continue;
							var currGem = this.getGem(this._clickedGroup[i].getRow() + posy,this._clickedGroup[i].getCol() + posx);
							if(currGem != null && !Lambda.has(this._clickedGroup,currGem)) currGem.explode();
						}
					}
				}
				this._groupExplodeBomb = null;
			}
			this.dropNeededGems();
			this._hintTime = -1;
			if(this._hintGroup != null) {
				if(this.getChildIndex(this._hintGroup[0]) != -1) {
					var _g1 = 0, _g = this._hintGroup.length;
					while(_g1 < _g) {
						var i = _g1++;
						this._hintGroup[i].stopHintGlow();
					}
				}
			}
			if(this._shouldPlayDing) {
				this._shouldPlayDing = false;
			}
		} else {
			if(!this._isInSpecialSight) {
				var _g1 = 0, _g = this._clickedGroup.length;
				while(_g1 < _g) {
					var i = _g1++;
					this._clickedGroup[i].alphaFade();
				}
			}
			if(this.onWrongGroup != null) this.onWrongGroup();
		}
	}
	,placePowerup: function() {
		// this._poweredGem.setPowerup(this._powerupType);
	}
	,launchPowerup: function(type) {
		var applicableGems = new Array();
		var _g1 = 0, _g = this._solvingGroups.length;
		while(_g1 < _g) {
			var i = _g1++;
			applicableGems = applicableGems.concat(this._solvingGroups[i]);
		}
		this._poweredGem = null;
		while(this._poweredGem == null) {
			var pos = Std.random(applicableGems.length);
			this._poweredGem = applicableGems[pos];
			if(this._poweredGem.getPowerup() != -1) this._poweredGem = null;
		}
		this._powerupType = type;
		this._poweredGem.coverGlyph();
		return this.localToGlobal(this._poweredGem.x,this._poweredGem.y);
	}
	,getGem: function(row,col) {
		if(row < 0 || row >= this.ROW_COUNT || (col < 0 || col >= this.COL_COUNT)) return null;
		return this.gems[col][row];
	}
	,fillGemCol: function(col, arr) {
		var gemsToAdd = this.ROW_COUNT - this.gems[col].length;
		var _g = this.gems[col].length;
		var gemType;
		while(_g < this.ROW_COUNT) {
			var gemIndex = _g++;
			if (this.nextPowerup != null) {
				gemType = this.nextPowerup + zx_foodies.Gem.PowerupIndex;
				this.nextPowerup = null;
			} else if(arr) {
				gemType = arr[col][gemIndex];
			} else {
				gemType = GameModel.generateGem(this.gemTypeNum);
			}
			var newGem = zx_foodies.Gem.createGem(gemType, this);
			newGem.setRow(gemsToAdd - (gemIndex + 1));
			newGem.setCol(col);
			newGem.x = newGem.getCol() * zx_foodies.Gem.GEM_SIZE + zx_foodies.Gem.GEM_SIZE / 2;
			newGem.y = -this.y;
			newGem.onGemClick = $bind(this,this.handleGemClick);
			newGem.onExplode = $bind(this,this.handleGemExplode);
			newGem.onPowerupActivated = $bind(this,this.handlePowerupActivated);
			newGem.onLand = $bind(this,this.handleGemLand);
			newGem.onRemove = $bind(this,this.handleGemRemove);
			if(this._isInSpecialSight) newGem.startFocusFade(true);
			this.addChild(newGem);
			this.gems[col].unshift(newGem);
		}
	}
	,_noteToPlay: null
	,_shouldPlayDing: null
	,_lightningAffected: null
	,_lightVerti: null
	,_lightHoriz: null
	,_clickedGroup: null
	,_groupExplodeBomb: null
	,_specialSightEnd: null
	,_isInSpecialSight: null
	,_powerupType: null
	,_poweredGem: null
	,_decorativeSoundActivated: null
	,_landingTested: null
	,_hintGroup: null
	,_hintTime: null
	,_prevSolvingGroups: null
	,_solvingGroups: null
	,_solver: null
	,gems: null
	,COL_COUNT: null
	,ROW_COUNT: null
	,onWrongGroup: null
	,onPowerupActivated: null
	,onGemBlast: null
	,onReadyForPowerup: null
	,__class__: zx_foodies.GemGrid
});