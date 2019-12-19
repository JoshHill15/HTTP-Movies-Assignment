import React, { useState, useEffect } from "react";
import axios from "axios";

const initalState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};


function MovieForm(props) {
  const [m, setM] = useState(initalState);
  console.log("movieform props", props);

  const handleChange = e => {
    setM({
      ...m,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setM(res.data))
      .catch(err => console.log(err.response));
  }, []);
  

  // useEffect(() => {
  //     const itemToEdit = props.movies.find(e => e.id === props.match.params.id)
  //     if(itemToEdit) setM(itemToEdit)
  //     console.log(itemToEdit, "err")
  // }, [props.movies, props.match.params.id])

  const submit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${m.id}`, m)
      .then(res => {
        console.log("put res.data", res.data);
        props.setMovies([...props.movies, m])
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  function stars(eventVal, idx){
    const star = m.stars.map((star,i) => i === idx ? eventVal : star)
    setM({ ...m, stars: star })
  }

  return (
    <div>
      <form onSubmit={submit} className="form">
        <h1>Edit Movie!</h1>
        <label>
          label
        <input
          type="text"
          name="title"
          value={m.title}
          onChange={handleChange}
          placeholder="title"
        />
        </label>
        <input
          type="text"
          name="director"
          value={m.director}
          onChange={handleChange}
          placeholder="director"
        />
        <input
          type="text"
          name="metascore"
          value={m.metascore}
          onChange={handleChange}
          placeholder="metascore"
        />
        {m.stars.map((star, i) => {
          return (
            <input
            type="text"
            name="stars"
            value={star}
            onChange={e => stars(e.target.value, i)}
            placeholder="stars"
          />
          )
        })}
                  {/* <input
            type="text"
            name="stars"
            value={m.stars}
            onChange={handleChange}
            placeholder="stars"
          /> */}
        <button type="submit">Edit Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
