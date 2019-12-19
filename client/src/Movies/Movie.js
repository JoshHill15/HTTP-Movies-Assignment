import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Route } from "react-router-dom";
import MovieForm from "./MovieForm";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props, "p");
    this.state = {
      movie: null
    };
    console.log("movie state", this.state.movies)

  }
  // if (this.state.movies){

  // }
  // theID = this.state.movies.find(x => x.id === this.props.params.id) 
  
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
    this.props.history.push(`/update_movies/${this.props.match.params.id}`);
  };

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  delete = e => {
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(res => {
      console.log("delete", res)
      this.props.history.push("/")
    })
    .catch(err => console.log(err))
  }

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
          <div onClick = {this.delete} className="delete-button" >Delete</div>
          <div onClick={this.edit} className="edit-button">
            Edit
          </div>
        </div>
      </div>
    );
  }
}
