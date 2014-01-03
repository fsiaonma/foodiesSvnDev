zx_foodies.Persistence = $hxClasses["zx_foodies.Persistence"] = function() {
};
zx_foodies.Persistence.__name__ = ["zx","foodies","Persistence"];
zx_foodies.Persistence.localStorageSupported = function() {
	var result = null;
	try {
		localStorage.setItem("test","test");
		localStorage.removeItem("test");
		result = true;
	} catch( e ) {
		result = false;
	}
	return result;
}
zx_foodies.Persistence.getValue = function(key) {
	if(!zx_foodies.Persistence.available) return "0";
	var val = localStorage[zx_foodies.Persistence.GAME_PREFIX + key];
	return val;
}
zx_foodies.Persistence.setValue = function(key,value) {
	if(!zx_foodies.Persistence.available) return;
	localStorage[zx_foodies.Persistence.GAME_PREFIX + key] = value;
}
zx_foodies.Persistence.clearAll = function() {
	if(!zx_foodies.Persistence.available) return;
	localStorage.clear();
}
zx_foodies.Persistence.prototype = {
	__class__: zx_foodies.Persistence
}