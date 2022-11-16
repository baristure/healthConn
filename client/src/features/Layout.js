import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./common/NavBar";
import Sidebar from "./common/Sidebar";

import { Dashboard } from "./index";
import { Login } from "./Login/Login";
import { DocktorLogin } from "./DocktorLogin/DocktorLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-as-doctor" element={<DocktorLogin />} />
    </Routes>
  );
};
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-as-doctor" element={<DocktorLogin />} />
    </Routes>
  );
};

function Layout() {
  const navbarState = useSelector((state) => state.navbar);
  const isOpen = navbarState.isOpen;

  const isAuth = false;
  return (
    <div className="m-0 p-0 bg-contrast-5">
      {!isAuth ? (
        <>{PublicRoutes()}</>
      ) : (
        <>
          <NavBar isOpen={isOpen} />
          <div className="flex">
            <aside className="self-start sticky top-0">
              <Sidebar isShowing={isOpen} />
            </aside>
            <main className="w-full overflow-y-auto">{AppRoutes()}</main>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
export default Layout;
