var FriendsList = function(id, friendslistData) {
	this.el = document.createElement("div");
	this.el.id  = id;
	this.el.className = "friend_list";

	var onlineList = '';
	var disonlineList = '';

	for (var i = 0, len = friendslistData.length; i < len; ++i) {
		var item = friendslistData[i];
		friendItem = new FriendListItem(i, item.friend_name, item.friend_status);
		
		friendItem.onInvite = function() {
			console.log("invite friend to play a game");
			UserModel.doInviteFriend(item.friend_id, function() {
				console.log("invite result data");
			})
		};
		
		friendItem.onDelete = function() {
			var friendId = item.friend_id;
			console.log("remove friend");
			UserModel.doRemoveFriend(friendId, function(data) {
				if (data.success) {
					alert("删除好友成功");
				} else {
					alert("删除好友失败");
				}
				window.location.reload();
			});
		};

		if (item.friend_status == "online") {
			onlineList += friendItem.el;
		} else {
			disonlineList += friendItem.el;
		}
	}

	var ul = document.createElement("ul");
	ul.innerHTML = onlineList + disonlineList;	
	this.el.appendChild(ul);
}