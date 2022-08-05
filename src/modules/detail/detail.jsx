import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../services/movie";

export default function Detail() {
  const [stateDetail, setStateDetail] = useState([]);
  const params = useParams();
  useEffect(() => {
    fetchMovieDetail(params.movieId);
  }, [ ]);
  const fetchMovieDetail = async (movieId) => {
    const result = await fetchMovieDetailApi(movieId);
    setStateDetail(result.data.content);
    // console.log(result);
  }
  return (
    <div className="row">
      <div className="col-3">
        <img
          className="w-100"
          src={stateDetail.hinhAnh}
          alt=""
        />
      </div>
      <div className="col-9">
        <h4>{stateDetail.tenPhim}</h4>
        <p>
          {stateDetail.moTa}
        </p>
        <p>{stateDetail.ngayKhoiChieu}</p>
        <div>
          <button className="btn btn-info mr-2">TRAILER</button>
        </div>
      </div>
    </div>
  );
}
