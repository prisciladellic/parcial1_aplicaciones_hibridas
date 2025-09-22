import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mySchema = new Schema({
    city_name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    country: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    continent: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    language: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    climate: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    }
});

const model = mongoose.model('City', mySchema);

export default model;