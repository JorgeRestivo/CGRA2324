import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from './MyCone.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';

export class MyFlower extends CGFobject {
    constructor(scene, slices, stacks, height, x, z) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.spacing = 0; // Spacing between cylinders
        this.cylinders = [];
        this.x = x;
        this.z = z;
        this.hasPollen = true; // Indicate whether the flower has pollen

        // Generate a random number between 0.4 and 1.2 for the radius
        this.radius = Math.random() * (1.2 - 0.4) + 0.4;

        // Generate a random number of cylinders within a range
        this.numCylinders = Math.floor(Math.random() * (4 - 2 + 1)) + 2; // Random number between 1 and 5

        this.numPetals = Math.floor(Math.random() * (15 - 7 + 1)) + 7; // Random number between 7 and 15

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

        // Generate and store a random inclination angle for the last cylinder between 45 and 135 degrees
        this.lastCylinderInclination = (Math.random() * (Math.PI * (5 / 8) - Math.PI / 4)) + Math.PI / 4;

        // Generate a random radius for the cone between 0.5 and 1.5
        const coneRadius = Math.random() * (1.5 - 0.5) + 0.5;

        // Create a cone for the end of the stem
        this.cone = new MyCone(scene, slices, stacks);

        this.pollen = new MyPollen(this.scene, 10, 10, 0.3);

        // Scale the cone to adjust its radius
        this.scene.scale(coneRadius, coneRadius, coneRadius);

        // Create instances of MyPetal

        // Generate a random texture index for the flower petals
        this.randomTextureIndex = Math.floor(Math.random() * 5);

        this.petals = [];
        for (let i = 0; i < this.numPetals; i++) {
            const petal = new MyPetal(scene, this.radius, this.radius * 2, this.randomTextureIndex);
            this.petals.push(petal);
        }

        this.texture1 = new CGFtexture(scene, 'textures/receptacle.jpg');
        this.appearance1 = new CGFappearance(scene);
        this.appearance1.setTexture(this.texture1);

        this.texture2 = new CGFtexture(scene, 'textures/stem.jpg');
        this.appearance2 = new CGFappearance(scene);
        this.appearance2.setTexture(this.texture2);

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
            this.appearance2.apply();
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

        // Display the green cone
        this.scene.pushMatrix();
        this.scene.translate(coneTranslationX, coneTranslationY, coneTranslationZ);
        this.scene.rotate(-Math.PI / 2 + this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder
        this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3); // Scale the cone to match the cylinder
        this.appearance2.apply();
        this.cone.display(); // Display the cone
        this.scene.popMatrix();

        // Display the yellow cone
        this.scene.pushMatrix();
        this.scene.translate(coneTranslationX, coneTranslationY, coneTranslationZ);
        this.scene.rotate(-Math.PI / 2 + this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
        this.scene.rotate(Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder
        this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3); // Scale the cone to match the cylinder
        this.scene.setDiffuse(0, 0, 0, 0);
        this.appearance1.apply();
        this.cone.display(); // Display the yellow cone
        this.scene.popMatrix();

        // Display petals around the cone
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            this.scene.translate(coneTranslationX, coneTranslationY, coneTranslationZ); // Translate petal downwards
            this.scene.rotate(this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
            this.scene.rotate((2 * Math.PI / this.numPetals) * i, 0, 1, 0); // Rotate petal around the cone
            this.scene.translate(0, this.radius * 3 - 0.7, this.radius * 4); // Translate petal to the correct position, increased separation
            this.scene.rotate(Math.PI / 5, 1, 0, 0); // Incline petal towards the sky
            this.scene.scale(2.5, 2, 2); // Adjust scaling if needed
            this.scene.setDiffuse(1, 1, 1, 1);
            this.petals[i].display(); // Display the petal
            this.scene.popMatrix();
        }
        

        if(this.hasPollen){
            this.scene.pushMatrix();
            this.scene.translate(coneTranslationX, coneTranslationY, coneTranslationZ);
            this.scene.rotate(-Math.PI / 2 + this.cylinders[lastIndex].inclination, 1, 0, 0); // Apply the random inclination
            this.scene.rotate(Math.PI / 2, 1, 0, 0); // Rotate cone to align with cylinder

            // Translate upwards from the center of the flower to the top of the yellow cone
            const pollenOffsetY = this.radius * 2 * 1.5; // Offset to position the pollen on top of the yellow cone
            this.scene.translate(0, pollenOffsetY, 0);

            // Create and display MyPollen instance
            const myPollen = new MyPollen(this.scene, 10, 10, 0.3);
            this.pollen.display();

            this.scene.popMatrix(); // Pop the matrix for the MyPollen instance

            this.scene.popMatrix(); // Pop the matrix for the flower's translation
        }
        
    }
    collectPollen() {
        this.hasPollen = false; // Set pollen state to false to indicate it has been collected
    }
}
