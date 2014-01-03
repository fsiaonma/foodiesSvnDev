var FriendListItem = function(id, friend_name, status) {
	this.id = id;
	this.onInvite = null;
	this.onDelete = null;
	
	this.el = '<li class="male">' + 
			  	'<img src="" />' + 
			  	'<p class="name">名称：' + friend_name + '</p>' +
			  	'<p class="data">级别：<span>' + 19 + '</span>总数：' + 75 + '战</p>' +
			  	'<a id="inviteBtn' + this.id + '" href="javascript:;" class="btn_invite">邀请对战</a>' +
			  '</li>';

	var self = this;
	EventDelegate.bind("inviteBtn" + this.id, function() {
		self.onInvite? self.onInvite() : '';
	});

	EventDelegate.bind("deleteBtn" + this.id, function() {
		self.onDelete? self.onDelete() : '';
	});
};