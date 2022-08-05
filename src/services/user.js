import { request } from "../configs/axios";

const loginApi = (data) => {
  return request({
    data,
    url: "/QuanLyNguoiDung/DangNhap",
    method: "POST",
  });
};
export { loginApi };
