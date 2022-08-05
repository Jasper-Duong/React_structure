import { SET_USER_INFO } from "../types/user";

export const setUserInfoAction = (data) => ({
  type: SET_USER_INFO,
  payload: data
})