import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import books from './data/books.js' 

import Books from './models/bookModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () =>{
    try {
        await Books.deleteMany()
        console.log('Data deleted!'.gray)


        const sampleBooks = books.map(book => {
            return {...book}
        })

        await Books.insertMany(sampleBooks)
        console.log('Data imported!'.green.bold)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
    }
}

importData()