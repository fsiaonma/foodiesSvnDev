var Router = Router || {
	hashConfig: {
		"#user/renderIndex": "renderIndex",
		"#user/renderLogin": "renderLogin",
		"#user/renderRegiest": "renderRegiest",
		"#user/renderFriendsPatten": "renderFriendsPatten",
		"#user/renderChoose": "renderChoose",
		"#user/renderMatching": "renderMatching",
		"#user/renderSearch": "renderSearch",

		"#game/renderGame": "renderGame",
	},

	handleHash: function (url) {
		var hash = (url.indexOf('#') == -1)? "#user/renderIndex" : url.substr(url.indexOf('#'));
		if (!this.hashConfig[hash] || !UserView || !GameView) {
			return ;
		}
		var module = hash.substr(hash.indexOf("#") + 1, hash.indexOf('/') - 1);
		switch (module) {
			case "user": {
				UserView[this.hashConfig[hash]].call(UserView);
				break ;
			}
			case "game": {
				GameView[this.hashConfig[hash]].call(GameView);
				break ;
			}
		}
	},

	goto: function(hash) {
		window.location.hash = hash;
	}
}