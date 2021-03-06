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
	
	//create a group to contain earth and clouds
	var earthGroup = new THREE.Object3D(); // special, can contain a list of children

	//tell the framework about our group object
	this.setObject3D(earthGroup);

	//add the earth globe and clouds
	this.createGlobe();
	this.createClouds();

	/*
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
	*/
}

Earth.prototype.createGlobe = function(){
	
	//create our earth with nice texture, normal map for elevtio, specular highlights
	var surfaceMap = THREE.ImageUtils.loadTexture("img/earth_surface_2048.jpg");
	var normalMap = THREE.ImageUtils.loadTexture("img/earth_normal_2048.jpg");
	var specularMap = THREE.ImageUtils.loadTexture("img/earth_specular_2048.jpg");
	
	var shader = THREE.ShaderUtils.lib[ "normal" ];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "tDiffuse" ].texture = surfaceMap;
	uniforms[ "tNormal" ].texture = normalMap;
	uniforms[ "tSpecular" ].texture = specularMap;

	uniforms[ "enableDiffuse" ].value = true;
	uniforms[ "enableSpecular" ].value = true;

	var shaderMaterial = new THREE.ShaderMaterial({
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: uniforms,
		lights: true
	});

	var globeGeometry = new THREE.SphereGeometry(1, 32, 32);

	//get tangents for our shader
	globeGeometry.computeTangents();
	var globeMesh = new THREE.Mesh( globeGeometry, shaderMaterial );

	//tilt the globe
	globeMesh.rotation.x = Earth.TILT;

	//add this mesh to our group
	this.object3D.add(globeMesh);

	//save it away so we can rotate it (?)
	this.globeMesh = globeMesh;

}

Earth.prototype.createClouds = function(){
	
	//create our clouds
	var cloudsMap = THREE.ImageUtils.loadTexture("img/earth_clouds_1024.png");
	var cloudsMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, map: cloudsMap, transparent: true }  ); // alpha flag, webgl supports transparency

	var cloudsGeometry = new THREE.SphereGeometry(Earth.CLOUDS_SCALE, 32, 32);
	
	cloudsMesh = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
	cloudsMesh.rotation.x = Earth.TILT;

	//add this object to our group
	this.object3D.add(cloudsMesh);

	//save it away so we can rotate it (?)
	this.cloudsMesh = cloudsMesh;
}

Earth.prototype.update = function(){

	//move the earth
	this.globeMesh.rotation.y += Earth.ROTATION_Y;

	//move the clouds
	this.cloudsMesh.rotation.y += Earth.CLOUDS_ROTATION_Y;
	
	//update all the sim objects
	Sim.Object.prototype.update.call(this);
	/*
	//move the earth
	this.object3D.rotation.y += Earth.ROTATION_Y;
	*/
}

Earth.ROTATION_Y = 0.0025;
Earth.TILT = 0.41;
Earth.CLOUDS_SCALE = 1.005;
Earth.CLOUDS_ROTATION_Y = Earth.ROTATION_Y * 0.95;

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

