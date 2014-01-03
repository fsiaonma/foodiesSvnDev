(function(libX, imgX, createjsX) {
	images = imgX;
	createjs = createjsX;
	lib = libX;
	(function (lib, img, cjs) {

	var p; // shortcut to reference prototypes

	// stage content:
	(lib.finding = function() {
		this.initialize();

		// layer
		this.girls_small = new lib.girls_small();
		this.girls_small.setTransform(184.7,184.3,1,1,0,0,0,166.2,32.5);

		this.boys_small = new lib.boys_small();
		this.boys_small.setTransform(249.1,190.7,1,1,0,0,0,172.9,30.9);

		this.girls = new lib.girls();
		this.girls.setTransform(185.1,178.1,1,1,0,0,0,166.2,32.5);

		this.boys = new lib.boys();
		this.boys.setTransform(251.5,178.1,1,1,0,0,0,173.7,31);

		this.dot_3 = new lib.finding2_1();
		this.dot_3.setTransform(331.9,52,1,1,0,0,0,-12.9,-12.5);

		this.dot_2 = new lib.finding2_1();
		this.dot_2.setTransform(308.3,52,1,1,0,0,0,-12.9,-12.5);

		this.dot_1 = new lib.finding2_1();
		this.dot_1.setTransform(285.8,52,1,1,0,0,0,-12.9,-12.5);

		this.instance = new lib.finding1_1();
		this.instance.setTransform(175.6,40.5,1,1,0,0,0,-143.9,-29.5);

		this.instance_1 = new lib.bg1_1();
		this.instance_1.setTransform(216.1,41.6,1,1,0,0,0,-323.9,213.5);

		this.iamcoming = new lib.finding6_1();
		this.iamcoming.setTransform(216,286.8,1,1,0,0,0,140,63.5);

		this.girlHead = new lib.girl165l_1();
		this.girlHead.setTransform(129,536.1,1,1,0,0,0,62.5,65.5);

		this.boyHead = new lib.boy();
		this.boyHead.setTransform(133.2,538.3,1,1,0,0,0,-115.4,-91.9);

		this.backToIndex = new lib.buttonreturn1_1();
		this.backToIndex.setTransform(216.1,725,1,1,0,0,0,-117.4,245);

		this.instance_2 = new lib.bg2_1();
		this.instance_2.setTransform(216.1,744.6,1,1,0,0,0,-323.9,241);

		this.instance_3 = new lib.talk_1();
		this.instance_3.setTransform(280.9,542.2,1,1,0,0,0,-100.9,238);

		this.girlBg = new lib.bggirl_1();
		this.girlBg.setTransform(216.1,536.3,1,1,0,0,0,-256.9,140.5);

		this.boyBg = new lib.bgboy_1();
		this.boyBg.setTransform(216.1,536.3,1,1,0,0,0,-256.9,140.5);

		this.instance_4 = new lib.detail_1();
		this.instance_4.setTransform(216.1,539.9,1,1,0,0,0,-289.9,60.5);

		this.randomEnemy = new lib.finding5_1();
		this.randomEnemy.setTransform(315.9,322.8,1,1,0,0,0,-137.9,-31);

		this.inviteFriend = new lib.finding4_1();
		this.inviteFriend.setTransform(116.2,322.8,1,1,0,0,0,-138.4,-31);

		this.instance_5 = new lib.finding3_1();
		this.instance_5.setTransform(215.2,256.4,1,1,0,0,0,-259.9,-67.9);

		this.instance_6 = new lib.bg_1();
		this.instance_6.setTransform(216.1,384.1,1,1,0,0,0,-323.9,-576);

		this.addChild(this.instance_6,this.instance_5,this.inviteFriend,this.randomEnemy,this.instance_4,this.boyBg,this.girlBg,this.instance_3,this.instance_2,this.backToIndex,this.boyHead,this.girlHead,this.iamcoming,this.instance_1,this.instance,this.dot_1,this.dot_2,this.dot_3,this.boys,this.girls,this.boys_small,this.girls_small);
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


	(lib.boy265r50 = function() {
		this.initialize(img.boy265r50);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,77,62);


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


	(lib.finding_1 = function() {
		this.initialize(img.finding_1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,1080,1920);


	(lib.finding_2 = function() {
		this.initialize(img.finding_2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,432,768);


	(lib.finding1 = function() {
		this.initialize(img.finding1);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,192,40);


	(lib.finding2 = function() {
		this.initialize(img.finding2);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,17,17);


	(lib.finding3 = function() {
		this.initialize(img.finding3);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,346,91);


	(lib.finding4 = function() {
		this.initialize(img.finding4);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,184,42);


	(lib.finding5 = function() {
		this.initialize(img.finding5);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,184,42);


	(lib.finding6 = function() {
		this.initialize(img.finding6);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,280,127);


	(lib.girl165l = function() {
		this.initialize(img.girl165l);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,125,131);


	(lib.girl265r50 = function() {
		this.initialize(img.girl265r50);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,62,65);


	(lib.talk = function() {
		this.initialize(img.talk);
	}).prototype = new cjs.Bitmap();
	p.nominalBounds = new cjs.Rectangle(0,0,134,50);


	(lib.girl265r50_1 = function() {
		this.initialize();

		// 图层 1
		this.instance = new lib.girl265r50();

		this.addChild(this.instance);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,62,65);


	(lib.boy265r50_1 = function() {
		this.initialize();

		// 图层 1
		this.instance_1 = new lib.boy265r50();

		this.addChild(this.instance_1);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,77,62);


	(lib.girl165l_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_2 = new lib.girl165l();

		this.addChild(this.instance_2);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,125,131);


	(lib.finding6_1 = function() {
		this.initialize();

		// 图层 1
		this.instance_3 = new lib.finding6();

		this.addChild(this.instance_3);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,280,127);


	(lib.finding5_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_4 = new lib.finding5();
		this.instance_4.setTransform(-229.9,-52);

		this.addChild(this.instance_4);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-229.9,-52,184,42);


	(lib.finding4_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_5 = new lib.finding4();
		this.instance_5.setTransform(-230.4,-52);

		this.addChild(this.instance_5);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-230.4,-52,184,42);


	(lib.finding3_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_6 = new lib.finding3();
		this.instance_6.setTransform(-432.9,-113.5);

		this.addChild(this.instance_6);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-432.9,-113.5,346,91);


	(lib.finding2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_7 = new lib.finding2();
		this.instance_7.setTransform(-21.4,-21);

		this.addChild(this.instance_7);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-21.4,-21,17,17);


	(lib.finding1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_8 = new lib.finding1();
		this.instance_8.setTransform(-239.9,-49.5);

		this.addChild(this.instance_8);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-239.9,-49.5,192,40);


	(lib.boy = function() {
		this.initialize();

		// Layer 1
		this.instance_9 = new lib.boy165l();
		this.instance_9.setTransform(-192.4,-153);

		this.addChild(this.instance_9);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-192.4,-153,154,122);


	(lib.talk_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_10 = new lib.talk();
		this.instance_10.setTransform(-167.9,213);

		this.addChild(this.instance_10);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-167.9,213,134,50);


	(lib.detail_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_11 = new lib.detail();
		this.instance_11.setTransform(-482.9,-83.5);

		this.addChild(this.instance_11);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-482.9,-83.5,386,288);


	(lib.buttonreturn1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_12 = new lib.buttonreturn1();
		this.instance_12.setTransform(-195.4,224);

		this.addChild(this.instance_12);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-195.4,224,156,42);


	(lib.bg2_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_13 = new lib.bg2();
		this.instance_13.setTransform(-539.9,217.5);

		this.addChild(this.instance_13);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-539.9,217.5,432,47);


	(lib.bg1_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_14 = new lib.bg1();
		this.instance_14.setTransform(-539.9,172);

		this.addChild(this.instance_14);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-539.9,172,432,83);


	(lib.bggirl_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_15 = new lib.bggirl();
		this.instance_15.setTransform(-428.4,50);

		this.addChild(this.instance_15);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-428.4,50,343,181);


	(lib.bgboy_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_16 = new lib.bgboy();
		this.instance_16.setTransform(-428.4,50);

		this.addChild(this.instance_16);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-428.4,50,343,181);


	(lib.bg_1 = function() {
		this.initialize();

		// Layer 1
		this.instance_17 = new lib.bg();
		this.instance_17.setTransform(-539.9,-960);

		this.addChild(this.instance_17);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(-539.9,-960,432,768);


	(lib.girls_small = function() {
		this.initialize();

		// 图层 1
		this.instance_18 = new lib.girl265r50_1();
		this.instance_18.setTransform(301.4,32.5,0.807,0.807,0,0,0,31,32.5);

		this.instance_19 = new lib.girl265r50_1();
		this.instance_19.setTransform(166.2,32.5,0.806,0.806,0,0,0,31,32.5);

		this.instance_20 = new lib.girl265r50_1();
		this.instance_20.setTransform(31,32.5,0.806,0.806,0,0,0,31,32.5);

		this.addChild(this.instance_20,this.instance_19,this.instance_18);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(6,6.3,320.4,52.5);


	(lib.girls = function() {
		this.initialize();

		// 图层 1
		this.instance_21 = new lib.girl265r50_1();
		this.instance_21.setTransform(301.4,32.5,1,1,0,0,0,31,32.5);

		this.instance_22 = new lib.girl265r50_1();
		this.instance_22.setTransform(166.2,32.5,1,1,0,0,0,31,32.5);

		this.instance_23 = new lib.girl265r50_1();
		this.instance_23.setTransform(31,32.5,1,1,0,0,0,31,32.5);

		this.addChild(this.instance_23,this.instance_22,this.instance_21);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,332.4,65);


	(lib.boys_small = function() {
		this.initialize();

		// 图层 1
		this.instance_24 = new lib.boy265r50_1();
		this.instance_24.setTransform(307.8,30.8,0.649,0.649,0,0,0,38.5,30.9);

		this.instance_25 = new lib.boy265r50_1();
		this.instance_25.setTransform(174.5,30.9,0.649,0.648,0,0,0,38.5,31);

		this.instance_26 = new lib.boy265r50_1();
		this.instance_26.setTransform(38.1,31,0.65,0.649,0,0,0,38.5,31.1);

		this.addChild(this.instance_26,this.instance_25,this.instance_24);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(13.1,10.8,319.8,40.3);


	(lib.boys = function() {
		this.initialize();

		// 图层 1
		this.instance_27 = new lib.boy265r50_1();
		this.instance_27.setTransform(308.9,31,1,1,0,0,0,38.5,31);

		this.instance_28 = new lib.boy265r50_1();
		this.instance_28.setTransform(173.7,31,1,1,0,0,0,38.5,31);

		this.instance_29 = new lib.boy265r50_1();
		this.instance_29.setTransform(38.5,31,1,1,0,0,0,38.5,31);

		this.addChild(this.instance_29,this.instance_28,this.instance_27);
	}).prototype = p = new cjs.Container();
	p.nominalBounds = new cjs.Rectangle(0,0,347.4,62);

	})(lib = lib||{}, images = images||{}, createjs = createjs||{});
	var lib, images, createjs;
	
})(libFinding = libFinding || {}, images = images || {}, createjs = createjs || {});

var libFinding, images, createjs;
