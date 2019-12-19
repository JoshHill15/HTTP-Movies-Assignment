import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieForm from "./MovieForm";
import { Route } from "react-router-dom";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    console.log("movielist props", props)

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    // this.setState({ movies: this.props.movies})
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        this.setState({ movies: res.data })
      })
      .catch(err => console.log(err.response));
  }
  
  render(props) {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
        {/* <Route
          path= {`/update_movies/:id`}
          render={props => (
            <MovieForm
              {...props}
              setter={this.setter}
              movies={this.state.movies}
            />
          )}
        /> */}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <div>
      <Link to={`/movies/${movie.id}`}>
        <MovieCard movie={movie} />
      </Link>
    </div>
  );
}
