var UserView = View.Extend({
	el: null,

	events: {
		"SinglePlayBtn": "singleplay",
		"MultiPlayBtn": "multiPlay",
		"gotoRegiestBtn": "gotoRegiest",
		"gotoLoginBtn": "gotoLogin",
		"loginBtn": "login",
		"regiestSubmitBtn": "regiestSubmit",
		"addFriendBtn": "doAddFriend",
		"famaleChoiceBtn": "famaleChoice",
		"maleChoiceBtn": "maleChoice"
	},

	renderIndex: function() {
		UserModel.setPlayMode(PLAY_MODE.NONE);
		UserModel.setUserStatus(USER_STATUS.NONE);
		this.renderEl("modSelectPatten");
	},

	renderLogin: function() {
		this.renderEl("loginPatten");
	},

	renderRegiest: function() {
		this.renderEl("regiestPatten");
	},

	renderFriendsPatten: function() {
		var self = this;
		UserModel.getFriendsList(function(data) {
			if (data.success && data.data) {
				self.renderEl("friendsPatten");
				var friendContainer = document.getElementById("friendContainer");
				
				var friendslist = new FriendsList("friendslist", data.data);
				var buttomMenu = document.getElementById("buttomMenu");

				friendContainer.insertBefore(friendslist.el, buttomMenu);
			} else {
				("获取列表失败！");
			}
		});		
	},

	renderChoose: function() {
		this.renderEl("stageContainer");
		var choosePage = new ChoosePage();
		choosePage.renderChoose();
	},

	renderSearch: function() {
		this.renderEl("stageContainer");
		var choosePage = new ChoosePage();
		choosePage.renderSearch();
	},

	renderMatching: function() {
		this.renderEl("stageContainer");
		var matchPage = new MatchPage();
	},

	singleplay: function() {
		UserModel.setPlayMode(PLAY_MODE.SINGLE);
		Router.goto("#game/renderGame");
	},

	multiPlay: function() {
		UserModel.setPlayMode(PLAY_MODE.BATTLE);
		if (cookie.get("FOODIESID")) {
			Router.goto("#user/renderChoose");
		} else {
			Router.goto("#user/renderLogin");
		}	
	},

	gotoRegiest: function() {
		Router.goto("#user/renderRegiest");
	},

	gotoLogin: function() {
		Router.goto("#user/renderLogin");
	},

	login: function() {
		var self = this;
		var username = document.getElementById("loginUsername").value;
		var password = document.getElementById("loginPassword").value;
		UserModel.login(username, password, function(data) {
            Router.goto("#user/renderChoose");
		});
	},

	famaleChoice: function() {
		document.getElementById("maleChoice").className = '';
		document.getElementById("famaleChoice").className = "current";
	},

	maleChoice: function() {
		document.getElementById("famaleChoice").className = '';
		document.getElementById("maleChoice").className = "current";
	},

	regiestSubmit: function() {
		var self = this;
		var username = document.getElementById("regUsername").value;
		var password = document.getElementById("regPassword").value;
		var reRegPassword = document.getElementById("reRegPassword").value;
		var sex = (document.getElementById("famaleChoice").className == "current")? USER_SEX.FEMALE : USER_SEX.MALE;

		if (password != reRegPassword) {
			msgBox.log("2次输入密码不一致");
		} else {
			UserModel.regiestSubmit(username, password, sex, function(data) {
				Router.goto("#user/renderChoose");
			});
		}
	},

	doAddFriend: function() {
		var self = this;
		var friendName = document.getElementById("friendNameInput");
		UserModel.doAddFriend({
			friendName: friendName
		}, function(data) {
			if (data.success) {
				alert("添加好友成功");
			} else {
				alert("添加好友失败");
			}
			window.location.reload();
		});
	}
});