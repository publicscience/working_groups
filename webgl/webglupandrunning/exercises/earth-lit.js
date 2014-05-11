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

	//create a sun as a light source and add to our scene
	var sun = new Sun();
	sun.init();
	this.addObject(sun);
}

//custom earth class
Earth = function(){
	Sim.Object.call(this);
}

//set up a earth prototype which is of type sim.object?
Earth.prototype = new Sim.Object();

Earth.prototype.init = function(){
	//create our earth w a nice texture
	var earthmap = "img/earth_surface_2048.jpg";
	var geometry = new THREE.SphereGeometry(1, 32, 32);
	var texture = THREE.ImageUtils.loadTexture(earthmap);
	var material = new THREE.MeshPhongMaterial( { map: texture}  );
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
Earth.TILT = 0.41;

//custom sun class

Sun = function(){
	Sim.Object.call(this);
}

Sun.prototype = new Sim.Object();

Sun.prototype.init = function(){

	//create a point light to show off the earth
	//set the light out back and to the left a bit
	var light = new THREE.PointLight( 0xffffff, 2, 100);
	light.position.set(-20, 0, 10); // x y and z position, a little off to the left, pos z 

	//tell the framework about our object
	this.setObject3D(light);

}

