import mongoose from "mongoose";


// Create Schema
const statsTableSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    movie_name: String,
    movietheater_location: String,
    amountSpent: String
});

const statsTable = mongoose.model("statsTable", statsTableSchema );

export default statsTable;