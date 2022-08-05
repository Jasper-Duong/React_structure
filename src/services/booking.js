import { request } from "../configs/axios";

const fetchRoomListApi = (maLichChieu) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
    method: "GET",
  });
};

const bookingApi = (data) => {
  return request({
    url: `/QuanLyDatVe/DatVe`,
    method: "POST",
    data,
  });
};

export { fetchRoomListApi, bookingApi };
