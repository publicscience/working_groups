//constructor

EarthApp = function(){
	Sim.App.call(this);
}

//subclass sim.app

EarthApp.prototype = new Sim.App();

//custom initializer

EarthApp.prototype.init = function(param){
	//call superclass init code to set up the scene, renderer, camera
	Sim.App.prototype.init.call(this, param);

	//create the earth and add to our sim
	var earth = new Earth();
	earth.init();
	this.addObject(earth);
}

//custom earth class
Earth = function(){
	Sim.Object.call(this);
}

//set up a earth prototype which is of type sim.object?
Earth.prototype = new Sim.Object();

Earth.prototype.init = function(){
	//create our earth w a nice texture
	var earthmap = "img/cracked3.png";
	var geometry = new THREE.SphereGeometry(1, 32, 32);
	var texture = THREE.ImageUtils.loadTexture(earthmap);
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide }  );
	var mesh = new THREE.Mesh( geometry, material );

	//lets work in the tilt
	mesh.rotation.z = Earth.TILT;

	//tell our framework about our earth object
	this.setObject3D(mesh);
}

Earth.prototype.update = function(){
	//move the earth
	this.object3D.rotation.y += Earth.ROTATION_Y;
}

Earth.ROTATION_Y = 0.0025;
Earth.TILT = 0.0;
