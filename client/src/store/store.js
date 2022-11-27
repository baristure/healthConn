import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

import { navbarReducer } from "./slices/navbarSlice";
import { loadingReducer } from "./slices/loadingSlice";
import { loginReducer } from "../features/Login/loginSlice";
import { appointmentReducer } from "../features/Appointment/appointmentSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  navbar: navbarReducer,
  login: loginReducer,
  appointment: appointmentReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
