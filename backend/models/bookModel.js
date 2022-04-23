import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    countInStock: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },
})

const Book = mongoose.model('books', bookSchema)

export default Book