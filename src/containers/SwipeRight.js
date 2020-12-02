import React, { useEffect, useState, useRef} from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
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
    getTitle()
  }, [])



function getTitle() {
  console.log("step 1")
    csv(data)
    .then(response => {
      let random = response[Math.floor(Math.random() * 6235)].title
      console.log("this is random", random)
      let search_entry = random.split(" ").join("+")
      title.push(search_entry)
      console.log("end of first part of get title ", title)
      displayMovie()
      return title
      
    })
  
  }
  
  async function displayMovie() {
    
    console.log("title on display movie", title)
   await axios({
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


  function handleSubmit() {
    console.log("this is handle submit and this is watchlist", watchlist)
   
      createMovie({ watchlist })

      history.push("/swipe/new");
      getTitle()
    }
  
  function createMovie(movie) {
    console.log("this is create movie")
    console.log("movie on create movie", movie)
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
          onClick={getTitle} 
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