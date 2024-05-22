import { CGFobject } from '../../lib/CGF.js';
import { MyIsoscelesTriangle } from './MyIsoscelesTriangle.js';

export class MyBlade extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.x = x;
        this.z = z;

        this.initBlade();
    }

    initBlade() {
        this.triangle = new MyIsoscelesTriangle(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1,5,1);
        this.scene.translate(this.x, 0, this.z); // Apply translation
        this.triangle.display();
        this.scene.popMatrix();
    }
}
