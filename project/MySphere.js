import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, radius, invertFaces = false) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.invertFaces = invertFaces;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        for (let i = 0; i <= this.stacks; i++) {
            const theta = i * Math.PI / this.stacks;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
    
            for (let j = 0; j <= this.slices; j++) {
                const phi = j * 2 * Math.PI / this.slices;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
    
                const x = this.radius * sinTheta * cosPhi;
                const y = this.radius * cosTheta;
                const z = this.radius * sinTheta * sinPhi;
    
                if (!this.invertFaces) {
                    this.vertices.push(x, y, z);
                    this.normals.push(sinTheta * cosPhi, cosTheta, sinTheta * sinPhi);
                } else {
                    this.vertices.unshift(x, y, z); // Insert at the beginning for inverted faces
                    this.normals.unshift(-sinTheta * cosPhi, -cosTheta, -sinTheta * sinPhi); // Invert normals for inverted faces
                }
    
                const s = 1 - j / this.slices;
                const t = 1 - i / this.stacks;
    
                this.texCoords.push(s, t);
            }
        }
    
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const first = i * (this.slices + 1) + j;
                const second = first + this.slices + 1;
    
                if (!this.invertFaces) {
                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                } else {
                    this.indices.push(first, first + 1, second);
                    this.indices.push(second, first + 1, second + 1);
                }
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}
