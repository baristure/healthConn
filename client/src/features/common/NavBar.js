/* This NavBar requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition, Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { TbGridDots } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { changeSideBarOpen } from "../../store/slices/navbarSlice";
import { NavLink } from "react-router-dom";
import Button from "../common/Elements/Button/Button";
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ isOpen, loggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleClick = (val) => {
    i18n.changeLanguage(val);
    localStorage.setItem("default-language", val);
  };
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
                    className="text-white ml-2 mr-2 h-12 block w-auto hidden sm:block "
                    src="/icons/logo-new.png"
                    alt="Workflow"
                  />
                </div>
                <div className="md:flex xs:w-80 xs:hidden sm:ml-6">
                  {!loggedIn && (
                    <Tab.Group className="flex items-center justify-between w-full font-sans font-medium text-white tracking-wide antialiased">
                      <Tab.List>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          <NavLink to="/">{t("home")}</NavLink>
                        </Tab>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          <NavLink to="/">{t("product")}</NavLink>
                        </Tab>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          <NavLink to="/">{t("pricing")}</NavLink>
                        </Tab>
                        <Tab className="outline-none border-none hover:text-blue-200">
                          <NavLink to="/">{t("contact")}</NavLink>
                        </Tab>
                      </Tab.List>
                    </Tab.Group>
                  )}
                  {/* </div> */}
                </div>
              </div>
              <div className="h-full absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 text">
                <span className="h-full relative"></span>
                <Menu
                  as="div"
                  className="h-full flex flex-row justify-center items-center px-4 relative"
                >
                  <div className="flex flex-row justify-center items-center relative">
                    <Menu.Button className="items-center  text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-white">
                      <div className="inline-flex items-center justify-center font-medium text-sm text-white border border-gray-100 rounded-md h-10 md:px-8 py-1 md:text-sm leading-5 text-2xs px-5">
                        {t(
                          i18n.language === "en"
                            ? "english"
                            : i18n.language === "tr"
                            ? "turkish"
                            : "russian"
                        )}
                      </div>
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
                        <div
                          className={`${
                            i18n.language === "en" ? "bg-gray-100" : ""
                          }block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:cursor-pointer`}
                          onClick={() => handleClick("en")}
                        >
                          {t("english")}
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={`${
                            i18n.language === "tr" ? "bg-gray-100" : ""
                          }block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:cursor-pointer`}
                          onClick={() => handleClick("tr")}
                        >
                          {t("turkish")}
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={`${
                            i18n.language === "ru" ? "bg-gray-100" : ""
                          }block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100 hover:cursor-pointer`}
                          onClick={() => handleClick("ru")}
                        >
                          {t("russian")}
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
                            <NavLink
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {t("your.profile")}
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {t("settings")}
                            </NavLink>
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
                              {t("sign.out")}
                            </NavLink>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="">
                    <Button
                      type="button"
                      color="success"
                      hover="gray"
                      size="md"
                      for="rounded"
                      className="mr-3"
                      callback={() => navigate("/login")}
                    >
                      Log in
                    </Button>
                    <Button
                      type="button"
                      color="gray"
                      hover="gray"
                      size="md"
                      className="mr-3"
                      callback={() => navigate("/register")}
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
