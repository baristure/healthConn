import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../Login/loginSlice";
export const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(clearState());
    navigate("/", { replace: true });
  }, [navigate, dispatch]);

  return null;
};
