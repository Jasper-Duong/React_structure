import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Seat from "../../modules/seat/seat";
import { bookingApi, fetchRoomListApi } from "../../services/booking";

export default function Booking() {
  const [roomList, setRoomList] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const fetchRoomList = async () => {
    const result = await fetchRoomListApi(params.maLichChieu);
    setRoomList(result.data.content);
  };
  useEffect(() => {
    fetchRoomList();
  }, []);
  const handleSelect = (selectedSeat) => {
    const result = [...selectedSeats];
    const idx = result.findIndex((ele) => ele.tenGhe === selectedSeat.tenGhe);
    if (idx !== -1) {
      result.splice(idx, 1);
    } else {
      result.push(selectedSeat);
    }
    setSelectedSeats([...result]);
  };
  const handleBooking = async () => {
    const seletedSeatsSubmit = selectedSeats.map((ele) => ({
      maGhe: ele.maGhe,
      giaVe: ele.giaVe,
    }));
    const submitData = {
      maLichChieu: roomList.thongTinPhim.maLichChieu,
      danhSachVe: seletedSeatsSubmit,
    };
    bookingApi(submitData);
  };
  console.log({ roomList });
  console.log({ selectedSeats });
  return roomList.danhSachGhe ? (
    <div className="px-5">
      <div className="row mx-auto my-5">
        <div className="col-9">
          {roomList.danhSachGhe.map((ele, idx) => (
            <span key={ele.tenGhe}>
              <Seat handleSelect={handleSelect} item={ele} />
              {(idx + 1) % 16 === 0 && <br />}
            </span>
          ))}
        </div>
        <div className="col-3">
          <img
            className="img-fluid"
            src={roomList.thongTinPhim.hinhAnh}
            alt=""
          />
          <h4>Phim: {roomList.thongTinPhim.tenPhim}</h4>
          <h5>Mô tả: {roomList.thongTinPhim.moTa}</h5>
          <p>
            Ghế:{" "}
            {selectedSeats.map((ele) => (
              <span key={ele.maGhe}>{ele.tenGhe}, </span>
            ))}
          </p>
          <p>
            Tổng tiền: {selectedSeats.reduce((pre, now) => pre + now.giaVe, 0)}{" "}
          </p>
          {selectedSeats.length > 0 && (
            <button className="btn btn-info" onClick={handleBooking}>
              ĐẶT VÉ
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    "Loaading..."
  );
}
