import { CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyBeeSphere } from "./MyBeeSphere.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPollen } from "./MyPollen.js";

export class MyBee {
    constructor(scene, x = 0, y = 0, z = 0, orientation = 0) {
        this.scene = scene;
        this.bodySphere = new MyBeeSphere(scene, 20, 20, 0.5); // Create a custom sphere for the body
        this.headSphere = new MyBeeSphere(scene, 12, 12, 0.3); // Create a custom sphere for the head
        this.cylinder = new MyCylinder(scene, 7, 7);

        this.texture = new CGFtexture(this.scene, "textures/beeEyes.jpg");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);

        this.texture2 = new CGFtexture(this.scene, "textures/beeHead.jpg");
        this.appearance2 = new CGFappearance(this.scene);
        this.appearance2.setTexture(this.texture2);

        this.texture3 = new CGFtexture(this.scene, "textures/beeFur.jpg");
        this.appearance3 = new CGFappearance(this.scene);
        this.appearance3.setTexture(this.texture3);

        this.texture4 = new CGFtexture(this.scene, "textures/beeWings.jpeg");
        this.appearance4 = new CGFappearance(this.scene);
        this.appearance4.setTexture(this.texture4);

        this.oscillationFrequency = 1.0; // 1 Hz for the up and down motion
        this.wingFlapFrequency = 10.0; // 10 Hz for the wing flapping
        this.time = 0; // Keep track of the time

        this.pollen = new MyPollen(scene); // Add pollen reference
        this.carryingPollen = false; // Bee starts without pollen
        
        this.position = { x: x, y: y, z: z };
        this.orientation = orientation;
    }

    update(t) {
        this.time = t / 5000; // Convert time to seconds
    }
    
    display() {
        // Calculate oscillation and wing flap angles
        const oscillationAngle = Math.sin(2 * Math.PI * this.oscillationFrequency * this.time) * 0.2;
        const wingFlapAngle = Math.sin(2 * Math.PI * this.wingFlapFrequency * this.time) * Math.PI / 16;

        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.orientation, 0, 1, 0); // Rotate around Y axis
        // Apply the vertical oscillation
        this.scene.translate(0, oscillationAngle, 0);

        this.scene.rotate(Math.PI / 2, 0, 0, -1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);

        // Draw head
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 5, 0, 0, 1);
        this.scene.scale(5.3, 4, 4);
        this.appearance2.apply();
        this.headSphere.display();
        this.scene.popMatrix();

        // Draw eyes
        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0, 1);
        this.scene.scale(2.5, 1.9, 1.4);
        this.appearance.apply();
        this.headSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0, -1);
        this.scene.scale(2.5, 1.9, 1.4);
        this.appearance.apply();
        this.headSphere.display();
        this.scene.popMatrix();

        // Draw 1st body (abdomen)
        this.scene.pushMatrix();
        this.scene.translate(0.3, -3.2, 0);
        this.scene.scale(4, 4.7, 4);
        this.appearance2.apply();
        this.bodySphere.display();
        this.scene.popMatrix();

        // Draw 2nd body (abdomen)
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 7, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(0, 1.5, 8.6);
        this.scene.scale(4.6, 4.9, 7.4);
        this.appearance3.apply();
        this.bodySphere.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        // Back Wings
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 3, 0, 0, 1);

       // Left Back Wing
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(-1.5, 7.3, 1.5);
        this.scene.translate(0, -3.5, 0); // Move pivot to bottom of the wing
        this.scene.rotate(wingFlapAngle, 1, 0, 0); // Apply wing flapping
        this.scene.translate(0, 3.5, 0); // Move back to original position
        this.scene.scale(3, 7, 1);
        this.appearance4.apply();
        this.bodySphere.display();
        this.scene.popMatrix();

        // Right Back Wing
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(-1.5, 7.3, -1.5);
        this.scene.translate(0, -3.5, 0); // Move pivot to bottom of the wing
        this.scene.rotate(-wingFlapAngle, 1, 0, 0); // Apply wing flapping
        this.scene.translate(0, 3.5, 0); // Move back to original position
        this.scene.scale(3, 7, 1);
        this.appearance4.apply();
        this.bodySphere.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // Front Wings
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 6, 0, 0, 1);

        // Left Front Wing
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(-1.5, 5.7, 1.5);
        this.scene.translate(0, -3.5, 0); // Move pivot to bottom of the wing
        this.scene.rotate(wingFlapAngle, 1, 0, 0); // Apply wing flapping
        this.scene.translate(0, 3.5, 0); // Move back to original position
        this.scene.scale(3, 7, 1);
        this.appearance4.apply();
        this.bodySphere.display();
        this.scene.popMatrix();

        // Right Front Wing
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.translate(-1.5, 5.7, -1.5);
        this.scene.translate(0, -3.5, 0); // Move pivot to bottom of the wing
        this.scene.rotate(-wingFlapAngle, 1, 0, 0); // Apply wing flapping
        this.scene.translate(0, 3.5, 0); // Move back to original position
        this.scene.scale(3, 7, 1);
        this.appearance4.apply();
        this.bodySphere.display();
        this.scene.popMatrix(); 

        this.scene.popMatrix();

        // Front paws
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.3, 0.3, 2);
        this.scene.translate(-3, -6, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.3, 0.3, 2);
        this.scene.translate(3, -6, 0.5);
        this.cylinder.display();
        this.scene.popMatrix();

        // Draw pollen if bee is carrying it
        if (this.carryingPollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0); // Adjust the position of the pollen
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

     // New methods to manage pollen state
     collectPollen() {
        this.carryingPollen = true;
    }

    dropPollen() {
        this.carryingPollen = false;
    }
}
