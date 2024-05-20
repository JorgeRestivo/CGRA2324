import { MySphere } from './MySphere.js';
import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyPollen extends MySphere {
    constructor(scene, slices, stacks, radius) {
        super(scene, slices, stacks, radius);

        // Apply different scale factors to Y coordinate for the two hemispheres
        this.scaleFactorTop = 1.5; // Larger scale factor for the top hemisphere
        this.scaleFactorBottom = 0.5; // Smaller scale factor for the bottom hemisphere

        this.texture = new CGFtexture(scene, 'textures/pollen.jpg');

        // Create an appearance with the orange color and the provided texture
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1, 0.5, 0); // Orange color
        this.appearance.setTexture(this.texture);
        // Initialize buffers with the modified vertices, normals, and texture coordinates
        this.initBuffers();
    }

    initBuffers() {
        super.initBuffers();

        // Apply scale factors to Y coordinate for the two hemispheres
        for (let i = 0; i < this.vertices.length; i += 3) {
            // Apply different scale factors based on Y coordinate
            if (this.vertices[i + 1] >= 0) {
                // Top hemisphere
                this.vertices[i + 1] *= this.scaleFactorTop;
            } else {
                // Bottom hemisphere
                this.vertices[i + 1] *= this.scaleFactorBottom;
            }
        }
    }
    display() {
        // Apply the material before displaying the pollen
        this.appearance.apply();

        // Display the pollen using the inherited display method
        super.display();
    }
}
