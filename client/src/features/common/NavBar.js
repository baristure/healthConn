/* This NavBar requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition, Tab } from "@headlessui/react";

import { TbGridDots } from "react-icons/tb";

import { useDispatch } from "react-redux";
import { changeSideBarOpen } from "../../store/slices/navbarSlice";
import { NavLink } from "react-router-dom";
import Button from "../common/Elements/Button/Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ isOpen, loggedIn }) {
  const dispatch = useDispatch();
  // hover:border-b-blue-800
  return (
    // divide-contrast-80 divide-x text
    <Disclosure as="nav" className="bg-transparent">
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
                <div className=" md:flex xs:w-80 xs:hidden sm:ml-6">
                  {loggedIn && (
                    <Tab.Group className="flex items-center justify-between w-full font-sans font-medium text-white tracking-wide antialiased">
                      <Tab.List>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          Home
                        </Tab>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          Product
                        </Tab>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          Pricing
                        </Tab>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          Contact
                        </Tab>
                      </Tab.List>
                    </Tab.Group>
                  )}
                  {/* </div> */}
                </div>
              </div>
              <div className="h-full absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text">
                <span className="h-full relative"></span>

                {/* Profile dropdown */}
                {loggedIn ? (
                  <Menu
                    as="div"
                    className="h-full flex flex-row justify-center items-center px-4 relative"
                  >
                    <div className="flex flex-row justify-center items-center relative">
                      <Menu.Button className="items-center  text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
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
                ) : (
                  <div className="mb-2">
                    <Button
                      type="button"
                      color="success-soft"
                      hover="gray"
                      size="md"
                      for="rounded"
                      className="mr-3"
                      callback={() => console.log("Hello World")}
                    >
                      Log in
                    </Button>
                    <Button
                      type="button"
                      color="success"
                      hover="gray"
                      size="lg"
                      className="mr-3"
                      callback={() => console.log("Hello World")}
                    >
                      Join us &rarr;
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
