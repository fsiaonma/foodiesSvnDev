var msgBox = msgBox || {
	log: function(msg) {
		var msgBox = document.getElementById("msgBox");
		msgBox.style.display = "block";

		var msgFont = document.getElementById("msgFont");
		msgFont.innerHTML = msg + '';

		setTimeout(function() {
			msgFont.innerHTML = '';
			msgBox.style.display = "none";
		}, 3000);
	}
}