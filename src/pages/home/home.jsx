import React from "react";
import Carousel from "../../modules/carousel/carousel";
import MovieList from "../../modules/movie-list/movie-list";
// import "./index.scss";

function Home() {
  return (
    <div className="py-5">
      <Carousel/>
      <MovieList />
    </div>
  );
}

export default Home;
