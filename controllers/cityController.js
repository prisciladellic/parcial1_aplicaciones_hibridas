import CityModel from '../models/cityModel.js';

class CityController {
    // obtener ciudades - filtros por país y por continente - búsqueda por nombre
    static async getCities (req, res) {
        try {
            const { continent, country, name } = req.query;
            const filter = {};

            // filtros introducidos por el usuario case-insensitive con 'i'
            if (continent) { 
                filter.continent = { $regex: continent, $options: 'i' };
            } 
            if (country) { 
                filter.country = { $regex: country, $options: 'i' };
            }
            if (name) { 
                filter.city_name = { $regex: name, $options: 'i' }; 
            }

            const cities = await CityModel.find(filter); 

            if (cities.length === 0) {
                if (Object.keys(filter).length === 0) {
                    // base de datos vacía y sin filtros
                    return res.status(200).json({ msg: 'No hay ciudades cargadas en la base de datos 🟡', data: {} });
                } else {
                    // base de datos cargada pero no encontró coincidencias con los filtros
                    return res.status(404).json({ msg: 'No se encontraron ciudades con esas características 🔴', data: {} });
                }
            }

            res.status(200).json({ msg: 'Ok ciudades 🟢', data: cities });
        } catch(error) {
            console.log(error);
            res.status(500).json({msg: 'No fue posible obtener las ciudades 🔴'});
        }
    }

    // obtener ciudad x id
    static async getCityById (req, res) {
        try {
            const id = req.params.id;
            const city = await CityModel.findById(id);
            
            if(city){
                res.status(200).json({msg: 'Ciudad encontrada 🟢', data: city});
            } else {
                res.status(404).json({msg: 'Ciudad no encontrada 🔴', data: {}});
            }
        } catch(error){
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    // agregar una nueva ciudad 
    static async postCity (req, res) {
        try {
            const {city_name, country, continent, language, climate} = req.body;
            if(!city_name || !country || !continent || !language || !climate) {
                res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
                return;
            }
            
            // validación de caracteres soportados 
            const regex = /^[a-zA-Z\s]+$/;
            if (!regex.test(city_name) || !regex.test(country) || !regex.test(continent) || !regex.test(language) || !regex.test(climate)) {
                res.status(400).json({msg: 'Los campos solo pueden contener letras sin tildes ni ñ'});
                return;
            }

            const cityData = await CityModel.findOne({city_name});
            if(cityData){
                res.status(404).json({ msg: 'La ciudad ya existe en nuestra base de datos'});
                return;
            }

            const city = new CityModel({city_name, country, continent, language, climate});

            const data = await city.save();
            res.status(201).json({msg: 'Ok posteada 🟢', data: {id: data._id, created: data.created}});

        } catch(error) {
            console.log(error);
            res.status(500).json({msg: 'No fue posible guardar la ciudad, vuelva a intentar más tarde'});
        }
    }

    // eliminar una ciudad
    static async deleteCityById (req, res) {
        try {
            const {id}= req.params;
            const city = await CityModel.findByIdAndDelete(id);
            
            if(city){
                res.status(200).json({msg: 'Ciudad eliminada correctamente 🟢', data: city});
            } else {
                res.status(404).json({msg: 'Ciudad no encontrada 🔴', data: {}});
            } 
        } catch {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    // actualizar una ciudad
    static async updateCityById (req, res) {
        try {
            const {id}= req.params;
            const {city_name, country, continent, language, climate} = req.body;
            if(!city_name || !country || !continent || !language || !climate) {
                res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
                return;
            }

            const city = await CityModel.findByIdAndUpdate(id, {city_name, country, continent, language, climate});
            res.status(202).json({msg: 'Ciudad actualizada correctamente 🟢', data: city});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }
}

export default CityController;