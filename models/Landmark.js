import fs from 'fs/promises';

class Landmark {
    path = "./data/landmarks.json";
    landmarks = [];

    constructor(landmarks = []) {
        this.landmarks = landmarks;
    }

    async readJSON() {
            const data = await fs.readFile(this.path);
            this.landmarks = JSON.parse(data);
            return this.landmarks;
    }

    async saveJSON(){
        const data = JSON.stringify(this.landmarks, null, 2);
        try {
            await fs.writeFile(this.path, data);
            console.log('Datos guardados correctamente');
        } catch (error) {
            console.error('Los datos no se han podido guardar');
        }
    }

    async addLanmark(landmark){
        this.landmarks = await this.readJSON();
        const id = crypto.randomUUID();
        this.landmarks.push({
            id: id,
            landmark_name: landmark.landmark_name,
            city: landmark.city, 
            type: landmark.type,
            description: landmark.description,
            popularity: landmark.popularity
        });

        await this.saveJSON();
        return id;
    }

    async getLandmarks(){
        this.landmarks = await this.readJSON(); 
        return this.landmarks;
    }

    async getLandmarkById(id) {
        await this.readJSON();
        const landmark = this.landmarks.find(item => item.id === id);

        return landmark ? landmark : 'Not Found';
    }

    async deleteLandmarkById(id) {
        this.landmarks = await this.readJSON();

        const index = this.landmarks.findIndex(item => item.id === id);
        if (index == -1){
            return 'Not Found';
        } else {
            this.landmarks.splice(index, 1);
            await this.saveJSON();
            return index;
        }
    }

    async updateLanmarkById(id, landmark){
        this.landmarks = await this.readJSON();

        const index = this.landmarks.findIndex(item => item.id === id);
        if (index == -1){
            return 'Not Found';
        } else {
            this.landmarks[index] = { ...this.landmarks[index], ...landmark};
            await this.saveJSON();
            return this.landmarks[index];
        }
    }
}

export default Landmark;