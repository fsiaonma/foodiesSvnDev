var DataLoader = function() {
};
DataLoader.__name__ = ["zx","foodies","DataLoader"];
DataLoader.getPowerupByName = function(name) {
	var result = null;
	var gdb = new GameplayDB();
	var allPowerups = gdb.getAllPowerups();
	var _g1 = 0, _g = allPowerups.length;
	while(_g1 < _g) {
		var currPowerup = _g1++;
		var powerup = allPowerups[currPowerup];
		if(powerup.name == name) {
			result = powerup;
			break;
		}
	}
	return result;
}
DataLoader.getPowerById = function(id) {
	var result = null;
	var gdb = new GameplayDB();
	var allPowerups = gdb.getAllPowerups();
	var _g1 = 0, _g = allPowerups.length;
	while(_g1 < _g) {
		var currPowerup = _g1++;
		var powerup = allPowerups[currPowerup];
		if((powerup.id | 0) == id) {
			result = powerup;
			break;
		}
	}
	return result;
}
DataLoader.getAvailablePowerups = function(activeOnly) {
	var gdb = new GameplayDB();
	var allPowerups = gdb.getAllPowerups();
	return allPowerups;
}
DataLoader.getAvailPassivePowerupIds = function() {
	var powerups = DataLoader.getAvailablePowerups();
	var result = new Array();
	powerups.map(function(item) {
		result.push(item.id);
	})
	return result;
}
DataLoader.prototype = {
	__class__: DataLoader
}