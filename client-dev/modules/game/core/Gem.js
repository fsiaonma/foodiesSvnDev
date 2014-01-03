zx_foodies.Gem = $hxClasses["zx_foodies.Gem"] = function(type) {
	this._stopAt = -1;
	this._isAlive = true;
	this._hasJustCreated = true;
	this._isFocusFaded = false;
	this._isZenGlow = false;
	this._isHintGlow = false;
	this._powerup = -1;
	createjs.Container.call(this);
	this._speed = zx_foodies.Gem.INITIAL_SPEED;
	this._isInPlace = false;
	this._gemType = type;
	this.onclick = $bind(this,this.handleClick);

	if (type >= zx_foodies.Gem.PowerupIndex) {
		zx_foodies.Powerup.initBlockSpriteSheet();
		this._powerup = type % 100;
		if(this._powerup == 3) {
			this._powerup = 2;
		}
		this._gemBMP = zx_foodies.Powerup.getPowerupBlock(this._powerup);
	} else {
		this._gemBMP = new createjs.BitmapAnimation(zx_foodies.Gem._gemSpriteSheet);
		this._gemBMP.gotoAndStop("gem" + type);
	}
	
	this.addChild(this._gemBMP);
};

zx_foodies.Gem.__name__ = ["zx","foodies","Gem"];
zx_foodies.Gem._gemSpriteSheet = null;
zx_foodies.Gem._explodeSpriteSheet = null;
zx_foodies.Gem._lastClickPos = null;

zx_foodies.Gem.createGem = function(type,grid) {
	if(zx_foodies.Gem._gemSpriteSheet == null || (GameModel.currentLevel - this.lastLevel > 0)) {
		var img;
		var initObject;
		var imgUrl;
		if (GameModel.currentLevel) {
			imgUrl = zx_foodies.LevelDB[GameModel.currentLevel - 1].img;
		} else {
			imgUrl = NetWordGem[(Std.random(4) + 1) + ''];	
		}
        console.log(imgUrl);
		this.lastLevel = GameModel.currentLevel;
		img = zx_foodies.Assets.getRawImage(imgUrl);
		initObject = { };
		initObject.images = [img];
		initObject.frames = {
			width : zx_foodies.Gem.GEM_SIZE, 
			height : zx_foodies.Gem.GEM_SIZE, 
			regX : (zx_foodies.Gem.GEM_SIZE) / 2, 
			regY : (zx_foodies.Gem.GEM_SIZE) / 2
		};
		initObject.animations = { };
		var _g1 = 0, _g = zx_foodies.Gem.GEMS_COUNT;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["gem" + (i + 1)] = { frames : i, frequency : 20};
			initObject.animations["glow" + (i + 1)] = { frames : zx_foodies.Gem.SHEET_GLOW + i, frequency : 20};
			initObject.animations["gem_cover" + (i + 1)] = { frames : zx_foodies.Gem.SHEET_COVER + i, frequency : 20};
			initObject.animations["glow_cover" + (i + 1)] = { frames : zx_foodies.Gem.SHEET_COVER_GLOW + i, frequency : 20};
		}
		zx_foodies.Gem._gemSpriteSheet = new createjs.SpriteSheet(initObject);
		img = zx_foodies.Assets.getRawImage("images/gems/poof.png");
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : img.height, height : img.height, regX : img.height / 2, regY : img.height / 2};
		initObject.animations = { };
		initObject.animations.explode = { frames : [0,1,2,3,4], frequency : 1, next : false};
		zx_foodies.Gem._explodeSpriteSheet = new createjs.SpriteSheet(initObject);
	}
	var newGem = new zx_foodies.Gem(type);
	newGem._grid = grid;
	return newGem;
}
zx_foodies.Gem.__super__ = createjs.Container;
zx_foodies.Gem.prototype = $extend(createjs.Container.prototype,{
	getSpeed: function() {
		return this._speed;
	}
	,getPowerup: function() {
		return this._powerup;
	}
	,getType: function() {
		return this._gemType;
	}
	,isRelevantForSolve: function() {
		return this._isInPlace || this._hasJustCreated;
	}
	,isInPlace: function() {
		return this._isInPlace;
	}
	,setCol: function(col) {
		this._col = col;
		this.name = "gem" + this._row + "," + this._col;
	}
	,setRow: function(row) {
		this._row = row;
		this.name = "gem" + this._row + "," + this._col;
	}
	,getCol: function() {
		return this._col;
	}
	,getRow: function() {
		return this._row;
	}
	,isAlive: function() {
		return this._isAlive;
	}
	,destroy: function() {
		if(!this._isInPlace) {
			this._isInPlace = true;
			this._speed = 0;
		}
		if(this._gemBMP != null) createjs.Tween.removeTweens(this._gemBMP);
		if(this._glowBMP != null) createjs.Tween.removeTweens(this._glowBMP);
		if(this._coverBMP != null) createjs.Tween.removeTweens(this._coverBMP);
		if(this._powerupBMP != null) createjs.Tween.removeTweens(this._powerupBMP);
	}
	,dropGemAbove: function() {
		var gemAbove = this._grid.getGemAbove(this);
		if(gemAbove != null) gemAbove.drop();
	}
	,drop: function() {
		if(this._gemBMP.visible) {
			if(this._isZenGlow) this.stopZenGlow();
			var landAt = this._grid.ROW_COUNT - 1;
			if(this._row != landAt) {
				var gemToLandOn = this._grid.getGemBelow(this);
				while(gemToLandOn != null && !gemToLandOn.isAlive() && gemToLandOn.getRow() != landAt) gemToLandOn = this._grid.getGemBelow(gemToLandOn);
				if(gemToLandOn != null) {
					var landPos = Lambda.indexOf(this._grid.gems[this._col],gemToLandOn);
					landAt = this._grid.ROW_COUNT - (this._grid.gems[this._col].length - (landPos + 1)) - 2;
				}
			}
			this._isInPlace = false;
			this._speed = 0.001;
			if(landAt > this._stopAt) {
				this._stopAt = landAt;
				this._stopAtY = landAt * zx_foodies.Gem.GEM_SIZE;
			}
			this.setRow(this._stopAt);
			this.onTick = $bind(this,this.handleTick);
			zx_foodies.Utils.waitAndCall(this,10 + Std.random(140),$bind(this,this.dropGemAbove));
		}
	}
	,changeType: function(toType,animated) {
		if(animated == null) animated = false;
		if(!this._isHintGlow && !this._isZenGlow && animated) {
			this.initGlow();
			this._glowBMP.alpha = 1;
			createjs.Tween.get(this._glowBMP).to({ alpha : 0},300,createjs.Ease.sineIn);
		}
		this._gemType = toType;
		createjs.Tween.removeTweens(this._gemBMP);
		this._gemBMP.gotoAndStop("gem" + toType);
		this._gemBMP.alpha = 1;
		if(this._isFocusFaded) this._gemBMP.alpha = zx_foodies.Gem.FOCUS_FADE;
		if(this._glowBMP != null) this._glowBMP.gotoAndStop("glow" + toType);
		if(this._coverBMP != null) {
			if(this._isHintGlow || this._isZenGlow) this._coverBMP.gotoAndStop("glow_cover" + toType); else this._coverBMP.gotoAndStop("gem_cover" + toType);
		}
	}
	,setNotInPlace: function() {
		this._isInPlace = false;
	}
	,handleRemove: function() {
		if(this.onRemove != null) {
			this.onRemove(this);
			this.onRemove = null;
			this._gemBMP.stop();
		}
	}
	,explode: function(rearrange) {
		if(this.onExplode != null) {
			this.onExplode(this, rearrange);
			this.onExplode = null;
			this._isAlive = false;
			var myParent = this.parent;
			if(myParent != null) {
				myParent.removeChild(this);
				myParent.addChild(this);
			}
			this.removeChild(this._gemBMP);
			this.stopHintGlow();
			this.stopZenGlow(true);
			this.removeChild(this._glowBMP);
			if(this._coverBMP != null) {
				if(this._coverBMP.parent != null) this.removeChild(this._coverBMP);
				this._coverBMP = null;
			}
			if(this._powerupBMP != null) {
				if(this._powerupBMP.parent != null) this.removeChild(this._powerupBMP);
				this._powerupBMP = null;
			}
			this._gemBMP = new createjs.BitmapAnimation(zx_foodies.Gem._explodeSpriteSheet);
			this._gemBMP.gotoAndPlay("explode");
			this._gemBMP.onAnimationEnd = $bind(this,this.handleRemove);
			this.addChild(this._gemBMP);
		}
	}
	,stopFocusFade: function() {
		if(this._isFocusFaded) {
			this._isFocusFaded = false;
			createjs.Tween.removeTweens(this._gemBMP);
			createjs.Tween.get(this._gemBMP).to({ alpha : 1},200);
		}
	}
	,startFocusFade: function(force) {
		if(force == null) force = false;
		this._isFocusFaded = true;
		if(force) {
			createjs.Tween.removeTweens(this._gemBMP);
			createjs.Tween.get(this._gemBMP).to({ alpha : zx_foodies.Gem.FOCUS_FADE},200);
		} else this._gemBMP.alpha = zx_foodies.Gem.FOCUS_FADE;
	}
	,alphaFade: function() {
		if(this._isFocusFaded) return;
		this._gemBMP.alpha = zx_foodies.Gem.TAP_ALPHA;
		createjs.Tween.removeTweens(this._gemBMP);
		createjs.Tween.get(this._gemBMP).to({ alpha : 1},750);
	}
	,handleTick: function(elapsed) {
		this._speed += zx_foodies.Gem.GRAVITY * elapsed;
		this.y += this._speed * elapsed;
		if(this.y >= this._stopAtY) {
			this.onTick = null;
			this.y = this._stopAtY;
			this._stopAt = -1;
			this._speed = 0;
			this._isInPlace = true;
			if(this.onLand != null) this.onLand(this);
		}
	}
	,handleClick: function() {
		if(zx_foodies.Gem._lastClickTime + zx_foodies.Gem.CLICK_THRESH_TIME >= createjs.Ticker.getTime(true)) {
			var mouse = new createjs.Point(this.getStage().mouseX,this.getStage().mouseY);
			var dist = Math.abs(mouse.x - zx_foodies.Gem._lastClickPos.x);
			dist += Math.abs(mouse.y - zx_foodies.Gem._lastClickPos.y);
			if(dist <= zx_foodies.Gem.CLICK_THRESH_DIST) return;
		}
		zx_foodies.Gem._lastClickTime = createjs.Ticker.getTime(true);
		zx_foodies.Gem._lastClickPos = new createjs.Point(this.getStage().mouseX,this.getStage().mouseY);
		if(this._gemBMP != null && this._gemBMP.alpha == 1) this._gemBMP.alpha = zx_foodies.Gem.TAP_ALPHA;
		if(this.onGemClick != null) this.onGemClick(this);
		if(this.onPowerupActivated != null) {
			if(this._powerup != -1) this.onPowerupActivated(this);
		}
	}
	,setPowerup: function(type,force) {
		if(force == null) force = false;
		this._powerup = type;
		// this._powerupBMP = zx_foodies.Powerup.getPowerup(this._powerup);
		// if(force) this._powerupBMP.alpha = 1; else {
		// 	this._powerupBMP.alpha = 0;
		// 	createjs.Tween.get(this._powerupBMP).to({ alpha : 1},200);
		// }
		// this.addChild(this._powerupBMP);
	}
	,coverGlyph: function() {
		this._coverBMP = new createjs.BitmapAnimation(zx_foodies.Gem._gemSpriteSheet);
		if(this._isHintGlow || this._isZenGlow) this._coverBMP.gotoAndStop("glow_cover" + this._gemType); else this._coverBMP.gotoAndStop("gem_cover" + this._gemType);
		this._coverBMP.alpha = 0;
		this.addChild(this._coverBMP);
		createjs.Tween.get(this._coverBMP).to({ alpha : this._gemBMP.alpha},100);
	}
	,glowPulse: function() {
		createjs.Tween.get(this._glowBMP).to({ alpha : 1},zx_foodies.Gem.PULSE_TIME).to({ alpha : 0},zx_foodies.Gem.PULSE_TIME).call($bind(this,this.glowPulse));
	}
	,initGlow: function() {
		if(this._glowBMP == null) {
			this._glowBMP = new createjs.BitmapAnimation(zx_foodies.Gem._gemSpriteSheet);
			this._glowBMP.gotoAndStop("glow" + this._gemType);
			if(this._powerupBMP != null) this.addChildAt(this._glowBMP,this.getChildIndex(this._powerupBMP)); else this.addChild(this._glowBMP);
			this._glowBMP.alpha = 0;
		}
	}
	,stopZenGlow: function(force) {
		if(force == null) force = false;
		if(this._isZenGlow) {
			this._isZenGlow = false;
			createjs.Tween.removeTweens(this._glowBMP);
			if(force) this._glowBMP.alpha = 0; else createjs.Tween.get(this._glowBMP).to({ alpha : 0},80);
		}
	}
	,startZenGlow: function(force) {
		if(force == null) force = false;
		this.initGlow();
		if(!this._isZenGlow) {
			this._isZenGlow = true;
			if(force) this._glowBMP.alpha = 1; else createjs.Tween.get(this._glowBMP).to({ alpha : 1},120);
		}
	}
	,stopHintGlow: function() {
		if(this._isHintGlow) {
			this._isHintGlow = false;
			createjs.Tween.removeTweens(this._glowBMP);
			this._glowBMP.alpha = 0;
		}
	}
	,startHintGlow: function() {
		this.initGlow();
		if(!this._isHintGlow) {
			this._isHintGlow = true;
			this.glowPulse();
		}
	}
	,_stopAtY: null
	,_stopAt: null
	,_speed: null
	,_isAlive: null
	,_isInPlace: null
	,_hasJustCreated: null
	,_isFocusFaded: null
	,_glowPulseTween: null
	,_isZenGlow: null
	,_isHintGlow: null
	,_powerup: null
	,_powerupBMP: null
	,_coverBMP: null
	,_glowBMP: null
	,_gemBMP: null
	,_gemType: null
	,_col: null
	,_row: null
	,_grid: null
	,onRemove: null
	,onLand: null
	,onPowerupActivated: null
	,onExplode: null
	,onGemClick: null
	,__class__: zx_foodies.Gem
});