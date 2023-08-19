import mongoose from "mongoose";

const Movie_Theaters = new mongoose.Schema({


    movietheater_id: String,
    movietheater_name: String,
    movietheater_address: String,
    movietheater_location: String,
    movietheater_screens: [String],

});

const MovieTheaters = mongoose.model("MovieTheaters", Movie_Theaters);
export default MovieTheaters;

