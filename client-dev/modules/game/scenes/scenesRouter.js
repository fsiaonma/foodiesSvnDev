var SceneRouter = SceneRouter || {
	sessionScene: null,
	scoreScene: null,
	battleResultScene: null,

	toSessionScene: function(game, listeners, data) {
		this._reset();
		this.sessionScene = new zx_foodies.SessionScene(data);
		this._bindEvents(game, this.sessionScene, listeners);
		zx_foodies.Game._stage.addChild(this.sessionScene);
	},

	toScoreScene: function(game, listeners, data) {
		this._reset();
		this.scoreScene = new zx_foodies.ScoreScene(data);
		this._bindEvents(game, this.scoreScene, listeners);
		zx_foodies.Game._stage.addChild(this.scoreScene);
	},
	
	toBattleResultScene: function(game, listeners, data) {
		this._reset();
		this.battleResultScene = new zx_foodies.BattleResultScene(data);
		this._bindEvents(game, this.battleResultScene, listeners);
		zx_foodies.Game._stage.addChild(this.battleResultScene);
	},

	_reset: function() {
		if (this.sessionScene) {
			zx_foodies.Game._stage.removeChild(this.sessionScene);
			this.sessionScene = null;
		}
		if (this.scoreScene) {
			zx_foodies.Game._stage.removeChild(this.scoreScene);
			this.scoreScene = null;
		}
		if (this.battleResultScene) {
			zx_foodies.Game._stage.removeChild(this.battleResultScene);
			this.battleResultScene = null;
		}
	},

	_bindEvents: function(game, scene, listeners) {
		for (var i in listeners) {
			scene[i] = $bind(game, listeners[i]);
		}
	}
}