import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { changeLoadingStatus } from "../store/slices/loadingSlice";

export const useLoading = (fetchingState) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(changeLoadingStatus(fetchingState));
  }, [fetchingState]);

  return isLoading;
};
