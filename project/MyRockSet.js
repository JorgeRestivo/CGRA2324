import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks, maxRadius) {
        super(scene);
        this.numRocks = numRocks;
        this.maxRadius = maxRadius;
        this.rocks = [];
        this.initRocks();
        this.initOffsets();
    }

    initRocks() {
        for (let i = 0; i < this.numRocks; i++) {
            let rock = new MyRock(this.scene, 16, 8, "textures/rock.jpg"); // Adjust slices and stacks as needed
            let scale = Math.random() * this.maxRadius;
            this.rocks.push({
                rock: rock,
                scale: [scale * (0.5 + Math.random()), scale * (0.5 + Math.random()), scale * (0.5 + Math.random())],
                translation: [Math.random() * 10 - 5, 0, Math.random() * 10 - 5],
                rotation: Math.random() * Math.PI * 2
            });
        }
    }

    initOffsets() {
        this.offsets = [];
        for (let i = 0; i < this.numRocks; i++) {
            const offsetX = (Math.random() - 0.5) * 2; // Adjust the range of offset as needed
            const offsetY = (Math.random() - 0.5) * 2; // Adjust the range of offset as needed
            const offsetZ = (Math.random() - 0.5) * 2; // Adjust the range of offset as needed
            this.offsets.push([offsetX, offsetY, offsetZ]);
        }
    }

    display() {
        for (let i = 0; i < this.rocks.length; i++) {
            const rockData = this.rocks[i];
            const offset = this.offsets[i];

            this.scene.pushMatrix();
            this.scene.translate(rockData.translation[0] + offset[0], rockData.translation[1] + offset[1], rockData.translation[2] + offset[2]);
            this.scene.rotate(rockData.rotation, 0, 1, 0);
            this.scene.scale(...rockData.scale);
            rockData.rock.display();
            this.scene.popMatrix();
        }
    }

    updateBuffers(complexity) {
        for (let rockData of this.rocks) {
            rockData.rock.updateBuffers(complexity);
        }
    }
}
