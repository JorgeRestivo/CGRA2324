import { CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyBeeSphere } from "./MyBeeSphere.js";
import { MyCylinder } from "./MyCylinder.js";

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
        
        this.position = { x: x, y: y, z: z };
        this.orientation = orientation;
        this.velocity = { x: 0, y: 0, z: 0 };
        this.speed = 0.1; // Speed of the bee
    }

    update(t) {
        this.time = t / 5000; // Convert time to seconds

        // Process keyboard input for movement
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.position.z -= this.speed; // Move forward
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            this.position.z += this.speed; // Move backward
        }
        if (this.scene.gui.isKeyPressed("KeyA")) {
            this.position.x -= this.speed; // Move left
        }
        if (this.scene.gui.isKeyPressed("KeyD")) {
            this.position.x += this.speed; // Move right
        }
        if (this.scene.gui.isKeyPressed("KeyQ")) {
            this.position.y -= this.speed; // Move down
        }
        if (this.scene.gui.isKeyPressed("KeyE")) {
            this.position.y += this.speed; // Move up
        }
        this.position.x += this.velocity.x * t;
        this.position.y += this.velocity.y * t;
        this.position.z += this.velocity.z * t;
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

        this.scene.popMatrix();
    }
    turn(angle) {
        // Update orientation
        this.orientation += angle;
    
        // Update velocity direction while maintaining the same magnitude
        // (assuming we're only rotating around the Z axis)
        const currentSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        const newOrientation = this.orientation + angle;
        this.velocity.x = currentSpeed * Math.cos(newOrientation);
        this.velocity.y = currentSpeed * Math.sin(newOrientation);
    }
    

    
    accelerate(value) {
        // Increase or decrease velocity magnitude while keeping the same direction
        const currentSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
        const newSpeed = Math.max(0, currentSpeed + value); // Ensure speed doesn't go negative
        const directionX = Math.sin(this.orientation);
        const directionZ = Math.cos(this.orientation);
        this.velocity.x = newSpeed * directionX;
        this.velocity.z = newSpeed * directionZ;
    }
    reset() {
        // Reset position, orientation, and velocity to initial values
        this.position = { x: 0, y: 0, z: 0 };
        this.orientation = 0;
        this.velocity = { x: 0, y: 0, z: 0 };
    }
}
