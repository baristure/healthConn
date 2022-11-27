import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export const useUserType = () => {
  // const { user } = useSelector((state) => state.login); // TODO refactor after the backend implementation

  // let userDetail = jwt_decode(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3RfbmFtZSI6IkpvaG4iLCJsYXN0X25hbWUiOiJEb2UiLCJpZCI6IjEyMzEyMyIsInVzZXJfdHlwZSI6InBhdGllbnQiLCJpYXQiOjE1MTYyMzkwMjJ9.qAc0sYAzSiQBiERGLwVuRRUEJbxoyIw8b-07FnGO6-I"
  // ); // patient
  let userDetail = jwt_decode(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3RfbmFtZSI6IkpvaG4iLCJsYXN0X25hbWUiOiJEb2UiLCJpZCI6IjEyMzEyMyIsInVzZXJfdHlwZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.4R-CbGZfMaP9f7U6_G5_dmwFTmdBdiZrrqdwEh7AWdg"
  ); // doctor

  return userDetail;
};
