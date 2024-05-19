import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MyRockSet } from './MyRockSet.js';

export class MyGardenRocks extends CGFobject {
    constructor(scene) {
        super(scene);
        this.singleRocks = [];
        this.rockSets = [];
        this.initRocks();
    }

    initRocks() {
        // Create 5 single rocks
        for (let i = 0; i < 5; i++) {
            let rock = new MyRock(this.scene, 16, 8, "textures/rock.jpg");
            let scale = Math.random() * 1.0 + 1.0; // Scale between 0.5 and 1.0
            let translation;
            do {
                translation = [Math.random() * 20 - 10, 0, Math.random() * 20 - 10]; // Random position on xOz plane
            } while (this.isOverlapping(translation, scale));
            let rotation = Math.random() * Math.PI * 2; // Random rotation
            this.singleRocks.push({ rock: rock, scale: scale, translation: translation, rotation: rotation });
        }

        // Create 3 rock sets
        for (let i = 0; i < 3; i++) {
            let rockSet = new MyRockSet(this.scene, 5, 2); // Each set with 5 rocks, max radius 1
            let translation;
            do {
                translation = [Math.random() * 20 - 10, 0, Math.random() * 20 - 10]; // Random position on xOz plane
            } while (this.isOverlapping(translation, 1)); // Assuming max radius of rock set is 1
            this.rockSets.push({ rockSet: rockSet, translation: translation });
        }
    }

    isOverlapping(translation, scale) {
        for (let i = 0; i < this.singleRocks.length; i++) {
            let rock = this.singleRocks[i];
            let distance = Math.sqrt(
                Math.pow(translation[0] - rock.translation[0], 2) + Math.pow(translation[2] - rock.translation[2], 2)
            );
            if (distance < scale + rock.scale) {
                return true;
            }
        }

        for (let i = 0; i < this.rockSets.length; i++) {
            let rockSet = this.rockSets[i];
            let distance = Math.sqrt(
                Math.pow(translation[0] - rockSet.translation[0], 2) + Math.pow(translation[2] - rockSet.translation[2], 2)
            );
            if (distance < scale + 9) { 
                return true;
            }
        }

        return false;
    }

    display() {
        // Display single rocks
        for (let i = 0; i < this.singleRocks.length; i++) {
            const rockData = this.singleRocks[i];

            this.scene.pushMatrix();
            this.scene.translate(...rockData.translation);
            this.scene.rotate(rockData.rotation, 0, 1, 0);
            this.scene.scale(rockData.scale, rockData.scale, rockData.scale);
            rockData.rock.display();
            this.scene.popMatrix();
        }

        // Display rock sets
        for (let i = 0; i < this.rockSets.length; i++) {
            const rockSetData = this.rockSets[i];

            this.scene.pushMatrix();
            this.scene.translate(...rockSetData.translation);
            rockSetData.rockSet.display();
            this.scene.popMatrix();
        }
    }

    updateBuffers(complexity) {
        for (let rockData of this.singleRocks) {
            rockData.rock.updateBuffers(complexity);
        }
        for (let rockSetData of this.rockSets) {
            rockSetData.rockSet.updateBuffers(complexity);
        }
    }
}
