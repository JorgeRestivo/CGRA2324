import { CGFobject } from '../lib/CGF.js';

export class MyRoof extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            // Front face
            -0.5, 0, 0.5,
             0.5, 0, 0.5,
             0, 0.5, 0,

            // Back face
            -0.5, 0, -0.5,
             0.5, 0, -0.5,
             0, 0.5, 0,

            // Left face
            -0.5, 0, 0.5,
            -0.5, 0, -0.5,
             0, 0.5, 0,

            // Right face
             0.5, 0, 0.5,
             0.5, 0, -0.5,
             0, 0.5, 0,
             
            // Bottom face
            -0.5, 0, 0.5,
             0.5, 0, 0.5,
             0.5, 0, -0.5,
            -0.5, 0, -0.5
        ];

        this.indices = [
            // Front face
            0, 1, 2,
            // Back face
            3, 4, 5,
            // Left face
            6, 7, 8,
            // Right face
            9, 10, 11,
            // Bottom face
            12, 13, 14, 12, 14, 15
        ];

        this.normals = [
            // Front face
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            // Back face
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,

            // Left face
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            // Right face
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            // Bottom face
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ];

        this.texCoords = [
            // Front face
            0, 0,
            1, 0,
            0.5, 1,

            // Back face
            0, 0,
            1, 0,
            0.5, 1,

            // Left face
            0, 0,
            1, 0,
            0.5, 1,

            // Right face
            0, 0,
            1, 0,
            0.5, 1,

            // Bottom face
            0, 0,
            1, 0,
            1, 1,
            0, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
