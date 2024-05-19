import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
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
    
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
    
        for (var i = 0; i < this.slices; i++) {
    
            var x = Math.cos(ang);
            var z = -Math.sin(ang);
    
            this.vertices.push(x, 0, z);
    
            var normalY = Math.cos(Math.PI / 4.0); // Adjust this value according to the angle of the cone
    
            // Calculate the normal for the current vertex
            var normal = [x, normalY, z];
            vec3.normalize(normal, normal);
    
            this.normals.push(...normal);
    
            // Calculate texture coordinates (u, v)
            var u = 0.5 + 0.5 * Math.cos(ang); // Map x to u in [0,1]
            var v = 0.5 + 0.5 * Math.sin(ang); // Map z to v in [0,1]
            this.texCoords.push(u, v);
    
            ang += alphaAng;
        }
    
        // Add the vertex and normal for the apex of the cone
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5); // Texture coordinate for the apex
    
        // Generate indices
        for (var i = 0; i < this.slices; i++) {
            this.indices.push(i, (i + 1) % this.slices, this.slices);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}