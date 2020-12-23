import React, { useEffect, useState, useRef} from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { onError } from "../libs/errorLib";
import "./SwipeRight.css";
import { csv } from "d3"
import data from "../data.csv"
var axios = require("axios");


export default function SwipeRight() {
  const [content, addMovie] = useState([]);
  const [movie, showMovieTitle] = useState([]);
  const [poster, showPoster] = useState("");
  const [title, apiTitle] = useState([])
  const history = useHistory();


  useEffect(() => {
    getTitle()
  }, [])



function getTitle() {
    csv(data)
    .then(response => {
      let random = response[Math.floor(Math.random() * 6235)].title
      console.log("this is random", random)
      let search_entry = random.split(" ").join("+")
      title.push(search_entry)
      displayMovie()
      return title
    })
  }
  
  async function displayMovie() {
    
    console.log("title on display movie", title)
      await axios({
      "method": "GET",
      "url": `http://www.omdbapi.com/?t=${title[title.length-1]}&apikey=db2195e`
    })
      .then((response) => {
        console.log("response on display movie", response.data)
        showMovieTitle(response.data.Title)
        showPoster(response.data.Poster)
    })
    .catch((err) => {
      console.log(err, "error")
    })
  }


  function handleSubmit(event) {
    console.log("this is event", event)
    event.preventDefault()
    console.log("movie on handle submit", movie)
    content.push({"title": movie})
    createMovie(content)
    history.push("/swipe/new");
      getTitle()
    }
  
  function createMovie(movie) {
    console.log("movie on create movie", movie)
    return API.post("swipe", "/swipe", {
    
      body: movie
      
    });
  }


  return (
    <div className="NewMovie">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={poster} alt="movie poster" />
        <Card.Body>
          <Card.Title value={content}>
            
            {movie}
            </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body>
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
        </Card.Body>
      </Card>
    </div>
  );
}