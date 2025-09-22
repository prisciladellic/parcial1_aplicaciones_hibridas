import CityModel from '../models/cityModel.js';
// import bcrypt from 'bcrypt';
// import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async ( req, res ) => {
    try {
        const {city_name, country, continent, language, climate} = req.body;
        if(!city_name || !country || !continent || !language || !climate) {
            res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
            return;
        }

        const cityData = await CityModel.findOne({city_name});
        
        if(!cityData){
            res.status(404).json({ msg: 'La ciudad no existe en nuestra base de datos'});
            return;
        }

        /* generar el jwt
        const payload = {
            id: cityData._id,
            city_name: cityData.city_name
        }

        const jwt = jsonwebtoken.sign(payload, SECRET_KEY, {expiresIn: '2h'} );

        res.json({ msg: 'Credenciales Correctas', jwt}); */

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas'});
    }
}

// obtener ciudades
const getCities = async (req, res) => {
    try {
        const cities = await CityModel.find();
        res.status(200).json({msg: 'Ok 🟢', data: cities});
    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'No fue posible obtener las ciudades 🔴'});
    }
}

// obtener ciudad x id
const getCityById = async (req, res) => {
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
const postCity = async (req, res) => {
    try {
        const {city_name, country, continent, language, climate} = req.body;
        if(!city_name || !country || !continent || !language || !climate) {
            res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
            return;
        }

        const cityData = await CityModel.findOne({city_name});
        if(cityData){
            res.status(404).json({ msg: 'La ciudad no existe en nuestra base de datos'});
            return;
        }

        const city = new CityModel({city_name, country, continent, language, climate});

        const data = await city.save();
        res.status(201).json({msg: 'Ok 🟢', data: {id: data._id, created: data.created}});

    } catch(error) {
        console.log(error);
        res.status(500).json({msg: 'No fue posible guardar la ciudad, vuelva a intentar más tarde'});
    }
}

// eliminar una ciudad
const deleteCityById = async (req, res) => {
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
const updateCityById = async (req, res) => {
    try {
        const {id}= req.params;
        const {city_name, country, continent, language, climate} = req.body;
        if(!city_name || !country || !continent || !language || !climate) {
            res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
            return;
        }

        // console.log('La ciudad actulizada fue el id:' cityID)

        const city = await CityModel.findByIdAndUpdate(id, {city_name, country, continent, language, climate});
        res.status(202).json({msg: 'Ciudad actualizada correctamente 🟢', data: city});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
    }
}

export {postCity, getCities, getCityById, deleteCityById, updateCityById, auth};