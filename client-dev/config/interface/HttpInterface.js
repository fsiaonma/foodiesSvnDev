var HttpInterface = HttpInterface || {
	// 登录
	login: function() {
		this.url = "http://183.61.119.19:8001/foodies/login.php";
		this.params = {
			username: null, // 用户名
			password: null // 用户密码
		};
		this.res = {
			success: null, // 请求状态
			msg: null // 请求信息
		};
	},
	// 注册
	regiest: function() {
		this.url = "http://183.61.119.19:8001/foodies/register.php";
		this.params = {
			username: null, // 用户名
			password: null, // 用户密码
			gender: null // 用户性别
		};
		this.res = {
			success: null, // 请求状态
			msg: null // 请求信息
		};
	}
};