import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Route } from "react-router-dom";
import MovieForm from "./MovieForm";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, "p");
    this.state = {
      movie: null
    };
  }
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }
  edit = e => {
    e.preventDefault();
    this.props.history.push(`movies/update_movies/${this.props.match.params.id}`);
  };
  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div>

        <div className="save-wrapper">
          <MovieCard movie={this.state.movie} />
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
          <div className="delete-button">delete</div>
          <div onClick={this.edit} className="edit-button">
            edit
          </div>
        </div>
      </div>
    );
  }
}
