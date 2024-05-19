import { MyFlower } from "./MyFlower.js";

export class MyGarden {
    constructor(scene, numRows, numCols) {
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = [];

        this.generateGarden();
    }

    generateGarden() {
        const spacingX = 10; // Adjust as needed
        const spacingZ = 10; // Adjust as needed
    
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const x = Math.random() * spacingX + i * spacingX; // Random x position within spacing
                const z = Math.random() * spacingZ + j * spacingZ; // Random z position within spacing
                const flower = new MyFlower(this.scene, 16, 20, 10.0, 0.7, x, z);
                this.flowers.push(flower);
            }
        }
    }

    display() {
        for (let i = 0; i < this.flowers.length; i++) {
            this.flowers[i].display();
        }
    }
}
