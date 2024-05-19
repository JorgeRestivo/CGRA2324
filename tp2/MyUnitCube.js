import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();     
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5,  0.5,   //0
			-0.5,  0.5,  0.5,   //1
			 0.5,  0.5,  0.5,	//2
			 0.5, -0.5,  0.5,   //3
            -0.5, -0.5, -0.5,   //4	
			-0.5,  0.5, -0.5,   //5	
			 0.5,  0.5, -0.5,	//6
			 0.5, -0.5, -0.5    //7 
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 3, // face Z=0.5
			0, 3, 1, // face Z=0.5
            6, 7, 5, // face Z=-0.5                 
            4, 5, 7, // face Z=-0.5
            2, 6, 1, // face Y=0.5
            5, 1, 6, // face Y=0.5
            0, 4, 3, // face Y=-0.5
            7, 3, 4, // face Y=-0.5
            3, 7, 2, // face X=0.5
            6, 2, 7, // face X=0.5
            4, 0, 5, // face X=-0.5
            1, 5, 0, // face X=-0.5
		];  

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

