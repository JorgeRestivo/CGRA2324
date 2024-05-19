import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        // Create the sphere with invertFaces set to true
        this.sphere = new MySphere(this.scene, 40, 40, 200, true);
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);  // Set the emission color, adjust if necessary
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT'); // Ensure texture wraps correctly, adjust as needed
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        // If the camera is to be centered in the panorama, move the sphere with the camera
        if (this.scene.infinitePanorama) {
            this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        }
        this.sphere.display();
        this.scene.popMatrix();
    }
}