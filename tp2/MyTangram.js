import {CGFobject} from '../lib/CGF.js';
import { MyParallelogram } from '../tp1/MyParallelogram.js';
import { MyTriangle } from '../tp1/MyTriangle.js';
import { MyTriangleBig } from '../tp1/MyTriangleBig.js';
import { MyTriangleSmall } from '../tp1/myTriangleSmall.js';
import { MyDiamond } from './MyDiamond.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.paralel = new MyParallelogram(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.bigt = new MyTriangleBig(this.scene);
        this.smallt = new MyTriangleSmall(this.scene);  
	}
	
    display(){
        // Green Diamond
        this.scene.pushMatrix();    
        var translateAndRotate = [Math.cos(Math.PI/4), -Math.sin(Math.PI/4), 0.0, 0.0,
                             Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0.0, 0.0,
                             0.0, 0.0, 1.0, 0.0,
                             0.72, 3.54, 0.0, 1.0];
        this.scene.multMatrix(translateAndRotate);
        this.scene.setDiffuse(0, 255 / 255, 0, 0)
        this.diamond.display()
        this.scene.popMatrix()
        // Pink Triangle
        this.scene.pushMatrix()
        this.scene.translate(0,-1.42,0) 
        this.scene.rotate(5*Math.PI/4,0,0,1)
        this.scene.setDiffuse(1, 192 / 255.0, 203 / 255.0, 1)
        this.triangle.display()
        this.scene.popMatrix()
        // Blue Triangle
        this.scene.pushMatrix()
        this.scene.translate(-1.42,1.42,0)
        this.scene.rotate(7*Math.PI/4,0,0,1)
        this.scene.setDiffuse(0, 0, 1, 1)
        this.bigt.display()
        this.scene.popMatrix()
        // Orange Triangle
        this.scene.pushMatrix()
        this.scene.translate(1.42,1.42,0)
        this.scene.rotate(9*Math.PI/4,0,0,1)
        this.scene.setDiffuse(1, 165/255.0, 0, 1)
        this.bigt.display()
        this.scene.popMatrix()
        // Red Triangle
        this.scene.pushMatrix()
        this.scene.translate(-0.71,3.54,0)
        this.scene.rotate(5*Math.PI/4,0,0,1)
        this.scene.setDiffuse(1, 0, 0, 1)
        this.smallt.display()
        this.scene.popMatrix()
        // Purple Triangle
        this.scene.pushMatrix()
        this.scene.translate(2.13,3.53,0)
        this.scene.rotate(3*Math.PI/4,0,0,1)
        this.scene.setDiffuse(128./255.0, 0, 128/255.0, 1)
        this.smallt.display()
        this.scene.popMatrix()
        // Yellow Parallelogram
        this.scene.pushMatrix()
        this.scene.translate(-2.83,2.83,0)
        this.scene.scale(-1, 1, 1); // Mirror along the x-axis
        this.scene.rotate(3*Math.PI/4,0,0,1)
        this.scene.setDiffuse(1, 1, 0, 1)
        this.paralel.display()
        this.scene.popMatrix()

    }

	
}

