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

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        // Create a folder for garden settings
        const gardenFolder = this.gui.addFolder('Garden Settings');

        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayRocks').name('Display Rocks');


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
}