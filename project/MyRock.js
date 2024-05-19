import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, texturePath) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texturePath = texturePath;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        const randDisplacement = () => (Math.random() - 0.5) * 0.3; // Adjust the factor to control the ruggedness

        for (let stack = 0; stack <= this.stacks; ++stack) {
            let phi = stack * Math.PI / this.stacks;
            let cosPhi = Math.cos(phi);
            let sinPhi = Math.sin(phi);

            for (let slice = 0; slice <= this.slices; ++slice) {
                let theta = slice * 2 * Math.PI / this.slices;
                let cosTheta = Math.cos(theta);
                let sinTheta = Math.sin(theta);

                let x = cosTheta * sinPhi;
                let y = cosPhi;
                let z = sinTheta * sinPhi;

                // Apply displacement to create bumps
                let displacement = 1 + randDisplacement();
                this.vertices.push(x * displacement, y * displacement, z * displacement);
                this.normals.push(x, y, z);
                this.texCoords.push(slice / this.slices, stack / this.stacks);
            }
        }

        for (let stack = 0; stack < this.stacks; ++stack) {
            for (let slice = 0; slice < this.slices; ++slice) {
                let first = stack * (this.slices + 1) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

        // Load texture
        this.texture = new CGFtexture(this.scene, this.texturePath);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
    }

    display() {
        this.appearance.apply();
        super.display();
    }

    updateBuffers(complexity) {
        // Update buffers if needed
    }
}
