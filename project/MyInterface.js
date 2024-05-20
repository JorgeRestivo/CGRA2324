import {CGFinterface, dat} from '../lib/CGF.js';
/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        this.initKeys(); // Initialize key handling

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        

        // Create a folder for garden settings
        const gardenFolder = this.gui.addFolder('Garden Settings');

        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayRocks').name('Display Rocks');
        this.gui.add(this.scene, 'displayBee').name('Display Bee');
        this.gui.add(this.scene, 'displayGrass').name('Display Grass');


        // Add controls for numRows and numCols
        const numRowsControl = gardenFolder.add(this.scene, 'numRows', 5, 15).step(1).name('Number of Rows');
        const numColsControl = gardenFolder.add(this.scene, 'numCols', 5, 15).step(1).name('Number of Columns');

        // Function to update garden when numRows or numCols change
        const updateGarden = () => {
            this.scene.updateGarden();
        };

        // Listen for changes in numRows and numCols and update garden accordingly
        numRowsControl.onChange(updateGarden);
        numColsControl.onChange(updateGarden);

        return true;
    }
    initKeys(){
        // create reference from the scene to the GUI
        this.scene.gui = this;
        
        // disable the processKeyboard function
        this.scene.processKeyboard = function () {};

        // create a named array to store which keys are being pressed
        this.activeKeys = {};

        document.addEventListener('keydown', this.processKeyDown.bind(this), false);
        document.addEventListener('keyup', this.processKeyUp.bind(this), false);
    }
    processKeyDown(event) {
        // Mark the pressed key as active in the array
        this.activeKeys[event.code] = true;

        // Process key actions
        switch (event.code) {
            case 'KeyW':
                this.scene.bee.accelerate(0.1 * this.scene.speedFactor);
                break;
            case 'KeyS':
                this.scene.bee.accelerate(-0.1 * this.scene.speedFactor);
                break;
            case 'KeyA':
                this.scene.bee.turn(-Math.PI / 180 * this.scene.speedFactor);
                break;
            case 'KeyD':
                this.scene.bee.turn(Math.PI / 180 * this.scene.speedFactor);
                break;
            case 'KeyR':
                // Reset bee position, orientation, and velocity
                this.scene.bee.reset();
                break;
        }
    }

    processKeyUp(event) {
        // Mark the released key as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        // Returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}