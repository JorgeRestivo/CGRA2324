import { CGFobject } from '../../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyPetal extends CGFobject {
    constructor(scene, base, height, inclination=-Math.PI/4) {
        super(scene);
        this.base = base;
        this.height = height;
        this.inclination = inclination;

        this.triangle1 = new MyTriangle(scene, base, height);
        this.triangle2 = new MyTriangle(scene, base, height);

    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.triangle1.display();
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(this.inclination,1,0,0);
        this.triangle2.display();
        this.scene.popMatrix();
    }
}
