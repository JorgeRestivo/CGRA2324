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
        const minX = -20; // Minimum x coordinate
        const minZ = -20; // Minimum z coordinate
        const spacingX = 20; // Spacing between flowers along the x-axis
        const spacingZ = 20; // Spacing between flowers along the z-axis
        const offsetRange = 8; // Range of random offset
        
        const totalSpacingX = (this.numRows - 1) * spacingX;
        const totalSpacingZ = (this.numCols - 1) * spacingZ;
        const totalWidth = totalSpacingX;
        const totalLength = totalSpacingZ;
        
        // Calculate the starting x and z positions to center the grid
        const startX = minX + (totalWidth / 2);
        const startZ = minZ + (totalLength / 2);
        
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                // Calculate the x and z coordinates based on grid positions
                const x = startX - (i * spacingX) + (Math.random() * offsetRange * 2 - offsetRange);
                const z = startZ - (j * spacingZ) + (Math.random() * offsetRange * 2 - offsetRange);
                
                const flower = new MyFlower(this.scene, 16, 20, 10.0, x, z);
                this.flowers.push(flower);
            }
        }
    }

    getPollenPosition() {
        const pollenPositions = [];
        for (const flower of this.flowers) {
            if (flower.hasPollen) {
                // Calculate the position of the pollen based on the flower's position and the offsets applied to the pollen on the yellow cone
                const pollenOffsetY = flower.radius * 2 * 1.5; // Offset to position the pollen on top of the yellow cone
                const pollenPosition = {
                    x: flower.x,
                    y: pollenOffsetY,
                    z: flower.z
                };
                pollenPositions.push(pollenPosition);
            }
        }
        return pollenPositions;
    }
    

    collectPollenAtPosition(position) {
        for (const flower of this.flowers) {
            if (flower.position.x === position.x && flower.position.z === position.z && flower.hasPollen) {
                flower.collectPollen();
                break;
            }
        }
    }   
    

    display() {
        for (let i = 0; i < this.flowers.length; i++) {
            this.flowers[i].display();
        }
    }
}
