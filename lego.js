/**
 * @author danielsuo / http://danielsuo.com
 *
 * TODO
 * - Figure out how to save brick meshes to not rebuild each time (imported geometry file?)
 * - Do polygon counts change depending on order of geometry construction
 * - Can we copy geometries with '=' or do we have to recreate?
 * - Understand quaternions
 * - Add a hairline between legos
 * - Add render details option
 * - Add support for plates

 * - Shift on grid rotate
 * - Collision
 * - Colors
*/

var LEGO = LEGO || { REVISION: '1'};

LEGO.dim = {};

// LEGO.scale = 1 / 10;

LEGO.dim.base = 0.8;
LEGO.dim.play = 0.1;

LEGO.dim.plateHeight = 4 * LEGO.dim.base;
LEGO.dim.brickHeight = 12 * LEGO.dim.base;
LEGO.dim.totalHeight = LEGO.dim.plateHeight + LEGO.dim.brickHeight;

LEGO.dim.pitch = 10 * LEGO.dim.base;

LEGO.dim.knobHeight = 1.8;
LEGO.dim.knobDiameter = 6 * LEGO.dim.base;
LEGO.dim.knobRadius = LEGO.dim.knobDiameter / 2;
LEGO.dim.knobInnerHeight = 1.8; // Assumed
LEGO.dim.knobInnerDiameter = 2.6;
LEGO.dim.knobOutterDiameter = LEGO.dim.pitch * Math.sqrt(2) - 2 * LEGO.dim.knobDiameter / 2;

LEGO.dim.sideWall = 1.2;
LEGO.dim.topWall = 1.0;

LEGO.dim.notchWidth = 0.6;
LEGO.dim.notchHeight = LEGO.dim.knobHeight; // Assumed
LEGO.dim.notchLength = 0.3;

function Brick(width, height, depth, color, isplate, iscanvas) {
	this.isbrick = isplate ? false : true;

	this.w = width;
	this.h = height;
	this.d = depth;

	this.xOffset = width % 2 == 0 ? 1 : 2;
	// this.yOffset = height % 2 == 0 ? 1 : 2;
	this.zOffset = depth % 2 == 0 ? 1 : 2;

	this.width = width * LEGO.dim.pitch;
	this.depth = depth * LEGO.dim.pitch;

	this.heightUnit = this.isbrick ? LEGO.dim.brickHeight : LEGO.dim.plateHeight;
	this.height = height * this.heightUnit;


	this.color = color;

	this.geometry = new THREE.CubeGeometry(this.width, this.height, this.depth);

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < depth; j++) {
			var knob = new THREE.CylinderGeometry(LEGO.dim.knobRadius, LEGO.dim.knobRadius, LEGO.dim.knobHeight);
			// knob.applyMatrix( new THREE.Matrix4().makeTranslation(
			// 	LEGO.dim.pitch / 2 + LEGO.dim.pitch * i,
			// 	LEGO.dim.brickHeight * this.height + LEGO.dim.knobHeight / 2,
			// 	LEGO.dim.pitch / 2 + LEGO.dim.pitch * j));
			knob.applyMatrix( new THREE.Matrix4().makeTranslation(
				LEGO.dim.pitch * (i + 1/2) - LEGO.dim.pitch * width / 2, 
				this.height / 2 + LEGO.dim.knobHeight / 2, 
				LEGO.dim.pitch * (j + 1/2) - LEGO.dim.pitch * depth / 2));

			THREE.GeometryUtils.merge(this.geometry, knob);
		}
	}

	if (iscanvas) {
		this.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(
			0,
			- LEGO.dim.plateHeight / 2,
			0
			));
	}
	this.material = new THREE.MeshPhongMaterial( { color: this.color });

	this.mesh = new THREE.Mesh(this.geometry, this.material);
}

function Canvas(width, height, depth) {

}

LEGO.detectCollision = function(scene, brick) {

}