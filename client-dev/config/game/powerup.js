/**
 * ...
 * @author Danny Marcowitz
 */
 var powerup_blocks_spritesheet = {
 	"loc": images["powerupblocks"]? images["powerupblocks"] : "images/gems/powerup_blocks.png", 
 	"frameWidth": zx_foodies.Powerup.GEM_SIZE, 
 	"frameHeight": zx_foodies.Powerup.GEM_SIZE};

 var allPowerups =
 	{"powerups": [{
		"id": "1",
		"name": "bomb_blast", //lightningbolt
		"blockFrame": 0,
		"isActive": "true",
		"spreeToActivate": 40,
	}, {
		"id": "2",
		"name": "lightningbolt", //specialSight
		"blockFrame": 1,
		"isActive": "true",
		"spreeToActivate": 40,
	}, {
		"id": "3",
		"name": "specialSight", //colorSplash
		"blockFrame": 2,
		"isActive": "true",
		"spreeToActivate": 40,
	}, {
		"id": "4",
		"name": "colorBlast", //rearrange
		"blockFrame": 3,
		"isActive": "true",
		"spreeToActivate": 30,
	}, {
		"id": "5",
		"name": "colorSplash", //colorBlast
		"blockFrame": 4,
		"isActive": "true",
		"spreeToActivate": 40,
	}, {
		"id": "6",
		"name": "rearrange", //rearrange
		"blockFrame": 5,
		"isActive": "true",
		"spreeToActivate": 30,
	}]
}

function GameplayDB() {}

GameplayDB.prototype.getAllPowerups = function() {
	return allPowerups.powerups;
}

GameplayDB.prototype.getBlockSpritesheet = function() {
	return powerup_blocks_spritesheet;
}
