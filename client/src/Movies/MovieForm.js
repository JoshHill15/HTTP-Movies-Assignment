import React, { useState, useEffect } from "react";
import axios from "axios"


const initalState = {
  title: "",
  director: "",
  metascore: "",
  stars: [""],
  id: Date.now()
};


function MovieForm(props) {
  const [m, setM] = useState(initalState);
  const [theMovies, setTheMovies] = useState([])
  console.log("themovies", theMovies)
    console.log("movieform props", props)

  const handleChange = (e) => {
      e.persist()
    setM({
        ...m,
        [e.target.name]: e.target.value
    })
  };

  useEffect(() => {
      axios.get("http://localhost:5000/api/movies")
      .then(res => {
          console.log("movie form get", res)
      })
      .catch(err => console.log(err))
  })

  useEffect(() => {
    console.log(props, "alskdfjlsdk")
}, [props])

  useEffect(() => {
      if (props.movies){
        const editItem = props.movies.find(e => e.id === props.match.params.id)
    //   const editItem = props.movies?.find(e => e.id === props.match.params.id)
      if(editItem){
          setM(editItem)
      }
    }
  }, [props.movies, props.match.params.id])

  const submit = e => {
      e.preventDefault()
      axios.put(`http://localhost:5000/api/movies/${m.id}`, m)
      .then(res => {
          console.log("put res.data", res.data)
          console.log("props movies", props.movies)
          props.setter([...props.movies, m])
      })
      .catch(err => console.log(err))
      props.history.push("/")
  }

  return (
    <div >
      <form onSubmit = {submit} className = "form">
      <h1>Edit Movie!</h1>
        <input
          type="text"
          name="title"
          value={m.title}
          onChange={handleChange}
          placeholder = "title"
        />
        <input
          type="text"
          name="director"
          value={m.director}
          onChange={handleChange}
          placeholder = "director"
        />
        <input
          type="text"
          name="metascore"
          value={m.metascore}
          onChange={handleChange}
          placeholder = "metascore"
        />
        <input
          type="text"
          name="stars"
          value={m.stars}
          onChange={handleChange}
          placeholder = "stars"
        />
        <button type = "submit">Edit Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
