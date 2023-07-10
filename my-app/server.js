const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "testPass",
  database: "movie_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

app.post("/movies", (req, res) => {
  const title = req.body.title;
  const director = req.body.director;
  const genre = req.body.genre;

  db.query(
    `SELECT MOVIEFINAL.title, CAST_DETAIL8.director, MOVIEFINAL.genre FROM MOVIEFINAL
    INNER JOIN CAST_RELATION4 ON MOVIEFINAL.imdb_id = CAST_RELATION4.imdb_id
    INNER JOIN CAST_DETAIL8 ON CAST_RELATION4.cast_ID = CAST_DETAIL8.cast_ID
    WHERE MOVIEFINAL.title LIKE '%${title}%' AND CAST_DETAIL8.director LIKE '%${director}%' AND MOVIEFINAL.genre LIKE '%${genre}%'`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "No movie found" });
      }
    }
  );
});

app.post("/query", (req, res) => {
  const queryNumber = req.body.query;
  const director = req.body.director;
  const genre = req.body.genre;
  const language = req.body.language;
  const awards = req.body.awards;
  const year = req.body.year;

  switch (queryNumber) {
    case 1:
      sqlQuery = `
      SELECT MOVIEFINAL.title, CRITIC_DETAIL2.imdbRating, MOVIEFINAL.imdb_id
      FROM MOVIEFINAL
      INNER JOIN CRITIC_RELATION3 ON MOVIEFINAL.imdb_id = CRITIC_RELATION3.imdb_id
      INNER JOIN CRITIC_DETAIL2 ON CRITIC_RELATION3.critic_ID = CRITIC_DETAIL2.critic_ID
      LEFT JOIN (
        SELECT CAST_RELATION4.imdb_id
        FROM CAST_RELATION4
        INNER JOIN CAST_DETAIL8 ON CAST_RELATION4.cast_ID = CAST_DETAIL8.cast_ID
        WHERE CAST_DETAIL8.director = '${director}'
      ) AS DirMovies ON MOVIEFINAL.imdb_id = DirMovies.imdb_id
      WHERE DirMovies.imdb_id IS NULL
      ORDER BY CRITIC_DETAIL2.imdbRating DESC`;
      break;
    case 2:
      sqlQuery = `
      SELECT MOVIEFINAL.title, MOVIEFINAL.genre, LANGUAGE_FINAL15.language 
      FROM MOVIEFINAL 
      INNER JOIN LANGUAGE_FINAL15 ON MOVIEFINAL.imdb_id = LANGUAGE_FINAL15.imdb_ID 
      LEFT JOIN (
          SELECT CAST_RELATION4.imdb_id
          FROM CAST_RELATION4 
          INNER JOIN CAST_DETAIL8 ON CAST_RELATION4.cast_ID = CAST_DETAIL8.cast_ID
          WHERE CAST_DETAIL8.director != ''
      ) as SUBQUERY ON MOVIEFINAL.imdb_id = SUBQUERY.imdb_id
      WHERE MOVIEFINAL.genre = '${genre}' 
      AND LANGUAGE_FINAL15.language = '${language}'
      AND SUBQUERY.imdb_id IS NULL`;

      break;
    case 3:
      sqlQuery = `
      SELECT MOVIEFINAL.title, MOVIEFINAL.awards 
      FROM MOVIEFINAL 
      INNER JOIN LANGUAGE_FINAL15 ON MOVIEFINAL.imdb_id = LANGUAGE_FINAL15.imdb_ID
      LEFT JOIN (
          SELECT CAST_RELATION4.imdb_id
          FROM CAST_RELATION4
          INNER JOIN CAST_DETAIL8 ON CAST_RELATION4.cast_ID = CAST_DETAIL8.cast_ID
          WHERE CAST_DETAIL8.director = '${director}'
      ) AS SUBQUERY ON MOVIEFINAL.imdb_id = SUBQUERY.imdb_id
      WHERE MOVIEFINAL.awards LIKE '%${awards}%' 
      AND LANGUAGE_FINAL15.language = '${language}' 
      AND SUBQUERY.imdb_id IS NULL`;

      break;
    case 4:
      sqlQuery = `
      SELECT MOVIEFINAL.title, MOVIEFINAL.year, CRITIC_DETAIL2.imdbRating, CRITIC_DETAIL2.imdbVotes 
      FROM MOVIEFINAL 
      INNER JOIN CRITIC_RELATION3 ON MOVIEFINAL.imdb_id = CRITIC_RELATION3.imdb_id 
      INNER JOIN CRITIC_DETAIL2 ON CRITIC_RELATION3.critic_ID = CRITIC_DETAIL2.critic_ID 
      LEFT JOIN (
          SELECT CAST_RELATION4.imdb_id
          FROM CAST_RELATION4
          INNER JOIN CAST_DETAIL8 ON CAST_RELATION4.cast_ID = CAST_DETAIL8.cast_ID
          WHERE CAST_DETAIL8.director = '${director}'
      ) AS SUBQUERY ON MOVIEFINAL.imdb_id = SUBQUERY.imdb_id
      WHERE MOVIEFINAL.year = '${year}' 
      AND SUBQUERY.imdb_id IS NULL`;

      break;
    case 5:
      sqlQuery = `
      SELECT MOVIEFINAL.title, CAST_DETAIL8.director, STORY_DETAIL4.plot
      FROM MOVIEFINAL
      INNER JOIN CAST_RELATION4 ON MOVIEFINAL.imdb_id = CAST_RELATION4.imdb_id
      INNER JOIN CAST_DETAIL8 ON CAST_RELATION4.cast_ID = CAST_DETAIL8.cast_ID
      INNER JOIN STORY_RELATION3 ON MOVIEFINAL.imdb_id = STORY_RELATION3.imdb_id
      INNER JOIN STORY_DETAIL4 ON STORY_RELATION3.story_ID = STORY_DETAIL4.story_ID
      LEFT JOIN LANGUAGE_FINAL15 ON MOVIEFINAL.imdb_id = LANGUAGE_FINAL15.imdb_ID 
      WHERE MOVIEFINAL.genre = '${genre}'
      AND LANGUAGE_FINAL15.language != '${language}'`;

      break;
    default:
      res.send({ message: "Invalid query number" });
      return;
  }

  db.query(sqlQuery, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send([]);
    }
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
