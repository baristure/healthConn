import { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./common/NavBar";
import Sidebar from "./common/Sidebar";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
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
} from "./index";

const Mock = (props) => {
  console.log("mock props", props);
  return <h1>PRIVATE</h1>;
};

const AppRoutes = (loggedIn, setLoggedIn) => {
  return (
    <Routes>
      <Route exact path="/" element={<WelcomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/example" element={<ExamplePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-as-doctor" element={<DoctorLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/example" element={<ExamplePage />} />
      <Route
        path="/private"
        element={<ProtectedRoute component={Mock} loggedIn={loggedIn} />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route
        path="/appointments/:appointmentId"
        element={<AppointmentDetail />}
      />
    </Routes>
  );
};

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navbarState = useSelector((state) => state.navbar);
  const isOpen = navbarState.isOpen;
  //bg-contrast-5
  // const isAuth = true;
  return (
    <div className="m-0 p-0">
      <NavBar isOpen={isOpen} loggedIn={loggedIn} />
      <div className="flex">
        <aside className="self-start sticky top-0">
          <Sidebar isShowing={isOpen} />
        </aside>
        <main className="w-full overflow-y-auto">
          {AppRoutes(loggedIn, setLoggedIn)}
        </main>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}
export default Layout;
