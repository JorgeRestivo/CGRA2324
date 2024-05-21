import { MyBee } from './MyBee.js';

export class MyMovement extends MyBee {
    constructor(scene, x = 0, y = 0, z = 0, orientation = 0) {
        super(scene, x, y, z, orientation);
        this.velocity = { x: 0, y: 0, z: 0 };
        this.speed = 0.2; // Default speed of the bee
    }

    update(t) {
        super.update(t);

        // Get the speed factor from the scene
        const speedFactor = this.scene.speedFactor;

        // Calculate the adjusted speed based on the speed factor
        const adjustedSpeed = this.speed * speedFactor *2;

        // Process keyboard input for movement
        if (this.scene.gui.isKeyPressed("KeyW")) {
            this.position.x += adjustedSpeed * Math.sin(this.orientation);
            this.position.z += adjustedSpeed * Math.cos(this.orientation);
        }
        if (this.scene.gui.isKeyPressed("KeyS")) {
            // Move backwards along the opposite direction of the bee's orientation vector
            this.position.x -= adjustedSpeed * Math.sin(this.orientation);
            this.position.z -= adjustedSpeed * Math.cos(this.orientation);
        }
        if (this.scene.gui.isKeyPressed("KeyA")){
            this.turn(-Math.PI / 180 * speedFactor*2);
        }
        if (this.scene.gui.isKeyPressed("KeyD")){
            this.turn(Math.PI / 180 * speedFactor *2);
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
        
        this.position.x += this.velocity.x * t;
        this.position.y += this.velocity.y * t;
        this.position.z += this.velocity.z * t;
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
    }
}
