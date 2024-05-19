import { MyParallelogram } from '../tp1/MyParallelogram.js';
import { MyTriangle } from '../tp1/MyTriangle.js';
import { MyTriangleBig } from '../tp1/MyTriangleBig.js';
import { MyTriangleSmall } from '../tp1/myTriangleSmall.js';
import { MyDiamond } from './MyDiamond.js';
import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
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
        this.tangramTexture = new CGFtexture(scene, 'images/tangram.png');
        this.initMaterials();
	}

    initMaterials() {
        this.tangramTexture = new CGFtexture(this.scene, 'images/tangram.png');
        // Initialize material
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0, 1, 0, 1.0);
        this.diamondMaterial.setDiffuse(0, 1, 0, 0);
        this.diamondMaterial.setSpecular(1, 1, 1, 1);
        this.diamondMaterial.setShininess(10.0);
        this.diamondMaterial.setTexture(this.tangramTexture);

        this.paralelMaterial = new CGFappearance(this.scene);
        this.paralelMaterial.setAmbient(0, 1, 0, 1.0);
        this.paralelMaterial.setDiffuse(1, 1, 0, 0);    
        this.paralelMaterial.setSpecular(1, 1, 1, 1);
        this.paralelMaterial.setShininess(10.0);
        this.paralelMaterial.setTexture(this.tangramTexture);

        this.triangleMaterial = new CGFappearance(this.scene);
        this.triangleMaterial.setAmbient(0, 1, 0, 1.0);
        this.triangleMaterial.setDiffuse(1, 192 / 255.0, 203 / 255.0, 1);  
        this.triangleMaterial.setSpecular(1, 1, 1, 1);
        this.triangleMaterial.setShininess(10.0);
        this.triangleMaterial.setTexture(this.tangramTexture);
    }

    display(){
        // Green Diamond
        this.scene.pushMatrix();    
        var translateAndRotate = [Math.cos(Math.PI/4), -Math.sin(Math.PI/4), 0.0, 0.0,
                             Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0.0, 0.0,
                             0.0, 0.0, 1.0, 0.0,
                             0.72, 3.54, 0.0, 1.0];
        this.scene.multMatrix(translateAndRotate);
        this.diamondMaterial.apply()
        this.diamond.display()
        this.scene.popMatrix()
        // Pink Triangle
        this.scene.pushMatrix()
        this.scene.translate(0,-1.42,0) 
        this.scene.rotate(5*Math.PI/4,0,0,1)
        this.triangleMaterial.apply()
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
        this.paralelMaterial.apply()
        this.paralel.display()
        this.scene.popMatrix()

    }

	
}

