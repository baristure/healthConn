import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./common/NavBar";
import Sidebar from "./common/Sidebar";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import {
  Dashboard,
  ExamplePage,
  Login,
  DoctorLogin,
  Register,
  SignOut,
  Appointment,
  Appointments,
  AppointmentDetail,
  WelcomePage,
  Success,
  Profile,
  Settings,
  Service,
  DoctorList,
  DoctorInfo,
} from "./index";

const AppRoutes = (loggedIn, userDetail) => {
  const [doctor, setDoctor] = React.useState();
  return (
    <Routes>
      <Route exact path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-as-doctor" element={<DoctorLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signout" element={<SignOut />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute component={Dashboard} loggedIn={loggedIn} />}
      />
      <Route
        path="/example"
        element={<ProtectedRoute component={ExamplePage} loggedIn={loggedIn} />}
      />
      <Route
        path="/example"
        element={<ProtectedRoute component={ExamplePage} />}
      />
      <Route
        path="/appointment"
        element={<ProtectedRoute component={Appointment} doctor={doctor} />}
      />
      <Route
        path="/appointment/success"
        element={<ProtectedRoute component={Success} />}
      />

      <Route
        path="/appointments"
        element={<ProtectedRoute component={Appointments} />}
      />
      <Route
        path="/appointments/:appointmentId"
        element={<ProtectedRoute component={AppointmentDetail} />}
      />
      <Route
        path="/services"
        element={<ProtectedRoute component={Service} />}
      />
      <Route path="/services/:service" element={<DoctorList />} />
      <Route
        path="/services/:service/:doctor_id"
        element={<DoctorInfo setDoctor={setDoctor} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute component={Profile} user={userDetail} />}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute component={Settings} />}
      />
    </Routes>
  );
};

function Layout() {
  // const [loggedIn, userDetail] = useAuth();
  const [loggedIn, userDetail] = useState(true);
  const navbarState = useSelector((state) => state.navbar);
  const isOpen = navbarState.isOpen;
  return (
    <div className="m-0 p-0">
      <NavBar isOpen={isOpen} loggedIn={loggedIn} user={userDetail} />
      <div className="flex">
        <aside className="self-start sticky top-0">
          <Sidebar isShowing={isOpen} loggedIn={loggedIn} />
        </aside>
        <main
          className={`w-full overflow-y-auto ${loggedIn && "bg-contrast-5"}`}
        >
          {AppRoutes(loggedIn, userDetail)}
        </main>
      </div>

      <ToastContainer />
      <Footer loggedIn={loggedIn} />
    </div>
  );
}
export default Layout;
