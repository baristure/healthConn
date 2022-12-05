import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export const useAuth = () => {
  const { user } = useSelector((state) => state.login);
  if (user) {
    try {
      let userDetail = jwt_decode(user);
      return [true, userDetail, user];
    } catch (err) {
      return [false];
    }
  }
  return [false];
};
