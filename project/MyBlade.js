import { CGFobject, CGFshader } from '../../lib/CGF.js';
import { MyIsoscelesTriangle } from './MyIsoscelesTriangle.js';

export class MyBlade extends CGFobject {
    constructor(scene, x, z) { // Remove windAngle, windStrength, base, height from constructor
        super(scene);
        this.x = x;
        this.z = z;
        this.windAngle = 0; // Initialize with default values
        this.windStrength = 0;
        this.base = 0.1; // Set default base and height for the blade
        this.height = 1.0;

        this.initBlade();
    }

    initBlade() {
        this.triangle = new MyIsoscelesTriangle(this.scene, this.base, this.height);
        this.bladeShader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag"); // Ensure paths are correct
    }

    display(timeSinceAppStart) {
        this.scene.setActiveShader(this.bladeShader);
        this.scene.pushMatrix();
        this.scene.setDiffuse(0,1,0,0);
        this.scene.scale(1,3,1);

        // Update wind effect in shader
        const timeFactor = Math.sin(2 * Math.PI * timeSinceAppStart);
        const diffAngle = (this.windAngle * 2 * Math.PI) / 360;
        this.bladeShader.setUniformsValues({ timeFactor: timeFactor, angle: diffAngle, strength: this.windStrength });

        this.scene.translate(this.x, 0, this.z);
        this.triangle.display();

        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(windAngle, windStrength) {
        this.windAngle = windAngle;
        this.windStrength = windStrength;
    }
}
