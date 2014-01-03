var View = View || {
	Extend: function(obj) {
		if (obj.events) {
			for (var i in obj.events) {
				(function(evtId) {
					EventDelegate.bind(evtId, function() {
						obj[obj.events[evtId]].call(obj);
					});
				})(i);
			};
		}
		obj.renderEl = this.renderEl;
		return obj;
	},

	renderEl: function(el) {
		document.getElementById("container").innerHTML = document.getElementById(el).innerHTML;
	}
}