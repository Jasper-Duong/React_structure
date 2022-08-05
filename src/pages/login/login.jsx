import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_INFO_KEY } from "../../constants/common";
import { loginApi } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/user";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginApi(state);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(result.data.content));
    // console.log(result);
    dispatch(setUserInfoAction(result.data.content));
    navigate("/");
  };
  return (
    <form ref={formRef} className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tài Khoản</label>
        <input
          type="text"
          onChange={handleChange}
          name="taiKhoan"
          className="form-control"
          placeholder="Tài Khoản"
        />
      </div>
      <div className="form-group">
        <label>Mật Khẩu</label>
        <input
          type="text"
          onChange={handleChange}
          name="matKhau"
          className="form-control"
          placeholder="Mật Khẩu"
        />
      </div>
      <button className="btn btn-success w-100">LOGIN</button>
    </form>
  );
}
