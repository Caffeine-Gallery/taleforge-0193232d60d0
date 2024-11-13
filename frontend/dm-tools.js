import { backend } from "declarations/backend";

class MapGenerator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    async generateMap(settings) {
        const mapData = await backend.generateMapData(settings);
        this.drawMap(mapData);
    }

    drawMap(mapData) {
        // Clear canvas
        this.ctx.fillStyle = '#1e3d59';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw continents
        mapData.continents.forEach(continent => {
            this.drawContinent(continent);
        });

        // Draw landmarks
        mapData.landmarks.forEach(landmark => {
            this.drawLandmark(landmark);
        });

        // Draw labels
        this.ctx.font = '16px MedievalSharp';
        this.ctx.fillStyle = '#000';
        mapData.landmarks.forEach(landmark => {
            this.ctx.fillText(landmark.name, landmark.x + 15, landmark.y + 15);
        });
    }

    drawContinent(continent) {
        this.ctx.beginPath();
        this.ctx.moveTo(continent.points[0].x, continent.points[0].y);
        
        for (let i = 1; i < continent.points.length; i++) {
            this.ctx.lineTo(continent.points[i].x, continent.points[i].y);
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = '#90b77d';
        this.ctx.fill();
        this.ctx.strokeStyle = '#42855b';
        this.ctx.stroke();
    }

    drawLandmark(landmark) {
        this.ctx.beginPath();
        this.ctx.arc(landmark.x, landmark.y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fill();
        this.ctx.strokeStyle = '#c92a2a';
        this.ctx.stroke();
    }

    exportMap() {
        const link = document.createElement('a');
        link.download = 'fantasy-map.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mapCanvas');
    const mapGenerator = new MapGenerator(canvas);
    
    document.getElementById('generateMap').addEventListener('click', async () => {
        const settings = {
            continentDensity: parseInt(document.getElementById('continentDensity').value),
            oceanLevel: parseInt(document.getElementById('oceanLevel').value),
            landmarkDensity: parseInt(document.getElementById('landmarkDensity').value)
        };
        
        await mapGenerator.generateMap(settings);
    });

    document.getElementById('exportMap').addEventListener('click', () => {
        mapGenerator.exportMap();
    });

    // Generate initial map
    mapGenerator.generateMap({
        continentDensity: 3,
        oceanLevel: 3,
        landmarkDensity: 3
    });
});
