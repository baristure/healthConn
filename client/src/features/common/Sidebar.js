import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack, IoArrowForward, IoClose } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

import { changeOpen, changeSideBarOpen } from "../../store/slices/navbarSlice";
import Button from "./Elements/Button";
const navBarItems = [
  {
    icon: "/icons/home.svg",
    url: "/",
    text: "Home",
  },
  {
    icon: "/icons/reports.svg",
    url: "/second",
    text: "Second Page",
  },
];
export default function Sidebar({ isShowing }) {
  let activeStyle = {
    backgroundColor: "#E8EDF2",
  };

  // const [isEnlarge, setIsEnlarge] = useState(true);
  //used redux sidebar state
  const dispatch = useDispatch();
  const navbarState = useSelector((state) => state.navbar);
  const isEnlarge = navbarState.isOpen;
  const sideBarOpen = navbarState.sideBarOpen;
  return (
    <>
      <div className="min-h-screen bg-gray-200 sm:block hidden">
        <aside className="relative h-screen w-max	inline-flex flex-col justify-between items-center bg-white shadow p-6">
          <nav className="inline-flex flex-col ">
            <div className="relative" onClick={() => dispatch(changeOpen())}>
              <Button
                size="md"
                color="gray"
                hover="gray"
                className={`transform h-10 w-10 p-1 bg-white text-gray-600 rounded-r-lg mx-auto border border-solid border-gray-200 hover:border-gray-300 ${
                  isEnlarge ? "rounded-lg" : "rounded-full"
                }`}
              >
                {isEnlarge ? (
                  <IoArrowBack
                    className="block h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                ) : (
                  <IoArrowForward
                    className="block h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                )}
              </Button>
              {isEnlarge ? (
                <div className="font-bold mt-2 mb-2 px-2">Menu</div>
              ) : (
                <div className="font-bold mb-2 px-2">
                  <span></span>
                </div>
              )}
            </div>
            <div className="mt-5">
              {navBarItems.map((navItem, index) => {
                return (
                  <div key={index + "navitem"} className="relative">
                    <NavLink
                      to={navItem.url}
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                      className={[
                        `flex-row align-middle flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300  ${
                          isEnlarge ? "rounded-lg" : "rounded-full"
                        }`,
                      ]}
                    >
                      <img src={navItem.icon} alt={navItem.text} />
                      {isEnlarge && (
                        <>
                          <span
                            data-tooltip-target="tooltip-light"
                            data-tooltip-style="light"
                            className="ml-2"
                          >
                            {navItem.text}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </nav>
        </aside>
      </div>

      <div className="sm:hidden block">
        <Transition.Root show={sideBarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 sm:hidden"
            onClose={() => dispatch(changeSideBarOpen())}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => dispatch(changeSideBarOpen())}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <IoClose
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center justify-center p-2 bg-primary-navbar">
                    <img
                      className="text-white h-12 block w-auto"
                      src="/icons/logo.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    {navBarItems.map((navItem, index) => {
                      return (
                        <div key={index + "navitem"} className="relative">
                          <NavLink
                            to={navItem.url}
                            style={({ isActive }) =>
                              isActive ? activeStyle : undefined
                            }
                            className={[
                              `flex-row align-middle flex items-center text-sm py-4 px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300  ${
                                isEnlarge ? "rounded-lg" : "rounded-full"
                              }`,
                            ]}
                            onClick={() => dispatch(changeSideBarOpen())}
                          >
                            <img src={navItem.icon} alt={navItem.text} />

                            <>
                              <span
                                data-tooltip-target="tooltip-light"
                                data-tooltip-style="light"
                                className="ml-2"
                              >
                                {navItem.text}
                              </span>
                            </>
                          </NavLink>
                        </div>
                      );
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
