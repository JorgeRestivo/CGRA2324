import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; // Add texture coordinates array
    
        for (let z = 0; z <= this.stacks; z += 1) {
            this.vertices.push(1, 0, z / this.stacks);
            this.normals.push(1, 0, 0);
            this.texCoords.push(1, z / this.stacks); // Add texture coordinates for each vertex
        }
    
        for (let i = 1; i <= this.slices; i++) {
    
            let angle = 2 * Math.PI * i / this.slices;
            let x = Math.cos(angle);
            let y = Math.sin(angle);
    
            let vector_size = Math.sqrt(x * x + y * y);
            if (i != this.slices) {
                this.vertices.push(x, y, 0);
                this.normals.push(x / vector_size, y / vector_size, 0);
                this.texCoords.push(0, 0); // Add texture coordinates for each vertex
            }
    
            for (let j = 1; j <= this.stacks; j++) {
    
                if (i != this.slices) {
    
                    let z = j / this.stacks;
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, y / vector_size, 0);
                    this.texCoords.push(i / this.slices, z); // Add texture coordinates for each vertex
    
                    let points = this.vertices.length / 3;
                    let indexC = points - 2;
                    let indexD = points - 1;
                    let indexB = indexD - (this.stacks + 1);
                    let indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
    
                } else {
    
                    let points = this.vertices.length / 3;
    
                    let indexC = j - 1;
                    let indexD = j;
                    let indexB = points - this.stacks - 1 + j;
                    let indexA = indexB - 1;
                    this.indices.push(indexA, indexC, indexD, indexA, indexD, indexB);
                }
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

    updateBuffers(complexity) {
    }
}