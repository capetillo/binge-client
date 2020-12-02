import React, { useEffect, useState, useRef} from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./SwipeRight.css";
import { csv } from "d3"
import data from "../data.csv"
var axios = require("axios");


export default function SwipeRight() {
  const [watchlist, addMovie] = useState([]);
  const [movie, showMovieTitle] = useState([]);
  const [poster, showPoster] = useState("");
  const [title, apiTitle] = useState([])
  const history = useHistory();


  useEffect(() => {
    displayMovie();
  }, [])



function getTitle() {
    csv(data)
    .then(response => {
      let random = response[Math.floor(Math.random() * 6235)].title
      console.log("random", random)
      // movie.push(random)
      console.log("movie ,", movie)
      let search_entry = random.split(" ").join("+")
      console.log("search entry", search_entry)
      title.push(search_entry)
      console.log("title", title)
      console.log("title - 1 ", title[title.length-1])
    })
  }
  
  function displayMovie() {
    getTitle();
    axios({
      "method": "GET",
      "url": `http://www.omdbapi.com/?t=${title[title.length-1]}&apikey=${apikey}`
    })
      .then((response) => {
        console.log("response on display movie", response.data)
        showMovieTitle(response.data.Title)
        showPoster(response.data.Poster)
        console.log("Poster collection ", poster)
    })
    .catch((err) => {
      console.log(err, "error")
    })
  }


  function handleSubmit(event) {
    console.log(event, "event")
    event.target.id === 'yes' ? addMovie(watchlist => [...watchlist, movie]) && createMovie({ watchlist }) && console.log("this is watchlist", watchlist): console.log("nothing to show here") && displayMovie()
      console.log("watchlist", watchlist)
      history.push("/swipe/new");
      displayMovie();
    }
  
  function createMovie(movie) {
    console.log("2")
    console.log("this is create movie")
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
          id="yes"
          onClick={handleSubmit}
          block
          type="submit"
          size="md"
          variant="primary"

        >
          love it
        </LoaderButton>
        <LoaderButton
          id="no"
          onClick={handleSubmit} 
          block
          type="submit"
          size="md"
          variant="danger"

        >
          no thx
        </LoaderButton>

      </div>
    </div>
  );
}