import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from './MyCone.js';

export class MyFlower extends CGFobject {
    constructor(scene, slices, stacks, height, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius = radius;
        this.numCylinders = 3; // Number of cylinders to stack
        this.spacing = 0; // Spacing between cylinders
        this.cylinders = [];

        // Create instances of MyCylinder for stacking
        for (let i = 0; i < this.numCylinders; i++) {
            // Generate a random inclination angle for each stem
            const randomInclination = Math.random() * Math.PI / 4; // Random inclination between 0 and 45 degrees (in radians)

            // Create a new cylinder instance with the random inclination angle
            const cylinder = new MyCylinder(scene, slices, stacks);
            cylinder.inclination = randomInclination; // Set the inclination property of the cylinder

            // Push the cylinder instance into the cylinders array
            this.cylinders.push(cylinder);
        }

        // Create a cone for the end of the stem
        this.cone = new MyCone(scene, slices, stacks);
    }

    display() {
        // Display cylinders (stems)
        for (let i = 0; i < this.numCylinders - 1; i++) {
            this.scene.pushMatrix();
            const translation = (this.height + this.spacing) * i;
            this.scene.translate(0, translation, 0);
            this.scene.setDiffuse(0, 1, 0, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(this.radius, this.radius, this.height);
            this.cylinders[i].display(); // Display the cylinder
            this.scene.popMatrix();
        }

        // Display the last cylinder with its random inclination
        const lastIndex = this.numCylinders - 1;
        const translation = (this.height + this.spacing) * lastIndex;

        this.scene.pushMatrix();
        this.scene.translate(0, translation, 0);
        this.scene.rotate(-Math.PI / 2 + this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
        this.scene.scale(this.radius, this.radius, this.height);
        this.cylinders[lastIndex].display(); // Display the last cylinder
        this.scene.popMatrix();

        // Calculate the translation for the cone to align with the top of the last cylinder
        const coneTranslationX = 0; // No translation in X-axis
        const coneTranslationY = translation + this.height * Math.cos(this.cylinders[lastIndex].inclination);
        const coneTranslationZ = this.height * Math.sin(this.cylinders[lastIndex].inclination);

        this.scene.pushMatrix();
        this.scene.translate(coneTranslationX, coneTranslationY, coneTranslationZ);
        this.scene.setDiffuse(0, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2 + this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder
        this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3); // Scale the cone to match the cylinder
        this.cone.display(); // Display the cone
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(coneTranslationX, coneTranslationY, coneTranslationZ);
        this.scene.setDiffuse(0, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2 + this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
        this.scene.rotate(Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder
        this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3); // Scale the cone to match the cylinder
        this.scene.setDiffuse(1,1,0,0);
        this.cone.display(); // Display the cone
        this.scene.popMatrix();
    }
}
