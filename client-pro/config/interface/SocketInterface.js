var SocketInterface = SocketInterface || {
	host: "183.61.119.19",
	port: "3114", //3114 for dev, 3014 for production.

	// 获取端口
	queryEntry: function() {
		this.url = "gate.gateHandler.queryEntry";
		this.params = {
			s: null // session id
		};
		this.res = {
			host: null,
			port: null
		}
	},
	// 链接
	connect: function() {
		this.url = "connector.entryHandler.enter";
		this.params = {
			s: null // session id
		};
		this.res = {
			success: null,
			user_id: null,
			username: null,
			gender: null,
			level: null,
			battles: null
		        		
		}
	},
	// 获取好友列表
	getFriendsList: function() {
		this.url = 'friends.friendsHandler.getFriends';
		this.params = {
			sid: null // session id
		};
		this.res = {
			success: null, // 请求状态
			msg: null, // 请求信息
			data: [{
				friend_id: null, // 用户 id 
				friend_name: null, // 用户名
				friend_status: null // 用户状态（0 为用户不在线，1 为用户在线但没进行游戏，2 为用户在线并且正在游戏）
			}]
		}
	},
	// 添加好友
	addFriend: function() {
		this.url = '';
		this.params = {
			sid: null, // seesion id
			friend_id: null, // 好友 id
			friend_name: null // 好友用户名
		};
		this.res = {
			success: null, // 请求状态
			msg: null // 请求信息
		};
	},
	// 删除好友
	removeFriend: function() {
		this.url = '';
		this.params = {
			sid: null, // session id
			friend_id: null // 好友 id
		};
		this.res = {
			success: null, // 请求状态
			msg: null // 请求信息
		};
	},
	// 邀请好友
	inviteFriend: function() {
		this.url = '';
		this.params = {};
		this.res = {};
	},
	// 获取用户信息
	getformation: function() {
		this.url = '';
		this.params = {};
		this.res = {};
	},
	// 查找用户
	searching: function() {
		this.url = "foodies.foodiesHandler.searching",
		this.params = {};
		this.res = {
			success: null,
			msg: null
		}
	},
	// 准备开始游戏
	isReadyToFight: function() {
		this.url = "foodies.foodiesHandler.isReadyToFight",
		this.params = {
			fightKey: null // 匹配对手的时候获取的战斗秘钥
		},
		this.res = {
			success: null,
			msg: null
		}
	},
	// 开始战斗
	toFight: function() {
		this.url = "foodies.foodiesHandler.fight",
		this.params = {
			fightKey: null // 匹配对手的时候获取的战斗秘钥
 		},
		this.res = {
			success: null,
            data: {
                field: null,
                count: null
            }
		}
	},
	// 判断是否结束
	isFinished: function() {
		this.url = "foodies.foodiesHandler.isFinished",
		this.params = {
			fightKey: null // 匹配对手的时候获取的战斗秘钥
		},
		this.res = {
			success: null
		}
	},
	// 提交数据
	postResult: function() {
		this.url = "foodies.foodiesHandler.postResult",
		this.params = {
			fightKey: null, // 匹配对手的时候获取的战斗秘钥
			result: null, // 分数
		},
		this.res = {
			success: null
		}
	},
	// 判断是否计算完成
	isFinishCal: function() {
		this.url = "foodies.foodiesHandler.isFinishCal",
		this.params = {
			fightKey: null, // 匹配对手的时候获取的战斗秘钥
		},
		this.res = {
			success: null
		}
	},
	// 返回首頁
	backToIndex: function() {
		this.url = "foodies.foodiesHandler.backToIndex",
		this.params = {
			fightKey: null, // 匹配对手的时候获取的战斗秘钥
			user_id: null // 用户 id
		}
	},

	// 匹配对手成功
	onMatchBattle: function() {
		this.route = "onMatchBattle",
		this.param = {
			fightKey: fightKey, // 战场 ID
			fromGender: fromGender, // 对手性别
            fromId: enemy_id, // 对手 ID
            fromName: enemy_name, //对手用户名
            fromLevel: enemyInfo.data[0].level, // 对手级数
            fromBattles: enemyInfo.data[0].battles // 对手游戏总局数
        };
	},
	//对战结果
	onBattleResult: function() {
		this.route = "onBattleResult",
		this.param = {
			winner: user_id, // 胜者 ID
			loser: loser_id // 败者 ID
		}
	}
};