import mongoose from "mongoose";

const Movies_schema = new mongoose.Schema({

  movie_id: Number,
  movie_name: String,
  movie_genres: [String],
  movie_rating: String,
  movie_languages: [String],
  movie_length: String,
  movie_subtitles: [String],
  movie_cast: [String],
  movie_image: String,
  cast_actor: [String],
  movie_release_date: Date

});

const AllMovies = mongoose.model("Movies", Movies_schema);
export default AllMovies;

