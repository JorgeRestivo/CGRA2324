import { CGFobject } from '../../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene, base, height) {
        super(scene);
        this.base = base;
        this.height = height;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -this.base / 2, 0, 0,   // V0
            this.base / 2, 0, 0,    // V1
            0, this.height, 0      // V2
        ];

        this.indices = [
            0, 1, 2
        ];

        // Calculate normal vector for the triangle face using cross product
        const vector1 = [this.vertices[3] - this.vertices[0], this.vertices[4] - this.vertices[1], this.vertices[5] - this.vertices[2]];
        const vector2 = [this.vertices[6] - this.vertices[0], this.vertices[7] - this.vertices[1], this.vertices[8] - this.vertices[2]];
        const normalVector = [
            vector1[1] * vector2[2] - vector1[2] * vector2[1],
            vector1[2] * vector2[0] - vector1[0] * vector2[2],
            vector1[0] * vector2[1] - vector1[1] * vector2[0]
        ];

        // Normalize the normal vector
        const length = Math.sqrt(normalVector[0] * normalVector[0] + normalVector[1] * normalVector[1] + normalVector[2] * normalVector[2]);
        normalVector[0] /= length;
        normalVector[1] /= length;
        normalVector[2] /= length;

        // Apply the same normal to each vertex since it's a flat surface
        this.normals = [
            normalVector[0], normalVector[1], normalVector[2], // N0
            normalVector[0], normalVector[1], normalVector[2], // N1
            normalVector[0], normalVector[1], normalVector[2]  // N2
        ];

        // Texture coordinates
        // Assuming you want texture coordinates that map the entire texture to the triangle
        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
