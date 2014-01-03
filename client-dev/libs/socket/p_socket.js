var P_Socket = P_Socket || {
	host: null,
	port: null,
	pomelo: window.pomelo,

	listenerRouter: {
		"" : ""
	},

	connect: function(callback) {
		this.host = SocketInterface.host;
		this.port = SocketInterface.port;

		var sid = cookie.get('FOODIESID');
		var self = this;

		this._queryEntry(function(host, port) {
	        self.pomelo.init({
	            host: host,
	            port: port,
	            log: true
	        }, function() {

	        	var connectITF = new SocketInterface["connect"]();
	        	connectITF.params.s = sid;

	            self.pomelo.request(
	            	connectITF.url, 
	            	connectITF.params, 
		            function(data) {
		            	if (data.success) {
		            		UserModel.setUserInfo({
			        			user_id: data.user_id,
			        			username: data.username,
			        			sex: data.gender,
			        			level: data.level,
			        			battles: data.battles
			        		});
			                self._listenerRouter();
			                callback(data);
		            	} else {
		            		console.log("entryHandler error");
		            	}
		            }
		        );
	        });
	    });
	},

	request: function(type, data, callback) {
		var self = this;
		if(!this.pomelo && cookie.get('FOODIESID')) {
			this.connect(function() {
				self.pomelo.request(type, data, function(data) {
					callback? callback(data) : '';
				});
			})
		} else {
			this.pomelo.request(type, data, function(data) {
				callback? callback(data) : '';
			});
		}
	},

	_listenerRouter: function() {
		this.pomelo.on("onMatchBattle", function(data) {
			if (UserModel.getUserStatus() == USER_STATUS.SEARCHING) {
				GameModel.setFightKey(data.fightKey);
				UserModel.setUserStatus(USER_STATUS.REARY);

				UserModel.setCompetitorInfo({
					user_id: data.fromId,
					username: data.fromName,
					sex: data.fromGender,
					level: data.fromLevel,
					battles: data.fromBattles
				});

				Router.goto("#user/renderMatching");
			}
		});

		this.pomelo.on("onBattleResult", function(data) {
			if (UserModel.getUserStatus() == USER_STATUS.CALCULATE) {
				SceneRouter.battleResultScene.showResult(data);
			}
		});

		var self = this;
		this.pomelo.on("disconnect", function() {
			self.connect(function() {
				console.log("connect success");
			})
		});
	},
	
	_queryEntry: function(callback) {
	    var sid = cookie.get('FOODIESID');
		var self = this;

		var queryEntryITF = new SocketInterface["queryEntry"]();
		queryEntryITF.params.s = sid;

		this.pomelo.init({
			host: this.host,
			port: this.port,
			log: true
		}, function() {
			self.pomelo.request(
				queryEntryITF.url, 
				queryEntryITF.params,
				function(data) {
					self.pomelo.disconnect();
					if(data.code === 500) {
						console.log("query entry error");
						return;
					}
					callback(data.host, data.port);
				}
			);
		});
	}
};