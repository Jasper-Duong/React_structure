import { request } from "../configs/axios";

export const fetchShowTimeApi = (movieId) => {
  return request({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};