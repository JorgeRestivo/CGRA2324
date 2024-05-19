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
        const spacingX = 20; // Adjust as needed
        const spacingZ = 20; // Adjust as needed
    
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                // Randomly decide whether to use positive or negative values for x and z
                const xSign = Math.random() < 0.5 ? -1 : 1;
                const zSign = Math.random() < 0.5 ? -1 : 1;
    
                // Random x position within spacing
                const x = Math.random() * spacingX * xSign + i * spacingX;
                
                // Random z position within spacing
                const z = Math.random() * spacingZ * zSign + j * spacingZ;
    
                const flower = new MyFlower(this.scene, 16, 20, 10.0, x, z);
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
