import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { FaHandPointUp } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const movies = await loadMovies();
        setMovies(movies);
        console.log("movies baby movies", movies)
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadMovies() {
    return API.get("swipe", "/swipe");
    
  }

  function renderMoviesList(movies) {
    return (
      <>
        <LinkContainer to="/swipe/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <FaHandPointUp size={17} />
            <span className="ml-2 font-weight-bold">swipe on movies</span>
          </ListGroup.Item>
        </LinkContainer>
        {movies.map(({ swipeId, createdAt, content, poster }) => (
          <LinkContainer key={swipeId} to={`/swipe/${swipeId}`}>
            <ListGroup.Item action>
            <span className="font-weight-bold">
                this is movies: {content.trim().split('"')}
              </span>
              <img src={poster} alt="poster" />
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
        <p className="text-muted">Binge: where you swipe to match on movies I guess</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderMovies() {
    return (
      <div className="movies">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Watchlist</h2>
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
