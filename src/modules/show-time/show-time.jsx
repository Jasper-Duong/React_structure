import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchShowTimeApi } from "../../services/cinema";
import moment from "moment";

export default function ShowTime() {
  const params = useParams();
  const [showTime, setShowTime] = useState([]);
  useEffect(() => {
    fetchShowTime();
  }, []);
  const fetchShowTime = async () => {
    const result = await fetchShowTimeApi(params.movieId);
    // console.log("showTIme", result.data.content);
    setShowTime(result.data.content);
  };
  const renderContent = () => {
    return showTime?.heThongRapChieu?.map((ele, idx) => {
      return (
        <div
          key={ele.maHeThongRap}
          className={`tab-pane fade show ${idx === 0 && "active"}`}
          id={`${ele.maHeThongRap}`}
          role="tabpanel"
        >
          {ele.cumRapChieu.map((ele) => {
            return (
              <div key={ele.maCumRap} className="row mb-5">
                <div className="col-1">
                  <img className="img-fluid rounded" src={ele.hinhAnh} alt="" />
                </div>
                <div className="col-11 pl-0">
                  <h5>{ele.tenCumRap}</h5>
                  <span className="text-muted">{ele.diaChi}</span>
                </div>
                <div className="col-12">
                  <div className="row">
                    {ele.lichChieuPhim.map((ele) => {
                      return (
                        <div key={ele.maLichChieu} className="col-3">
                          <Link to={`/booking/${ele.maLichChieu}`}>
                            {moment(ele.ngayChieuGioChieu).format("LLL")}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };
  return (
    <div className="row">
      <div className="col-3">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {showTime?.heThongRapChieu?.map((ele, id) => {
            return (
              <a
                key={ele.maHeThongRap}
                className={`nav-link text-capitalize ${
                  id === 0 ? "active" : ""
                }`}
                data-toggle="pill"
                href={`#${ele.maHeThongRap}`}
                role="tab"
              >
                {ele.tenHeThongRap}
              </a>
            );
          })}
        </div>
      </div>
      <div className="col-9">
        <div className="tab-content" id="v-pills-tabContent">
          {renderContent()}
          <div className="tab-pane fade" id="bhd" role="tabpanel">
            ...
          </div>
        </div>
      </div>
    </div>
  );
}
