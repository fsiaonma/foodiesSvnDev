zx_foodies.Assets = Assets;
zx_foodies.Assets.onLoadAll = null;
zx_foodies.Assets._loader = null;
zx_foodies.Assets._cacheData = { };
zx_foodies.Assets._loadCallbacks = { };
zx_foodies.Assets.loaded = 0;
zx_foodies.Assets._useLocalStorage = false;
zx_foodies.DataLoader = DataLoader;
zx_foodies.Game._viewport = null;
zx_foodies.Game._scale = 1;
zx_foodies.Game._musicPlaying = false;
zx_foodies.Game.MAX_HEIGHT = 768;
zx_foodies.Game.MAX_WIDTH = 432;
zx_foodies.Game.DEBUG = false;
zx_foodies.Gem.GEM_SIZE = 60;
zx_foodies.Gem.GRAVITY = 0.1;
zx_foodies.Gem.INITIAL_SPEED = 5;
zx_foodies.Gem.GEM_1 = 1;
zx_foodies.Gem.GEM_2 = 2;
zx_foodies.Gem.GEM_3 = 3;
zx_foodies.Gem.GEM_4 = 4;
zx_foodies.Gem.GEM_5 = 5;
zx_foodies.Gem.GEMS_COUNT = 7;
zx_foodies.Gem.TAP_ALPHA = 0.3;
zx_foodies.Gem.FOCUS_FADE = 0.4;
zx_foodies.Gem.SHEET_GLOW = 7;
zx_foodies.Gem.SHEET_COVER = 10;
zx_foodies.Gem.SHEET_COVER_GLOW = 15;
zx_foodies.Gem.PULSE_TIME = 400;
zx_foodies.Gem.CLICK_THRESH_TIME = 200;
zx_foodies.Gem.CLICK_THRESH_DIST = 50;
zx_foodies.Gem._lastClickTime = -1;
zx_foodies.Gem.PowerupIndex = 100;
zx_foodies.GemGrid.MIN_GROUPS = 1;
zx_foodies.GemGrid.HINT_INTERVAL = 2500;
zx_foodies.GemGrid.SPECIAL_SIGHT_TIME = 5300;
zx_foodies.GemGrid.SIGHT_STOP_THRESH = 400;
zx_foodies.Persistence.GAME_PREFIX = "BAK";
zx_foodies.Persistence.available = zx_foodies.Persistence.localStorageSupported();
zx_foodies.Powerup.BLOCK_SPRITES = null;
zx_foodies.Powerup.GEM_SIZE = 60;
zx_foodies.SessionScene.SPREE_RESET_INTERVAL = 3000;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
js.Lib.onerror = null;

zx_foodies.BgScale = 1;
zx_foodies.bombPicSize = {
	width: 1024,
	height: 1024
};
