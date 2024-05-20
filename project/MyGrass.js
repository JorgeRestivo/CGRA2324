import { CGFobject } from '../../lib/CGF.js';

export class MyGrass extends CGFobject {
    constructor(scene, width, length, numRows, numCols) {
        super(scene);
        this.width = width;
        this.length = length;
        this.numRows = numRows;
        this.numCols = numCols;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        
        const triangleWidth = this.width / this.numCols;
        const triangleLength = this.length / this.numRows;

        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const z1 = j * triangleWidth;
                const y1 = i * triangleLength;
                const z2 = (j + 1) * triangleWidth;
                const y2 = i * triangleLength;
                const z3 = j * triangleWidth;
                const y3 = (i + 1) * triangleLength;

                // Random height between 0.5 and 2.0
                const minHeight = 0.5;
                const maxHeight = 2.0;
                const x = Math.random() * (maxHeight - minHeight) + minHeight;

                this.vertices.push(x, y1, z1);
                this.vertices.push(x, y2, z2);
                this.vertices.push(x, y3, z3);

                const startIndex = (i * this.numCols + j) * 3;
                this.indices.push(startIndex+2, startIndex , startIndex+1 );
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
