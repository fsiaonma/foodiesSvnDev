var UserModel = Model.Extend({
	_playMode: null,
	userInfo: {},
	competitorInfo: {},
	userStatus: null,

	setUserStatus: function(status) {
		this.userStatus = status;
	},

	getUserStatus: function() {
		return this.userStatus;
	},

	setCompetitorInfo: function(data) {
		for (var i in data) {
			this.competitorInfo[i] = data[i];
		}
	},

	getCompetitorInfo: function() {
		if (APP_DEBUG) {
			return MOCK_COMPETIORINFO;
		}

		return this.competitorInfo;
	},

	resetCompetitorInfo: function() {
		this.competitorInfo = {};
	},

	setPlayMode: function(mode) {
		this._playMode = mode;
	},

	getPlayMode: function() {
		return this._playMode;
	},

	setUserInfo: function(data) {
		for (var i in data) {
			this.userInfo[i] = data[i];
		}
	},

	getUserInfo: function() {
		if (APP_DEBUG) {
			return MOCK_USER_INFO;
		}
		return this.userInfo;
	},
	
	login: function(username, password, callback) {
		if (APP_DEBUG) {
			callback(MOCK_LOGIN_RES);
			return ;
		}

		var self = this;
		var loginITF = new HttpInterface["login"]();
		loginITF.params.username = username;
		loginITF.params.password = password;
	    Ajax.post(loginITF.url, loginITF.params, function(data) {
	    		var jData = JSON.parse(data);
	    		if (jData.success) {
	    			P_Socket.connect(function(data) {
	    				if (data.success) {
	    					callback? callback(data) : '';
	    				} else {
	    					msgBox.log(data.msg);
	    				}
		        	});
	    		} else {
	    			msgBox.log(jData.msg);
	    		}
	    	}
	    );
	},

	regiestSubmit: function(username, password, sex, callback) {
		if (APP_DEBUG) {
			callback(MOCK_REGIEST_RES);
			return ;
		} 
		var regiestITF = new HttpInterface["regiest"]();
		regiestITF.params.username = username;
		regiestITF.params.password = password;
        regiestITF.params.gender = sex;
	    Ajax.post(regiestITF.url, regiestITF.params, function(data) {
	    	var jData = JSON.parse(data);
	    	if(jData.success) {
	    		P_Socket.connect(function(data) {
    				if (data.success) {
    					callback? callback(data) : '';
    				} else {
    					msgBox.log(data.msg);
    				}
	        	});
	    	} else {
	    		msgBox.log(jData.msg);
	    	}
	    });
	},

	getFriendsList: function(callback) {
		if (APP_DEBUG) {
			callback(MOCK_FriendsList);
			return ;
		}

		var getFriendsListITF = new SocketInterface["getFriendsList"]();
		getFriendsListITF.params.sid = cookie.get("FOODIESID");
		P_Socket.request(getFriendsListITF.url, getFriendsListITF.params, function(data) {
			callback? callback(data) : '';
		});
	},

	doAddFriend: function(params, callback) {
		if (APP_DEBUG) {
			callback(MOCK_ADDFRIEND_RES);
			return ;
		}

		var addFriendITF = new SocketInterface["addFriend"]();
		addFriendITF.params.sid = cookie.get("FOODIESID");
		addFriendITF.params.friend_id = params.friendId? params.friendId : null;
		addFriendITF.params.friend_name = params.friendName? params.friendName : null;

		P_Socket.request(addFriendITF.url, addFriendITF.params, function(data) {
			callback? callback(data) : '';
		})
	},

	doInviteFriend: function(friend_id, callback) {},

	doRemoveFriend: function(friend_id, callback) {
		if (APP_DEBUG) {
			callback(MOCK_REMOVEFRIEND_RES);
			return ;
		}

		var removeFriendITF = new SocketInterface["removeFriend"]();
		removeFriend.params.sid = cookie.get("FOODIESID");
		addFriendITF.params.friend_id = friend_id;
		P_Socket.request(removeFriendITF.url, removeFriend.params, function(data) {
			callback? callback(data) : '';
		})
	},

	searching: function(callback) {
		if (APP_DEBUG) {
			setTimeout(function() {
				callback(MOCK_SEARCHING);
				if (UserModel.getUserStatus() == USER_STATUS.SEARCHING) {
					GameModel.setFightKey("FIGHTKEY");
					UserModel.setUserStatus(USER_STATUS.REARY);
					Router.goto("#user/renderMatching");
				}
			}, 5000);
			return ;
		}

		var searchingITF = new SocketInterface["searching"]();
		P_Socket.request(searchingITF.url, searchingITF.params, function(data) {
			callback? callback(data) : '';
		});
	},

	backToIndex: function() {
		if(APP_DEBUG) {
			return ;
		}

		var backToIndexITF = new SocketInterface["backToIndex"]();
		backToIndexITF.params = {
			fightKey: GameModel.getFightKey(),
			user_id: UserModel.getUserInfo().user_id
		}
		P_Socket.request(backToIndexITF.url, backToIndexITF.params, function(data) {});
	}
});