import React, { useEffect, useState, useRef} from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewMovie.css";
var axios = require("axios");


export default function NewMovie() {
  const [watchlist, addMovie] = useState([]);
  const [movie, showMovie] = useState("")
  const [poster, showPoster] = useState("")
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);


  //randomizes omdb id
  let number = Math.random();
  let num = number.toString();
  let fixedNum = num.split('.').join("");
  let length = 7;
  let trimmedString = fixedNum.substring(0, length);
  let letters = 'tt';
  let omdb_id = letters.concat(trimmedString)
  console.log(omdb_id, "id")

  //randomizes a movie first thing
  useEffect(() => {
    randomizeMovie()
  }, [])

  function randomizeMovie() {
    axios({
      "method": "GET",
      "url": `http://www.omdbapi.com/?i=${omdb_id}&apikey=${process.env.REACT_APP_API_KEY}`
    }).then((response) => {
      showMovie(response.data.Title, response.data.Poster)
      showPoster(response.data.Poster)
      addMovie(watchlist.concat(movie))
      console.log("watchlist", watchlist)
    
    })
    .catch((err) => {
      console.log(err, "error")
    })
  }
    

  async function handleSubmit(event) {
    event.preventDefault();
  
    // setIsLoading(true);
  
    try {


      await createMovie({ watchlist });
      history.push("/swipe/new");
      console.log("watchlist", watchlist)
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
    randomizeMovie();
    addMovie();

  }

  
  function createMovie(movie) {
    return API.post("swipe", "/swipe", {
      body: movie
    });
  }


  return (
    <div className="NewMovie">
      <div>
        <img src={poster} alt="poster"/>
        <p>{movie}</p>
        <LoaderButton
          onClick={handleSubmit}
          block
          type="submit"
          size="md"
          variant="primary"
          isLoading={isLoading}
          // disabled={!validateForm()}
        >
          love it
        </LoaderButton>
        <LoaderButton
          onClick={randomizeMovie} //on click randomize
          block
          type="submit"
          size="md"
          variant="danger"
          isLoading={isLoading}
          // disabled={!validateForm()}
        >
          no thx
        </LoaderButton>

      </div>
      {/* <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={watchlist}
            as="textarea"
            onChange={(e) => addMovie(response.data.Title)}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          love it
        </LoaderButton>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="danger"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          not a fan
        </LoaderButton>
      </Form> */}
    </div>
  );
}