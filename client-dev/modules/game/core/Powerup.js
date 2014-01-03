zx_foodies.Powerup = $hxClasses["zx_foodies.Powerup"] = function(type) {
	this._type = type;
};
zx_foodies.Powerup.__name__ = ["zx","foodies","Powerup"];
zx_foodies.Powerup.POWERUP_SPRITES = null;
zx_foodies.Powerup.getPowerupBlock = function(type) {
	if(zx_foodies.Powerup.BLOCK_SPRITES == null) zx_foodies.Powerup.initBlockSpriteSheet();
	var powerupData = zx_foodies.DataLoader.getPowerById(type);
	var result = new createjs.BitmapAnimation(zx_foodies.Powerup.BLOCK_SPRITES);
	var frameNum = (powerupData.blockFrame | 0) + 1;
	result.gotoAndStop("powerupblock" + frameNum);
	return result;
}
zx_foodies.Powerup.initBlockSpriteSheet = function() {
	var img;
	var initObject;
	var gdb = new GameplayDB();
	var spritesheetData = gdb.getBlockSpritesheet();
	img = zx_foodies.Assets.getRawImage(spritesheetData.loc);
	initObject = { };
	initObject.images = [img];
	initObject.frames = { width : spritesheetData.frameWidth, height : spritesheetData.frameHeight, regX : (spritesheetData.frameWidth | 0) / 2, regY : (spritesheetData.frameHeight | 0) / 2};
	initObject.animations = { };
	var _g1 = 0, _g = gdb.getAllPowerups().length;
	while(_g1 < _g) {
		var i = _g1++;
		initObject.animations["powerupblock" + (i + 1)] = { frames : i, frequency : 20};
	}
	zx_foodies.Powerup.BLOCK_SPRITES = new createjs.SpriteSheet(initObject);
}
zx_foodies.Powerup.prototype = {
	_type: null
	,__class__: zx_foodies.Powerup
}