import { CGFobject } from '../../lib/CGF.js';

export class MyBeeSphere extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i <= this.stacks; i++) {
            const theta = (i * Math.PI) / this.stacks;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let j = 0; j <= this.slices; j++) {
                const phi = (j * 2 * Math.PI) / this.slices;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = this.radius * cosPhi * sinTheta;
                const y = this.radius * cosTheta;
                const z = this.radius * sinPhi * sinTheta;

                const normalX = cosPhi * sinTheta;
                const normalY = cosTheta;
                const normalZ = sinPhi * sinTheta;

                this.vertices.push(x, y, z);
                this.normals.push(normalX, normalY, normalZ);

                const u = 1 - j / this.slices;
                const v = 1 - i / this.stacks;
                this.texCoords.push(u, v);
            }
        }

        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const first = i * (this.slices + 1) + j;
                const second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}