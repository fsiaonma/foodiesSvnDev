(function(libX, imgX, createjsX) {
	lib = libX;
	images = imgX;
	createjs = createjsX;
	(function (lib, img, cjs) {

	var p; // shortcut to reference prototypes

	// stage content:
	(lib.playing = function() {
		this.initialize();

		// 图层 1
		this.instance = new lib.playing2_1();
		this.instance.setTransform(216,749.5,1,1,0,0,0,216,18.5);

		this.player2Text = new lib.playingtoptalk2_1();
		this.player2Text.setTransform(234.4,90.5,1,1,0,0,0,40.5,26);

		this.player1Text = new lib.playingtoptalk1_1();
		this.player1Text.setTransform(197.7,48.1,1,1,0,0,0,41,25.5);

		this.player2Head = new lib.girl265r_1();
		this.player2Head.setTransform(355.2,101.6,1,1,0,0,0,62.5,65.5);

		this.player1Head = new lib.boy165l_1();
		this.player1Head.setTransform(88.8,105.6,1,1,0,0,0,77,61);

		this.instance_1 = new lib.playing1_1();
		this.instance_1.setTransform(216,117,1,1,0,0,0,216,117);

		this.time = new lib.playing3_1();
		this.time.setTransform(216,198.8,1,1,0,0,0,169,10.5);

		this.instance_2 = new lib.playing4_1();
		this.instance_2.setTransform(216,198.8,1,1,0,0,0,173.5,15);

		this.addChild(this.instance_2,this.time,this.instance_1,this.player1Head,this.player2Head,this.player1Text,this.player2Text,this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,432,768);


	// symbols:
	(lib.boy165l = function() {
		this.initialize(img.boy165l);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,154,122);


	(lib.girl265r = function() {
		this.initialize(img.girl265r);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,125,131);


	(lib.playing_1 = function() {
		this.initialize(img.playing_1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,768);


	(lib.playing1 = function() {
		this.initialize(img.playing1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,234);


	(lib.playing2 = function() {
		this.initialize(img.playing2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,37);


	(lib.playing3 = function() {
		this.initialize(img.playing3);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,338,21);


	(lib.playing4 = function() {
		this.initialize(img.playing4);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,347,30);


	(lib.playingtoptalk1 = function() {
		this.initialize(img.playingtoptalk1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,82,51);


	(lib.playingtoptalk2 = function() {
		this.initialize(img.playingtoptalk2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,81,52);


	(lib.playing4_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.playing4();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,347,30);


	(lib.playing3_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_1 = new lib.playing3();

		this.addChild(this.instance_1);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,338,21);


	(lib.playing2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_2 = new lib.playing2();

		this.addChild(this.instance_2);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,432,37);


	(lib.playing1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_3 = new lib.playing1();

		this.addChild(this.instance_3);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,432,234);


	(lib.playingtoptalk2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_4 = new lib.playingtoptalk2();

		this.addChild(this.instance_4);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,81,52);


	(lib.playingtoptalk1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_5 = new lib.playingtoptalk1();

		this.addChild(this.instance_5);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,82,51);


	(lib.girl265r_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_6 = new lib.girl265r();

		this.addChild(this.instance_6);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,125,131);


	(lib.boy165l_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_7 = new lib.boy165l();

		this.addChild(this.instance_7);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,154,122);

	})(lib = lib||{}, images = images||{}, createjs = createjs||{});
	var lib, images, createjs;
})(libPlaying = libPlaying || {}, images = images || {}, createjs = createjs || {});

var libPlaying, images, createjs;
	