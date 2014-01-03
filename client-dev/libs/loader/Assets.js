var Assets = function() {
};
Assets.__name__ = ["zx","foodies","Assets"];
Assets.loader = function() {
	if(Assets._loader == null) {
		Assets._loader = new createjs.PreloadJS();
		Assets._loader.initialize(true);
		Assets._loader.onFileLoad = Assets.handleFileLoaded;
		Assets._loader.onFileError = Assets.handleLoadError;
		Assets._loader.setMaxConnections(10);
	}
	return Assets._loader;
}
Assets.loadAndCall = function(uri,callbackFunc) {
	Assets.loader().loadFile(uri);
	Assets._loadCallbacks[uri] = callbackFunc;
}
Assets.loadAll = function() {
	if(Assets._useLocalStorage) Assets.loadFromLocalStorage(manifest);
	if(manifest.length == 0) {
		if(Assets.onLoadAll != null) Assets.onLoadAll();
	}
	Assets.loader().onProgress = Assets.handleProgress;
	Assets.loader().onFileLoad = Assets.manifestFileLoad;
	Assets.loader().onFileError = Assets.onErrorHandler;
	Assets.loader().loadManifest(manifest);
	Assets.loader().load();
}
Assets.manifestFileLoad = function(event) {
	if (event.type == "image") { 
		images[event.id] = event.result; 
		if(event.id == 'users' || event.id == 'othImages') {
		    Assets.getImageWithCanvas(event.id);
		}
	} else {
		console.log("type error " + event.type);
	}
	if(Assets._useLocalStorage && event != null) {
		var utils = new ddjsutils();
		try {
			var fileName = event.src;
			if(HxOverrides.substr(fileName,fileName.length - 3,null) == "jpg") return;
			Persistence.setValue(event.src,utils.getBase64Image(event.result));
		} catch( err ) {
		}
	}
}
Assets.loadFromLocalStorage = function(manifest) {
	var entriesToRemove = new Array();
	var _g1 = 0, _g = manifest.length;
	while(_g1 < _g) {
		var i = _g1++;
		var entry = manifest[i];
		var value = Persistence.getValue(entry);
		if(value != null) {
			var bmp = new createjs.Bitmap("data:image/png;base64," + value);
			Assets._cacheData[entry] = bmp.image;
			entriesToRemove.push(manifest[i]);
		}
	}
	var _g1 = 0, _g = entriesToRemove.length;
	while(_g1 < _g) {
		var j = _g1++;
		HxOverrides.remove(manifest,entriesToRemove[j]);
	}
}
Assets.handleProgress = function(event) {
	Assets.loaded = event.loaded;
	if(event.loaded == event.total) {
		Assets.loader().onProgress = null;
		Assets.onLoadAll();
	}
}
Assets.handleLoadError = function(event) {
	console.log('load error');
}
Assets.onErrorHandler = function() {
	console.log('error');
}
Assets.handleFileLoaded = function(event) {
	if(event != null) {
		Assets._cacheData[event.src] = event.result;
		var callbackFunc = Reflect.field(Assets._loadCallbacks,event.src);
		if(callbackFunc != null) callbackFunc();
	}
}
Assets.getAsset = function(uri) {
	var cache = Reflect.field(Assets._cacheData,uri);
	if(cache == null) {
		if(Assets.loader().getResult(uri) != null) {
			cache = Assets.loader().getResult(uri).result;
			Assets._cacheData[uri] = cache;
		}
	}
	return cache;
}
Assets.getRawImage = function(uri) {
	var cache = Assets.getAsset(uri);
	if(cache == null) {
		var bmp = new createjs.Bitmap(uri);
		Assets._cacheData[uri] = bmp.image;
		cache = bmp.image;
		null;
	}
	return cache;
}
Assets.getImage = function(uri,mouseEnabled) {
	if(mouseEnabled == null) mouseEnabled = false;
	var result = new createjs.Bitmap(Assets.getRawImage(uri));
	result.mouseEnabled = mouseEnabled;
	return result;
}
Assets.getImageWithCanvas = function(id) {
    if(images[id]) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var imgData = imagesData[id];
        for(var i = 0, len = imgData.length;i < len;i++) {
            canvas.width = 0;
            canvas.width = imgData[i].frame.w;
            canvas.height = imgData[i].frame.h;
            ctx.drawImage(images[id], imgData[i].frame.x, imgData[i].frame.y, imgData[i].frame.w, imgData[i].frame.h,
                            0, 0, imgData[i].frame.w, imgData[i].frame.h);
            var tmpImg = new Image();
            tmpImg.src = canvas.toDataURL();
            images[imgData[i].filename] = tmpImg;
        }
    }
}
Assets.prototype = {
	__class__: Assets
}