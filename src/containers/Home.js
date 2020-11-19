import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [movie, setMovie] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const movies = await loadMovies();
        setMovies(Movies);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadMovies() {
    return API.get("movies", "/movies");
  }

  function renderMoviesList(movies) {
    return (
      <>
        <LinkContainer to="/movies/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new movie</span>
          </ListGroup.Item>
        </LinkContainer>
        {movies.map(({ movieId, content, createdAt }) => (
          <LinkContainer key={movieId} to={`/movies/${movieId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
    );
  }

  function renderMovies() {
    return (
      <div className="movies">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
        <ListGroup>{!isLoading && renderMoviesList(movies)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderMovies() : renderLander()}
    </div>
  );
}