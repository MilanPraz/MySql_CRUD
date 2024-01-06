import axios from "axios";
import { useEffect, useState } from "react";

function List({ movie }) {
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editedReview, setEditedReview] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getMovie")
      .then((res) => {
        setList(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    // console.log(btnClick);
    setList((list) => {
      return [
        ...list,
        {
          movie_name: movie.movie_name,
          movie_review: movie.movie_review,
        },
      ];
    });
  }, [movie]);

  function handleDelete(id) {
    console.log(id);

    axios
      .delete("http://localhost:8000/api/deleteMovie", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        const newList = list.filter((data) => data.id !== id);
        setList(newList);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function handleEdit(id) {
    console.log(id);
    setToggle(!toggle);
  }
  function SubmitUpdatedMovie(id) {
    console.log("clicked");
    console.log(id);
    console.log(editedReview);
    axios
      .put("http://localhost:8000/api/updateMovie", {
        id: id,
        review: editedReview,
      })
      .then((res) => {
        console.log(id);
        const newList = list.map((data) => {
          console.log(data.id);
          if (data.id === id) {
            return { ...data, movie_review: editedReview };
          } else {
            return { ...data };
          }
        });
        setList(newList);
        console.log(list);
      })
      .catch((err) => console.log(err));
  }
  console.log(list);

  return (
    <div className=" flex flex-col items-center mt-8 gap-4">
      {list?.map((data, index) => {
        return (
          <div
            className=" relative flex  flex-col border-2  drop-shadow-lg shadow-md  shadow-pink-600 rounded-full border-pink-600 w-2/3 p-4 items-center justify-center gap-2"
            key={index}
          >
            <h2 className=" text-2xl font-semibold text-pink-600">
              {data.movie_name}
            </h2>
            <p className=" text-sm font-light text-slate-200">
              {data.movie_review}
            </p>
            <button
              onClick={() => handleDelete(data.id)}
              className=" text-slate-200 bg-pink-800 p-2 rounded-full absolute top-[50%] translate-y-[-50%] right-4"
            >
              Del
            </button>
            <button
              onClick={() => handleEdit(data.id)}
              className=" text-pink-800 bg-slate-200 p-2 rounded-full absolute top-[50%] translate-y-[-50%] left-4"
            >
              Update
            </button>

            {toggle ? (
              <>
                {" "}
                <input
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className=" h-28 rounded-lg outline-none text-black text-sm"
                />
                <button
                  onClick={() => SubmitUpdatedMovie(data.id)}
                  className=" text-sm bg-green-800 p-1 rounded-md"
                >
                  Submit
                </button>{" "}
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default List;
