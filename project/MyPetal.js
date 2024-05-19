import { CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyTriangle } from './MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene, base, height, textureIndex, inclination=-Math.PI/4) {
        super(scene);
        this.base = base;
        this.height = height;
        this.inclination = inclination;

        this.triangle1 = new MyTriangle(scene, base, height);
        this.triangle2 = new MyTriangle(scene, base, height);

        // Array of texture paths
        this.texturePaths = ['textures/petal1.jpg', 'textures/petal2.jpg', 'textures/petal3.jpg', 'textures/petal4.jpg', 'textures/petal5.jpg'];

        // Create texture object based on the provided texture index
        this.texture = new CGFtexture(scene, this.texturePaths[textureIndex]);
    
    }

    display() {
        this.scene.pushMatrix();
        
        this.texture.bind();

        this.scene.rotate(Math.PI,1,0,0);
        this.triangle1.display();
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(this.inclination,1,0,0);
        this.triangle2.display();
        this.scene.popMatrix();
    }
}
