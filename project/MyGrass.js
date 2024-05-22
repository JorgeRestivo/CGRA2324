import { CGFobject } from '../../lib/CGF.js';
import { MyBlade } from './MyBlade.js';

export class MyGrass extends CGFobject {
    constructor(scene, numBlades, windAngle, windStrength) {
        super(scene);
        this.numBlades = numBlades;
        this.windAngle = windAngle;
        this.windStrength = windStrength;

        this.minDistance = 0.5; // Minimum distance between blades
        this.initGrass();
    }

    initGrass() {
        this.blades = [];
        const positions = [];

        // Create blades of grass with random positions
        for (let i = 0; i < this.numBlades; i++) {
            let x, z;
            let validPosition = false;

            while (!validPosition) {
                x = Math.random() * 10 - 5; // Random x coordinate between -5 and 5
                z = Math.random() * 10 - 5; // Random z coordinate between -5 and 5
                validPosition = true;

                // Check distance from existing blades
                for (let pos of positions) {
                    const dx = pos.x - x;
                    const dz = pos.z - z;
                    const distance = Math.sqrt(dx * dx + dz * dz);
                    if (distance < this.minDistance) {
                        validPosition = false;
                        break;
                    }
                }
            }

            positions.push({ x, z });
            const blade = new MyBlade(this.scene, x, z);
            this.blades.push(blade);
        }
    }

    display() {
        const currentTime = (performance.now() - this.scene.appStartTime) / 1000.0; // Get current time in seconds
        for (let i = 0; i < this.numBlades; i++) {
            this.blades[i].display(currentTime); // Pass current time to blade display
        }
    }

    update(timeSinceAppStart, windAngle, windStrength) {
        this.windAngle = windAngle;
        this.windStrength = windStrength;
        // Update each blade of grass with wind parameters
        for (let blade of this.blades) {
            blade.update(windAngle, windStrength);
        }
    }
}
