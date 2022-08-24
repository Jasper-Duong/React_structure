// import axios from "axios";
import { GROUP_ID } from "constants/common";
import { request } from "../configs/axios";

export const fetchMovieListApi = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
    method: "GET",
  });
};
export const addMovieUploadImage = (data) => {
  return request({
    url: `/QuanLyPhim/ThemPhimUploadHinh`,
    method: "POST",
    data,
  });
};
export const updateMovieUploadImage = (data) => {
  return request({
    url: `/QuanLyPhim/CapNhatPhimUpload`,
    method: "POST",
    data,
  })
}
export const fetchMovieDetailApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};
