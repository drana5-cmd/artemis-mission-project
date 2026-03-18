/*

http://localhost:8080/three.html

Go here for examples:
https://www.npmjs.com/package/three/v/0.169.0


*/


import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// axes 
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// grid
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);


const ballGeo = new THREE.icosahedronGeometry(8, 5);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('/images/earthmap1k.jpg');
const ballMat = new THREE.MeshBasicMaterial({map: earthTexture});
const earth = new THREE.Mesh(ballGeo, ballMat);
scene.add(earth);

camera.position.z = 18;



function animate() {
	requestAnimationFrame(animate);

	earth.rotation.y += 0.001;

	renderer.render( scene, camera );

}