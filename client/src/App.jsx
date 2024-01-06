import { useState } from "react";
import "./App.css";
import axios from "axios";
import List from "./List";

function App() {
  const [moviestate, setMovieState] = useState({
    movie_name: "",
    movie_review: "",
  });
  const [movie, setMovie] = useState({});
  console.log(moviestate);

  function handleSubmit(e) {
    e.preventDefault();
    setMovie({
      movie_name: moviestate.movie_name,
      movie_review: moviestate.movie_review,
    });

    axios
      .post("http://localhost:8000/api/insert", {
        movie_name: moviestate.movie_name,
        movie_review: moviestate.movie_review,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setMovieState({
      movie_name: "",
      movie_review: "",
    });
  }

  function handleChange(e) {
    setMovieState((moviestate) => {
      return { ...moviestate, [e.target.name]: e.target.value };
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>CRUD APP</h2>
        <div className=" flex flex-col">
          <div className=" flex flex-col">
            <label className=" text-xl font-semibold  text-slate-200">
              Movie Title
            </label>
            <input
              name="movie_name"
              value={moviestate.movie_name}
              onChange={(e) => handleChange(e)}
              className=" p-2  rounded-md outline-none text-black"
              type="text"
            />
          </div>
          <div className=" flex flex-col">
            <label className=" text-xl font-semibold  text-slate-200">
              Movie Review
            </label>
            <textarea
              name="movie_review"
              value={moviestate.movie_review}
              onChange={(e) => handleChange(e)}
              className=" outline-none text-black rounded-md h-40"
              type="text"
            />
          </div>
        </div>
        <button className=" text-gray-100 bg-emerald-500 p-4 rounded-lg mt-4">
          Submit
        </button>
      </form>
      <List movie={movie} />
    </>
  );
}

export default App;
