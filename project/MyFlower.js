import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from './MyCone.js';
import { MyPetal } from './MyPetal.js';

export class MyFlower extends CGFobject {
    constructor(scene, slices, stacks, height, radius, x ,z) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius = radius;
        this.numCylinders = 3; // Number of cylinders to stack
        this.spacing = 0; // Spacing between cylinders
        this.cylinders = [];
        this.numPetals = 12; // Number of petals
        this.x = x;
        this.z = z;


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

        // Create instances of MyPetal
        this.petals = [];
        for (let i = 0; i < this.numPetals; i++) {
            const petal = new MyPetal(scene, radius, radius * 2);
            this.petals.push(petal);
        }
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z); // Apply translation

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
        this.scene.rotate(-Math.PI / 2 , 1, 0, 0); // Apply the random inclination
        this.scene.scale(this.radius, this.radius, this.height);
        this.cylinders[lastIndex].display(); // Display the last cylinder
        this.scene.popMatrix();

        // Display the green cone
        this.scene.pushMatrix();
        this.scene.translate(0, this.numCylinders*this.height, 0);
        this.scene.setDiffuse(0, 1, 0, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Apply the random inclination
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder
        this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3); // Scale the cone to match the cylinder
        this.cone.display(); // Display the green cone
        this.scene.popMatrix();

        // Display the yellow cone
        this.scene.pushMatrix();
        this.scene.translate(0, this.numCylinders*this.height, 0);
        this.scene.setDiffuse(1, 1, 0, 0); // Set color to yellow
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Apply the random inclination
        this.scene.rotate(Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder
        this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3); // Scale the cone to match the cylinder
        this.cone.display(); // Display the yellow cone
        this.scene.popMatrix();

        // Display petals around the cone
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.numCylinders*this.height , 0); // Translate petal downwards
            this.scene.rotate((2 * Math.PI / this.numPetals) * i, 0, 1, 0); // Rotate petal around the cone
            this.scene.translate(0, this.radius * 3 - 0.7, this.radius * 4); // Translate petal to the correct position, increased separation
            this.scene.rotate(Math.PI / 5, 1, 0, 0); // Incline petal towards the sky
            this.scene.scale(2.5, 2, 2); // Adjust scaling if needed
            this.scene.setDiffuse(1, 0, 0, 0); // Set petal color
            this.petals[i].display(); // Display the petal
            this.scene.popMatrix();
        }

        this.scene.popMatrix(); // Pop the matrix for the flower's translation
    }
}
