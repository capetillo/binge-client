import React, { useEffect, useState, useRef} from "react";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import "./SwipeLeft.css";
var axios = require("axios");


export default function SwipeLeft() {
  const [movie, showMovie] = useState("")
  const [poster, showPoster] = useState("")
  const history = useHistory();



function randomId() {
  let number = Math.random();
  let num = number.toString();
  let fixedNum = num.split('.').join("");
  let length = 7;
  let trimmedString = fixedNum.substring(0, length);
  let letters = 'tt';
  let theId = letters.concat(trimmedString)
  console.log(theId, "id")
  return theId
}

  let url = `http://www.omdbapi.com/?i=${randomId()}&apikey=db2195e`

  useEffect(() => {
    randomizeMovie()
  }, [])


  function randomizeMovie(event) {
    console.log("Event", event)
    axios({
      "method": "GET",
      "url": `${url}`
    })
      .then((response) => {
      showMovie(response.data.Title)
      showPoster(response.data.Poster)
      console.log("movie bb2", movie)
    })
    .catch((err) => {
      console.log(err, "error")
    })
  }


  function handleSubmit(event) {
      event.preventDefault()
      console.log("event", event)
      history.push("/swipe/new");
      randomizeMovie();
    }
  



  return (
    <div className="NewMovie">
      <div>
        <img src={poster} alt="poster"/>
        <p>{movie}</p>
        <LoaderButton
          onClick={handleSubmit} //on click randomize
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