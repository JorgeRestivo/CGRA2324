import { MyBee } from './MyBee.js';
import { MyGarden } from './MyGarden.js';

export class MyMovement extends MyBee {
    constructor(scene, x = 0, y = 0, z = 0, orientation = 0) {
        super(scene, x, y, z, orientation);
        this.velocity = { x: 0, y: 0, z: 0 };
        this.speed = 0.2; // Default speed of the bee
        this.landed = false; // Indicates if the bee has landed
        this.carryingPollen = false; // Indicates if the bee is carrying pollen
        this.pollenPosition = null; // Position of the collected pollen
    }

    update(t) {
        super.update(t);

        // Get the speed factor from the scene
        const speedFactor = this.scene.speedFactor;

        // Calculate the adjusted speed based on the speed factor
        const adjustedSpeed = this.speed * speedFactor * 2;

        // Process keyboard input for movement
        if (!this.landed) {
            if (this.scene.gui.isKeyPressed("KeyW")) {
                this.position.x += adjustedSpeed * Math.sin(this.orientation);
                this.position.z += adjustedSpeed * Math.cos(this.orientation);
            }
            if (this.scene.gui.isKeyPressed("KeyS")) {
                this.position.x -= adjustedSpeed * Math.sin(this.orientation);
                this.position.z -= adjustedSpeed * Math.cos(this.orientation);
            }
            if (this.scene.gui.isKeyPressed("KeyA")) {
                this.turn(-Math.PI / 180 * speedFactor * 2);
            }
            if (this.scene.gui.isKeyPressed("KeyD")) {
                this.turn(Math.PI / 180 * speedFactor * 2);
            }
            if (this.scene.gui.isKeyPressed("KeyQ")) {
                this.position.y -= adjustedSpeed; // Move down
            }
            if (this.scene.gui.isKeyPressed("KeyE")) {
                this.position.y += adjustedSpeed; // Move up
            }
            if (this.scene.gui.isKeyPressed("KeyR")) {
                this.reset();
            }
        }

        // Check if the bee is close enough to collect pollen
        if (!this.carryingPollen) {
            this.checkPollenProximity();
        }

        // If the bee is not landed, apply velocity
        if (!this.landed) {
            this.position.x += this.velocity.x * t;
            this.position.y += this.velocity.y * t;
            this.position.z += this.velocity.z * t;
        }
    }

    turn(angle) {
        // Update orientation around the Y-axis
        this.orientation += angle;

        // Ensure orientation stays within [0, 2*PI] range
        if (this.orientation < 0) {
            this.orientation += 2 * Math.PI;
        } else if (this.orientation >= 2 * Math.PI) {
            this.orientation -= 2 * Math.PI;
        }
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
        this.landed = false; // Reset landing state
        this.carryingPollen = false; // Reset pollen state
    }

    checkPollenProximity() {
        const thresholdDistance = 0.5; // Define a proximity threshold
        const pollenPositions = this.scene.garden.getPollenPosition();
        let closestPollen = null;
        let closestDistance = Infinity;

        for (const pollen of pollenPositions) {
            const distance = Math.sqrt(
                (pollen.x - this.position.x) ** 2 +
                (pollen.y - this.position.y) ** 2 +
                (pollen.z - this.position.z) ** 2
            );

            if (distance < closestDistance && distance < thresholdDistance) {
                closestDistance = distance;
                closestPollen = pollen;
            }
        }

        if (closestPollen) {
            this.collectPollen(closestPollen);
        }
    }

    collectPollen(pollen) {
        this.carryingPollen = true; // Set carryingPollen state to true to indicate that the bee is carrying pollen
        this.pollenPosition = pollen; // Store the position of the collected pollen
        this.scene.garden.collectPollenAtPosition(pollen); // Trigger pollen collection in the garden
    }
    

    display() {
        super.display();

        if (this.carryingPollen) {
            // Draw the pollen attached to the bee
            this.scene.pushMatrix();
            this.scene.translate(this.position.x, this.position.y - 0.5, this.position.z); // Adjust the position as needed
            this.scene.scale(0.1, 0.1, 0.1); // Adjust the scale as needed
            // Assuming you have a MyPollen class for drawing pollen
            this.scene.pollenAppearance.apply();
            this.scene.pollen.display();
            this.scene.popMatrix();
        }
    }
}
