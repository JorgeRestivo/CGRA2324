import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCube } from './MyCube.js';
import { MyRoof } from './MyRoof.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cube = new MyCube(scene);
        this.roof = new MyRoof(scene);

        this.scene=scene;
        // Dimensions
        this.width = 2;
        this.height = 1.5;
        this.depth = 2;

        // Texture
        this.woodTexture = new CGFtexture(this.scene, "textures/wood.jpg");
        this.woodAppearance = new CGFappearance(this.scene);
        this.woodAppearance.setTexture(this.woodTexture);

        this.roofTexture = new CGFtexture(this.scene, "textures/roof.webp");
        this.roofAppearance = new CGFappearance(this.scene);
        this.roofAppearance.setTexture(this.roofTexture);
    }

    display() {
        // Main body
        this.scene.pushMatrix();
        this.scene.scale(this.width, this.height, this.depth);
        this.woodAppearance.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.width, this.height, this.depth);
        this.scene.translate(0, this.height*0.5, 0); 
        this.woodAppearance.apply();
        this.cube.display();
        this.scene.popMatrix();

        // Roof
        this.scene.pushMatrix();
        this.scene.translate(0, this.height*1.2, 0); // Position at the height of the last cube
        this.scene.scale(this.width*1.2, this.width / 2*1.2, this.depth*1.2);
        this.roofAppearance.apply();
        this.roof.display();
        this.scene.popMatrix();

        // Entrance
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.width / 2+0.1); // Adjust position to be at the side
        this.scene.scale(0.4, 0.2, 0.2); // Small entrance
        this.cube.display();
        this.scene.popMatrix();
    }
}
