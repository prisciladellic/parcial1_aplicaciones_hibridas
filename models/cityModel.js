import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
    city_name: {
        type: String,
        trim: true,
        required: [true, 'El nombre de la ciudad es obligatorio'],
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [100, 'El nombre no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios']
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'El país de la ciudad es obligatorio'],
        minlength: [2, 'El país debe tener al menos 2 caracteres'],
        maxlength: [100, 'El país no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El país solo puede contener letras y espacios']
    },
    continent: {
        type: String,
        trim: true,
        required: [true, 'El continente de la ciudad es obligatorio'],
        minlength: [2, 'El continente debe tener al menos 2 caracteres'],
        maxlength: [100, 'El continente no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El continente solo puede contener letras y espacios']
    },
    language: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'El continente de la ciudad es obligatorio'],
        minlength: [2, 'El continente debe tener al menos 2 caracteres'],
        maxlength: [100, 'El continente no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El idioma solo puede contener letras y espacios']
    },
    climate: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        required: [true, 'El continente de la ciudad es obligatorio'],
        minlength: [2, 'El continente debe tener al menos 2 caracteres'],
        maxlength: [100, 'El continente no puede superar los 100 caracteres'],
        match: [/^[a-zA-Z\s]+$/, 'El clima solo puede contener letras y espacios']
    }
});

// cambiar la primer letra de una palabra en mayúscula para city_name, country y continent
mySchema.pre('save', function(next) {
    const capitalizeWords = (str) => str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    // aplicar la función en los campos necesarios
    this.city_name = capitalizeWords(this.city_name);
    this.country = capitalizeWords(this.country);
    this.continent = capitalizeWords(this.continent);

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
    if (update.city_name) update.city_name = capitalizeWords(update.city_name);
    if (update.country) update.country = capitalizeWords(update.country);
    if (update.continent) update.continent = capitalizeWords(update.continent);

    next();
});

const model = mongoose.model('City', mySchema);

export default model;