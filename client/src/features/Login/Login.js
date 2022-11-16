import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearState, loginWithCredentials } from "./loginSlice";
import { Loading } from "../common/Elements/index";
export const Login = () => {
  const dispatch = useDispatch();
  const { user, isFetching, isSuccess, isError } = useSelector(
    (state) => state.login
  );
  useEffect(() => {
    let params = {
      username: "user1",
      password: "12345678",
    };
    dispatch(loginWithCredentials(params));
  }, []);

  if (isFetching)
    return (
      <div>
        <Loading />
      </div>
    );
  return <div>Welcome {user.username}</div>;
};
