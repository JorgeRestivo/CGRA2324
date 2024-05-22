import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyIsoscelesTriangle } from './MyIsoscelesTriangle.js';

export class MyBlade extends CGFobject {
    constructor(scene, x, z, windAngle, windStrength, base, height) {
        super(scene);
        this.x = x;
        this.z = z;
        this.windAngle = windAngle;
        this.windStrength = windStrength;
        this.base = base;
        this.height = height;

        this.initBlade();
    }

    initBlade() {
        this.triangle = new MyIsoscelesTriangle(this.scene, this.base, this.height);
        this.bladeShader = new CGFshader(this.scene.gl, "./shaders/grass.vert", "./shaders/grass.frag");
    }

    display(timeSinceAppStart) {
        this.scene.setActiveShader(this.bladeShader);
        this.scene.pushMatrix();
        
        // Update wind effect in shader
        const timeFactor = Math.sin(2 * Math.PI * timeSinceAppStart);
        const diffAngle = (this.windAngle * 2 * Math.PI) / 360;
        this.bladeShader.setUniformsValues({ timeFactor: timeFactor, angle: diffAngle, strength: this.windStrength });

        this.scene.translate(this.x, 0, this.z);
        this.triangle.display();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
