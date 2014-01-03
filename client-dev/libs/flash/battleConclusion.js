(function(libX, imgX, createjsX) {
	lib = libX;
	images = imgX;
	createjs = createjsX;
	(function (lib, img, cjs) {

		var p; // shortcut to reference prototypes

		// stage content:
		(lib.conclusionfor2 = function() {
			this.initialize();

			// layer
			this.addFriendBtn = new lib.conclusion2_1();
			this.addFriendBtn.setTransform(52.5,333.4,1,1,0,0,0,48.5,26.5);

			this.loseText = new lib.conclusion4_1();
			this.loseText.setTransform(309.5,563.1,1,1,0,0,0,90,63);

			this.winText = new lib.conclusion3_1();
			this.winText.setTransform(309.5,264.4,1,1,0,0,0,90.5,68);

			this.boyHead = new lib.boy();
			this.boyHead.setTransform(137.5,535.7,1,1,0,0,0,-115.4,-91.9);

			this.girlHead = new lib.girl265l_1();
			this.girlHead.setTransform(132.4,239.4,1,1,0,0,0,62.5,65.5);

			this.instance = new lib.talk_1();
			this.instance.setTransform(281.6,482.6,1,1,0,0,0,-100.9,238);

			this.instance_1 = new lib.talk_1();
			this.instance_1.setTransform(281.6,186.5,1,1,0,0,0,-100.9,238);

			this.rechoose = new lib.buttonrechoose_1();
			this.rechoose.setTransform(216.1,721.8,1,1,0,0,0,-91.9,245);

			this.continueFight = new lib.conclusion5_1();
			this.continueFight.setTransform(345.4,721.7,1,1,0,0,0,61,21);

			this.backToIndex = new lib.buttonreturn2_1();
			this.backToIndex.setTransform(86.1,721.8,1,1,0,0,0,-91.9,245);

			this.instance_2 = new lib.bg2_1();
			this.instance_2.setTransform(216.1,744.6,1,1,0,0,0,-323.9,241);

			this.instance_3 = new lib.conclusion1_1();
			this.instance_3.setTransform(216,39.6,1,1,0,0,0,111,19.5);

			this.instance_4 = new lib.bg1_1();
			this.instance_4.setTransform(216.1,41.6,1,1,0,0,0,-323.9,213.5);

			this.girlBg = new lib.bggirl_1();
			this.girlBg.setTransform(216.1,240.5,1,1,0,0,0,-256.9,140.5);

			this.boyBg = new lib.bgboy_1();
			this.boyBg.setTransform(216.1,537.1,1,1,0,0,0,-256.9,140.5);

			this.instance_5 = new lib.detail_1();
			this.instance_5.setTransform(216.1,540.2,1,1,0,0,0,-289.9,60.5);

			this.instance_6 = new lib.detail_1();
			this.instance_6.setTransform(216.1,245.2,1,1,0,0,0,-289.9,60.5);

			this.instance_7 = new lib.bg_1();
			this.instance_7.setTransform(216.1,384.1,1,1,0,0,0,-323.9,-576);

			this.addChild(this.instance_7,this.instance_6,this.instance_5,this.boyBg,this.girlBg,this.instance_4,this.instance_3,this.instance_2,this.backToIndex,this.continueFight,this.rechoose,this.instance_1,this.instance,this.girlHead,this.boyHead,this.winText,this.loseText,this.addFriendBtn);
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


		(lib.conclusion1 = function() {
			this.initialize(img.conclusion1);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,222,39);


		(lib.conclusion2 = function() {
			this.initialize(img.conclusion2);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,97,53);


		(lib.conclusion3 = function() {
			this.initialize(img.conclusion3);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,181,136);


		(lib.conclusion4 = function() {
			this.initialize(img.conclusion4);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,180,126);


		(lib.conclusion5 = function() {
			this.initialize(img.conclusion5);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,122,42);


		(lib.conclusionfor2_1 = function() {
			this.initialize(img.conclusionfor2_1);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,432,768);


		(lib.detail = function() {
			this.initialize(img.detail);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,386,288);


		(lib.girl265l = function() {
			this.initialize(img.girl265l);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,125,131);


		(lib.talk = function() {
			this.initialize(img.talk);
		}).prototype = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0,0,134,50);


		(lib.conclusion5_1 = function() {
			this.initialize();

			// Layer 1
			this.instance = new lib.conclusion5();

			this.addChild(this.instance);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(0,0,122,42);


		(lib.conclusion4_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_1 = new lib.conclusion4();

			this.addChild(this.instance_1);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(0,0,180,126);


		(lib.conclusion3_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_2 = new lib.conclusion3();

			this.addChild(this.instance_2);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(0,0,181,136);


		(lib.conclusion2_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_3 = new lib.conclusion2();

			this.addChild(this.instance_3);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(0,0,97,53);


		(lib.conclusion1_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_4 = new lib.conclusion1();

			this.addChild(this.instance_4);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(0,0,222,39);


		(lib.talk_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_5 = new lib.talk();
			this.instance_5.setTransform(-167.9,213);

			this.addChild(this.instance_5);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-167.9,213,134,50);


		(lib.girl265l_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_6 = new lib.girl265l();

			this.addChild(this.instance_6);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(0,0,125,131);


		(lib.detail_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_7 = new lib.detail();
			this.instance_7.setTransform(-482.9,-83.5);

			this.addChild(this.instance_7);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-482.9,-83.5,386,288);


		(lib.buttonreturn2_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_8 = new lib.buttonreturn2();
			this.instance_8.setTransform(-153.4,224);

			this.addChild(this.instance_8);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-153.4,224,123,42);


		(lib.buttonrechoose_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_9 = new lib.buttonrechoose();
			this.instance_9.setTransform(-153.4,224);

			this.addChild(this.instance_9);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-153.4,224,123,42);


		(lib.boy = function() {
			this.initialize();

			// Layer 1
			this.instance_10 = new lib.boy165l();
			this.instance_10.setTransform(-192.4,-153);

			this.addChild(this.instance_10);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-192.4,-153,154,122);


		(lib.bg2_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_11 = new lib.bg2();
			this.instance_11.setTransform(-539.9,217.5);

			this.addChild(this.instance_11);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-539.9,217.5,432,47);


		(lib.bg1_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_12 = new lib.bg1();
			this.instance_12.setTransform(-539.9,172);

			this.addChild(this.instance_12);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-539.9,172,432,83);


		(lib.bggirl_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_13 = new lib.bggirl();
			this.instance_13.setTransform(-428.4,50);

			this.addChild(this.instance_13);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-428.4,50,343,181);


		(lib.bgboy_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_14 = new lib.bgboy();
			this.instance_14.setTransform(-428.4,50);

			this.addChild(this.instance_14);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-428.4,50,343,181);


		(lib.bg_1 = function() {
			this.initialize();

			// Layer 1
			this.instance_15 = new lib.bg();
			this.instance_15.setTransform(-539.9,-960);

			this.addChild(this.instance_15);
		}).prototype = p = new cjs.Container();
		p.nominalBounds = new cjs.Rectangle(-539.9,-960,432,768);

	})(lib = lib||{}, images = images||{}, createjs = createjs||{});
	var lib, images, createjs;
})(libBattleConclusion = libBattleConclusion || {}, images = images || {}, createjs = createjs || {});

var libBattleConclusion, images, createjs;


