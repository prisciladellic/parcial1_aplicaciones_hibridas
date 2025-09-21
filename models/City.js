import fs from 'fs/promises';

class City {
    path = "./data/cities.js";
    cities = [];

    constructor(cities = []) {
        this.cities = cities;
    }

    async readJSON() {
            const data = await fs.readFile(this.path);
            this.cities = JSON.parse(data);
            return this.cities;
    }

    async saveJSON(){
        const data = JSON.stringify(this.cities, null, 2);
        try {
            await fs.writeFile(this.path, data);
            console.log('Datos guardados correctamente');
        } catch (error) {
            console.error('Los datos no se han podido guardar');
        }
    }

    async addCity(city){
        this.cities = await this.readJSON();
        const id = crypto.randomUUID();
        this.cities.push({
            id: id,
            city_name: city.city_name,
            country: city.country, 
            continent: city.continent,
            language: city.language,
            climate: city.climate
        });

        await this.saveJSON();
        return id;
    }

    async getCities(){
        this.cities = await this.readJSON(); 
        return this.cities;
    }

    async getCityById(id) {
        await this.readJSON();
        const city = this.cities.find(item => item.id === id);

        return city ? city : 'Not Found';
    }

    async deleteCityById(id) {
        this.cities = await this.readJSON();

        const index = this.cities.findIndex(item => item.id === id);
        if (index == -1){
            return 'Not Found';
        } else {
            this.cities.splice(index, 1);
            await this.saveJSON();
            return index;
        }
    }

    async updateCityById(id, city){
        this.cities = await this.readJSON();

        const index = this.cities.findIndex(item => item.id === id);
        if (index == -1){
            return 'Not Found';
        } else {
            this.cities[index] = { ...this.cities[index], ...city};
            await this.saveJSON();
            return this.cities[index];
        }
    }
}

export default City;