import { CGFobject } from '../../lib/CGF.js';
import { MyBlade } from './MyBlade.js';

export class MyGrass extends CGFobject {
    constructor(scene, numBlades) {
        super(scene);
        this.numBlades = numBlades;

        this.initGrass();
    }

    initGrass() {
        this.blades = [];

        // Create blades of grass with random positions
        for (let i = 0; i < this.numBlades; i++) {
            // Generate random x and z coordinates within a certain range
            const x = Math.random() * 10 - 5; // Random x coordinate between -5 and 5
            const z = Math.random() * 10 - 5; // Random z coordinate between -5 and 5

            const blade = new MyBlade(this.scene, x, z);
            this.blades.push(blade);
        }
    }

    display() {
        // Display each blade of grass
        for (let i = 0; i < this.numBlades; i++) {
            this.blades[i].display();
        }
    }
}
