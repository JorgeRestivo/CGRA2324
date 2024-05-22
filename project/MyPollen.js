import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyBeeSphere } from './MyBeeSphere.js';

export class MyPollen extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);

        // Create the bee sphere
        this.pollen = new MyBeeSphere(scene, slices, stacks, radius);
        this.scene = scene;

        // Load and set the texture
        this.texture = new CGFtexture(this.scene, "textures/pollen.jpg");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);

        // Set the random rotation angle once
        this.pollenRandomRotation = Math.random() * 2 * Math.PI; // Random angle between 0 and 2*PI
    }

    display() {
        this.scene.pushMatrix();

        // Apply the random rotation
        this.scene.rotate(this.pollenRandomRotation, 0, 1, 0); // Rotate the pollen around its center along the Y-axis
        this.scene.scale(1.6, 1, 1);
        this.scene.scale(2,2,2);

        // Apply the appearance
        this.appearance.apply();

        // Display the bee sphere
        this.pollen.display();

        this.scene.popMatrix();
    }
}
