import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./common/NavBar";
import Sidebar from "./common/Sidebar";

import { Dashboard, ExamplePage, Login } from "./index";
import { DoctorLogin } from "./Login/DoctorLogin";
import { Register } from "./Register/Register";
import { SignOut } from "./SignOut/SignOut";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/example" element={<ExamplePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-as-doctor" element={<DoctorLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signout" element={<SignOut />} />
    </Routes>
  );
};

function Layout() {
  const navbarState = useSelector((state) => state.navbar);
  const isOpen = navbarState.isOpen;
//bg-contrast-5
  const isAuth = false;
  return (
    <div className="m-0 p-0">
      <NavBar isOpen={isOpen} isAuth={isAuth} />
      {!isAuth ? (
        <div>Please login</div>
      ) : (
        <div className="flex">
          <aside className="self-start sticky top-0">
            <Sidebar isShowing={isOpen} />
          </aside>
          <main className="w-full overflow-y-auto">{AppRoutes()}</main>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
export default Layout;
