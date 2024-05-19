import { MyBeeSphere } from "./MyBeeSphere.js";

export class MyBee {
    constructor(scene) {
        this.scene = scene;
        this.bodySphere = new MyBeeSphere(scene, 20, 20, 0.5); // Create a custom sphere for the body
        this.headSphere = new MyBeeSphere(scene, 12, 12, 0.3); // Create a custom sphere for the head
    }

    draw() {
        const gl = this.scene.gl;

        // Draw body (abdomen)
        gl.uniform4f(this.scene.uColor, 1.0, 0.8, 0.0, 1.0); // Yellow color
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.0); // Body position
        this.bodySphere.display();
        this.scene.popMatrix();

        // Draw head
        gl.uniform4f(this.scene.uColor, 1.0, 0.8, 0.0, 1.0); // Yellow color
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.6, 0.0); // Head position (above body)
        this.headSphere.display();
        this.scene.popMatrix();

        // Optionally, draw other body parts like wings, legs, etc.
    }
}
