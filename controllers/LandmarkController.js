import LandmarkModel from '../models/landmarkModel.js';

class LandmarkController {
    // obtener los lugares turísticos - filtros por ciudad y por popularidad - búsqueda por nombre
    static async getLandmarks (req, res) {
        try {
            const { city, popularity, name } = req.query;
            const filter = {};

            // filtros introducidos por el usuario case-insensitive con 'i'
            if (city) { 
                filter.city = { $regex: city, $options: 'i' };
            } 
            if (popularity) { 
                filter.popularity = popularity;
            }
            if (name) { 
                filter.landmark_name = { $regex: name, $options: 'i' }; 
            }

            const landmarks = await LandmarkModel.find(filter); 

            if (landmarks.length === 0) {
                if (Object.keys(filter).length === 0) {
                    // base de datos vacía y sin filtros
                    return res.status(200).json({ msg: 'No hay lugares turísticos cargados en la base de datos 🟡', data: {} });
                } else {
                    // base de datos cargada pero no encontró coincidencias con los filtros
                    return res.status(404).json({ msg: 'No se encontraron lugares turísticos con las características ingresadas 🔴', data: {} });
                }
            }

            res.status(200).json({ msg: 'Ok lugares 🟢', data: landmarks });
        } catch(error) {
            console.log(error);
            res.status(500).json({msg: 'No fue posible obtener los lugares turísticos 🔴'});
        }
    }

    // obtener lugar x id
    static async getLandmarkById (req, res) {
        try {
            const id = req.params.id;
            const landmark = await LandmarkModel.findById(id);
            
            if(landmark){
                res.status(200).json({msg: 'Lugar turístico encontrado 🟢', data: landmark});
            } else {
                res.status(404).json({msg: 'Lugar turístico no encontrado 🔴', data: {}});
            }
        } catch(error){
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    // agregar un nuevo lugar 
    static async postLandmark (req, res) {
        try {
            const {landmark_name, city, type, description, popularity} = req.body;
            if(!landmark_name || !city || !type || !description || !popularity) {
                res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
                return;
            }
            
            // validación de caracteres soportados 
            const regex = /^[a-zA-Z\s]+$/;
            if (!regex.test(landmark_name) || !regex.test(city) || !regex.test(type)) {
                res.status(400).json({msg: 'Los campos solo pueden contener letras sin tildes ni ñ'});
                return;
            }

            // validación de números en el campo popularity
            if (isNaN(popularity)) {
                res.status(400).json({msg: 'El campo popularidad debe ser un número'});
                return;
            }
            const popularityNumber = Number(popularity);
            if (popularityNumber < 0 || popularityNumber > 10) {
                res.status(400).json({msg: 'El campo popularidad debe estar entre 0 y 10'});
                return;
            }   

            const landmarkData = await LandmarkModel.findOne({landmark_name});
            if(landmarkData){
                res.status(404).json({ msg: 'El lugar ya existe en nuestra base de datos'});
                return;
            }

            const landmark = new LandmarkModel({landmark_name, city, type, description, popularity: popularityNumber});

            const data = await landmark.save();
            res.status(201).json({msg: 'Ok posteado 🟢', data: {id: data._id, created: data.created}});

        } catch(error) {
            console.log(error);
            res.status(500).json({msg: 'No fue posible guardar el lugar turístico, vuelva a intentar más tarde'});
        }
    }

    // eliminar un lugar
    static async deleteLandmarkById (req, res) {
        try {
            const {id}= req.params;
            const landmark = await LandmarkModel.findByIdAndDelete(id);
            
            if(landmark){
                res.status(200).json({msg: 'Lugar eliminado correctamente 🟢', data: landmark});
            } else {
                res.status(404).json({msg: 'Lugar no encontrado 🔴', data: {}});
            } 
        } catch {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    // actualizar un lugar
    static async updateLandmarkById (req, res) {
        try {
            const {id}= req.params;
            const {landmark_name, city, type, description, popularity} = req.body;
            if(!landmark_name || !city || !type || !description || !popularity) {
                res.status(400).json({msg: "Faltan campos obligatorios por rellenar"});
                return;
            }

            const landmark = await LandmarkModel.findByIdAndUpdate(id, {landmark_name, city, type, description, popularity});
            res.status(202).json({msg: 'Lugar actualizado correctamente 🟢', data: landmark});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }
}

export default LandmarkController;