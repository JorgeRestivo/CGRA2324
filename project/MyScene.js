import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";
import { MyBeeSphere } from "./MyBeeSphere.js";
import { MyBee } from "./MyBee.js";
import { MyGarden } from "./MyGarden.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyGardenRocks } from "./MyGardenRocks.js";


export class MyScene extends CGFscene {
    constructor() {
        super();
        this.numRows = 7;
        this.numCols = 7;
    }

    init(application) {
        super.init(application);

        this.initCameras();
        this.initLights();
        this.initTextures();
    

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 30);
        this.panorama = new MyPanorama(this, this.panoramatexture);
        this.petal = new MyPetal(this, 4, 6);
        this.bee = new MyBee(this);
        this.stem = new MyStem(this, 16, 20, 10.0, 0.7);
        this.garden = new MyGarden(this,this.numRows,this.numCols);
        this.gardenRocks = new MyGardenRocks(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayGarden = false;
        this.displayRocks = false;
        this.scaleFactor = 1;

        this.enableTextures(true);
    }

    updateGarden() {
        this.garden.generateGarden(); // Regenerate the garden with new parameters
    }

    initTextures() {
        this.texture = new CGFtexture(this, "images/terrain.jpg");
        this.rockTexture = new CGFtexture(this, "textures/rock.jpg");
        this.panoramatexture = new CGFtexture(this, "images/panorama4.jpg");
        this.appearance = new CGFappearance(this);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initLights() {
        this.lights[0].setPosition(15, 0, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(
            1.0,
            0.1,
            1000,
            vec3.fromValues(50, 10, 15),
            vec3.fromValues(0, 0, 0)
        );
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    display() {
        // Clear buffers and set up camera/view
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) this.axis.display();

        this.pushMatrix();
        this.rotate(-Math.PI/2,0,0,1);
        this.bee.display();
        this.popMatrix();

        this.gl.disable(this.gl.CULL_FACE); // Disable culling when rendering the sphere

        this.pushMatrix();
        this.panorama.display();
        this.popMatrix();

        //this.gl.enable(this.gl.CULL_FACE); // Re-enable culling for other objects

        // Draw primitive objects
        this.pushMatrix();
        this.appearance.apply();
        this.translate(0, -100, 0);
        this.scale(400, 400, 400);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.plane.display();
        this.popMatrix();


        if(this.displayGarden){
            this.garden.display();
        }

        if(this.displayRocks){
            this.pushMatrix();
            this.scale(3,2,2.5);
            this.gardenRocks.display();
            this.popMatrix();
        }


    }
}
