/* This NavBar requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

import { TbGridDots } from "react-icons/tb";

import { useDispatch } from "react-redux";
import { changeSideBarOpen } from "../../store/slices/navbarSlice";
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const dispatch = useDispatch();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="w-full bg-primary-navbar pl-2 sm:pl-6 lg:pl-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center ">
                  <div className="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open menu</span>
                    <TbGridDots
                      className="hidden h-6 w-6 text-white "
                      aria-hidden="true"
                    />
                    <TbGridDots
                      className="sm:hidden h-6 w-6 text-white block"
                      aria-hidden="true"
                      onClick={() => dispatch(changeSideBarOpen())}
                    />
                  </div>
                  <img
                    className="text-white ml-2 h-12 block w-auto hidden sm:block "
                    src="/icons/logo.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4"></div>
                </div>
              </div>
              <div className="h-full absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 divide-x divide-contrast-80 text">
                <span className="h-full relative"></span>

                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="h-full flex flex-row justify-center items-center px-4 relative"
                >
                  <div className="flex flex-row justify-center items-center relative">
                    <Menu.Button className=" items-center  text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                      {/* <span className="sr-only">Open user menu</span> */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/images/avatar-2.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-4 mt-48 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="http://localhost:3000/"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="http://localhost:3000/"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/signout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
