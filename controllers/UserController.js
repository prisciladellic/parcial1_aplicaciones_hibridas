import UserModel from "../models/userModel.js";

class UserController {
    // obtener todos los usuarios
    static async getUsers ( req, res ) {
        try {
            const users = await UserModel.find();

            if (users.length === 0) {
                return res.status(200).json({ msg: 'No hay usuarios cargados en la base de datos 🟡', data: {} });
            }

            res.status(200).json({ msg: 'Ok usuarios 🟢', data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No fue posible obtener los usuarios 🔴'})
        }
    }

    // obtener usuario x id
    static async getUserById (req, res) {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            
            if(user){
                res.status(200).json({msg: 'Usuario encontrado 🟢', data: user});
            } else {
                res.status(404).json({msg: 'Usuario no encontrado 🔴', data: {}});
            }
        } catch(error){
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    // agregar un nuevo usuario
    static async postUser (req, res) {
        try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({ msg: 'Faltan campos obligatorios por rellenar'})
            return;
        }

        const userData = await UserModel.findOne({email});

        if( userData){
            res.status(400).json({ msg: 'El email ya existe, intente nuevamente' });
            return;
        }

        const user = new UserModel({ name, email, password });

        const data = await user.save();
        res.status(201).json({ msg: 'ok', data:{ id: data._id, created: data.created} });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'No se pudo guardar el usuario'});
        }
    }

    // eliminar un usuario
    static async deleteUserById (req, res) {
        try {
            const {id}= req.params;
            const user = await UserModel.findByIdAndDelete(id);
            
            if(user){
                res.status(200).json({msg: 'Usuario eliminado correctamente 🟢', data: user});
            } else {
                res.status(404).json({msg: 'Usuario no encontrado 🔴', data: {}});
            } 
        } catch {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }

    // actualizar un usuario
    static async updateUserById (req, res) {
        try {
            const {id}= req.params;
            const {name, email, password} = req.body;
            if(!name || !email || !password) {
                res.status(400).json({msg: 'Faltan campos obligatorios por rellenar'});
                return;
            }

            const user = await UserModel.findByIdAndUpdate(id, {name, email, password});
            res.status(202).json({msg: 'Usuario actualizado correctamente 🟢', data: user});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: 'Ocurrió un error con el servidor, lamentamos las molestias ocasionadas', data: {}});
        }
    }
}

export default UserController;