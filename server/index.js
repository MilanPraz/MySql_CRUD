const express = require("express");
const app = express();
const sql = require("mysql2");
const cors = require("cors");

app.use(express.json());
app.use(cors());
const DB = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password54@#$",
  database: "crud_db",
});

app.get("/", (req, res) => {
  // let sqlQuery = `INSERT INTO movie_reviews (movie_name,movie_review) VALUES ('inception','good MOvie');`;
  // DB.query(sqlQuery, (err, result) => {
  //   console.log(err);
  //   console.log(result);
  //   res.send("helllo");
  // });

  console.log("sasas");
});

app.post("/api/insert", (req, res) => {
  const movie_name = req.body.movie_name;
  const movie_review = req.body.movie_review;
  let sqlQuery = `INSERT INTO movie_reviews (movie_name,movie_review) VALUES (?,?);`;
  console.log("yyeta xu");
  DB.query(sqlQuery, [movie_name, movie_review], (err, result) => {
    console.log(err);
    console.log(result);
  });
  // console.log(movie_name);

  return res.send("ok");
});

app.get("/api/getMovie", (req, res) => {
  let sqlQuery = `SELECT * FROM movie_reviews`;

  DB.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//for deleting a tuple from the table
app.delete("/api/deleteMovie", (req, res) => {
  console.log(req.query.id);
  const movieid = req.query.id;
  let sqlQuery = `DELETE FROM movie_reviews WHERE id = ?`;

  DB.query(sqlQuery, movieid, (err, result) => {
    res.send("deleted");
    console.log(result);
  });
});

//for updting a data of a tuple
app.put("/api/updateMovie", (req, res) => {
  console.log("hwllo");
  const movieid = req.body.id;
  const review = req.body.review;

  const sqlQuery = `UPDATE movie_reviews SET movie_review = ? WHERE id=?`;

  DB.query(sqlQuery, [review, movieid], (err, result) => {
    console.log(err);
  });
});

app.listen(8000, () => {
  console.log("Listening to port 8000");
});
