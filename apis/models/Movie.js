import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: { type: String },
    imageUrl: { type: String },
    imageTitle: { type: String },
    imageSm: { type: String },
    trailer: { type: String },
    videoUrl: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
}, {timestamps: true})

const movie = mongoose.model('movie', MovieSchema);
export default movie;
