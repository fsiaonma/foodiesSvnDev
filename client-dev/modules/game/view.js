var GameView = View.Extend({
	renderGame: function() {
		this.renderEl("stageContainer");
		zx_foodies.Main.main();
	}
});