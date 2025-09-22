import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
    landmark_name: {
        type: String,
        trim: true,
        required: [true, 'El nombre del lugar turístico es obligatorio'],
        minlength: [2, 'El lugar turístico debe tener al menos 2 caracteres'],
        maxlength: [100, 'El lugar turístico no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El lugar turístico solo puede contener letras y espacios']
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'La ciudad del lugar turístico es obligatoria'],
        minlength: [2, 'La ciudad debe tener al menos 2 caracteres'],
        maxlength: [100, 'La ciudad no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'La ciudad solo puede contener letras y espacios']
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'El tipo de lugar turístico es obligatorio'],
        minlength: [2, 'El tipo debe tener al menos 2 caracteres'],
        maxlength: [100, 'El tipo no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El tipo solo puede contener letras y espacios']
    },
    description: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'La descripción del lugar turístico es obligatoria'],
        minlength: [2, 'La descripción debe tener al menos 2 caracteres'],
        maxlength: [200, 'La descripción no puede superar los 200 caracteres'],
    },
    popularity: {
        type: Number,
        required: true,
        required: [true, 'La popularidad del lugar turístico es obligatoria'],
        min: [0, 'La popularidad mínima es 0'],
        max: [10, 'La popularidad máxima permitida es 10'],
    }
});

// cambiar la primer letra de una palabra en mayúscula para landmark_name y city
mySchema.pre('save', function(next) {
    const capitalizeWords = (str) => str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // aplicar la función en los campos necesarios
    this.landmark_name = capitalizeWords(this.landmark_name);
    this.city = capitalizeWords(this.city);

    next();
});

// cambiar la primer letra de una palabra en mayúscula cada vez que se actualice para city_name, country y continent
mySchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    const capitalizeWords = (str) => str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // verificar si el campo está presente en el update y si existe aplicar la función para capitalizar
    if (update.landmark_name) update.landmark_name = capitalizeWords(update.landmark_name);
    if (update.city) update.city = capitalizeWords(update.city);

    next();
});

const model = mongoose.model('Landmark', mySchema);

export default model;