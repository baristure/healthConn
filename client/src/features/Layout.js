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
} from "./index";

const Mock = (props) => {
  console.log("mock props", props);
  return <h1>PRIVATE</h1>;
};

const AppRoutes = (loggedIn, setLoggedIn) => {
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
      <Route path="/private" element={<ProtectedRoute component={Mock} />} />
      <Route
        path="/appointment"
        element={<ProtectedRoute component={Appointment} />}
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
        path="/appointment-detail"
        element={<ProtectedRoute component={AppointmentDetail} />}
      />
    </Routes>
  );
};

function Layout() {
  const [loggedIn, userDetail] = useAuth();
  const navbarState = useSelector((state) => state.navbar);
  const isOpen = navbarState.isOpen;
  return (
    <div className="m-0 p-0">
      <NavBar isOpen={isOpen} loggedIn={loggedIn} user={userDetail} />
      <div className="flex">
        <aside className="self-start sticky top-0">
          <Sidebar isShowing={isOpen} loggedIn={loggedIn} />
        </aside>
        <main className="w-full overflow-y-auto">{AppRoutes()}</main>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
}
export default Layout;
