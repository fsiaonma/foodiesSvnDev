(function(libX, imgX, createjsX) {
	lib = libX;
	images = imgX;
	createjs = createjsX;
	(function (lib, img, cjs) {

	var p; // shortcut to reference prototypes

	// stage content:
	(lib.matching = function() {
		this.initialize();

		// layer
		this.instance = new lib.talk_1();
		this.instance.setTransform(282.2,541.8,1,1,0,0,0,-100.9,238);

		this.instance_1 = new lib.talk_1();
		this.instance_1.setTransform(282.2,246.4,1,1,0,0,0,-100.9,238);

		this.girlHead = new lib.girl265l_1();
		this.girlHead.setTransform(133.7,237.8,1,1,0,0,0,-93.4,-97.9);

		this.boyHead = new lib.boy();
		this.boyHead.setTransform(138.7,537.3,1,1,0,0,0,-115.4,-91.9);

		this.girlBg = new lib.bggirl_1();
		this.girlBg.setTransform(216.1,241.8,1,1,0,0,0,-256.9,140.5);

		this.boyBg = new lib.bgboy_1();
		this.boyBg.setTransform(216.1,537.2,1,1,0,0,0,-256.9,140.5);

		this.instance_2 = new lib.detail_1();
		this.instance_2.setTransform(216.1,539.7,1,1,0,0,0,-289.9,60.5);

		this.instance_3 = new lib.detail_1();
		this.instance_3.setTransform(216.1,243.5,1,1,0,0,0,-289.9,60.5);

		this.instance_4 = new lib.matching1_1();
		this.instance_4.setTransform(216,39.5,1,1,0,0,0,105,19);

		this.beginFight = new lib.matching2_1();
		this.beginFight.setTransform(345.5,724.1,1,1,0,0,0,61.5,21);

		this.backToIndex = new lib.buttonreturn2_1();
		this.backToIndex.setTransform(86.8,724.1,1,1,0,0,0,-91.9,245);

		this.rechoose = new lib.buttonrechoose_1();
		this.rechoose.setTransform(216.1,724.1,1,1,0,0,0,-91.9,245);

		this.instance_5 = new lib.bg2_1();
		this.instance_5.setTransform(216.1,744.6,1,1,0,0,0,-323.9,241);

		this.instance_6 = new lib.bg1_1();
		this.instance_6.setTransform(216.1,41.6,1,1,0,0,0,-323.9,213.5);

		this.instance_7 = new lib.bg_1();
		this.instance_7.setTransform(216.1,384.1,1,1,0,0,0,-323.9,-576);

		this.addChild(this.instance_7,this.instance_6,this.instance_5,this.rechoose,this.backToIndex,this.beginFight,this.instance_4,this.instance_3,this.instance_2,this.boyBg,this.girlBg,this.boyHead,this.girlHead,this.instance_1,this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,432,768);


	// symbols:
	(lib.bg = function() {
		this.initialize(img.bg);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,768);


	(lib.bg1 = function() {
		this.initialize(img.bg1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,83);


	(lib.bg2 = function() {
		this.initialize(img.bg2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,47);


	(lib.bg3 = function() {
		this.initialize(img.bg3);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,151);


	(lib.bgboy = function() {
		this.initialize(img.bgboy);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,343,181);


	(lib.bggirl = function() {
		this.initialize(img.bggirl);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,343,181);


	(lib.boy165l = function() {
		this.initialize(img.boy165l);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,154,122);


	(lib.buttonrechoose = function() {
		this.initialize(img.buttonrechoose);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,123,42);


	(lib.buttonreturn1 = function() {
		this.initialize(img.buttonreturn1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,156,42);


	(lib.buttonreturn2 = function() {
		this.initialize(img.buttonreturn2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,123,42);


	(lib.detail = function() {
		this.initialize(img.detail);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,386,288);


	(lib.girl265l = function() {
		this.initialize(img.girl265l);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,125,131);


	(lib.matching_1 = function() {
		this.initialize(img.matching_1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,768);


	(lib.matching1 = function() {
		this.initialize(img.matching1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,210,38);


	(lib.matching2 = function() {
		this.initialize(img.matching2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,123,42);


	(lib.talk = function() {
		this.initialize(img.talk);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,134,50);


	(lib.matching2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance = new lib.matching2();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,123,42);


	(lib.matching1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_1 = new lib.matching1();

		this.addChild(this.instance_1);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,210,38);


	(lib.talk_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_2 = new lib.talk();
		this.instance_2.setTransform(-167.9,213);

		this.addChild(this.instance_2);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-167.9,213,134,50);


	(lib.girl265l_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_3 = new lib.girl265l();
		this.instance_3.setTransform(-155.9,-163.5);

		this.addChild(this.instance_3);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-155.9,-163.5,125,131);


	(lib.detail_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_4 = new lib.detail();
		this.instance_4.setTransform(-482.9,-83.5);

		this.addChild(this.instance_4);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-482.9,-83.5,386,288);


	(lib.buttonreturn2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_5 = new lib.buttonreturn2();
		this.instance_5.setTransform(-153.4,224);

		this.addChild(this.instance_5);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-153.4,224,123,42);


	(lib.buttonrechoose_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_6 = new lib.buttonrechoose();
		this.instance_6.setTransform(-153.4,224);

		this.addChild(this.instance_6);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-153.4,224,123,42);


	(lib.boy = function() {
		this.initialize();

		// Layer 1
		this.instance_7 = new lib.boy165l();
		this.instance_7.setTransform(-192.4,-153);

		this.addChild(this.instance_7);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-192.4,-153,154,122);


	(lib.bg2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_8 = new lib.bg2();
		this.instance_8.setTransform(-539.9,217.5);

		this.addChild(this.instance_8);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-539.9,217.5,432,47);


	(lib.bg1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_9 = new lib.bg1();
		this.instance_9.setTransform(-539.9,172);

		this.addChild(this.instance_9);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-539.9,172,432,83);


	(lib.bggirl_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_10 = new lib.bggirl();
		this.instance_10.setTransform(-428.4,50);

		this.addChild(this.instance_10);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-428.4,50,343,181);


	(lib.bgboy_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_11 = new lib.bgboy();
		this.instance_11.setTransform(-428.4,50);

		this.addChild(this.instance_11);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-428.4,50,343,181);


	(lib.bg_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_12 = new lib.bg();
		this.instance_12.setTransform(-539.9,-960);

		this.addChild(this.instance_12);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-539.9,-960,432,768);

	})(lib = lib||{}, images = images||{}, createjs = createjs||{});
	var lib, images, createjs;
})(libMatching = libMatching || {}, images = images || {}, createjs = createjs || {});

var libMatching, images, createjs;
	