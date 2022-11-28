import React from "react";
import { Disclosure, Menu, Transition, Tab } from "@headlessui/react";

const Footer = ({ loggedIn }) => {
  return (
    !loggedIn && (
      <Disclosure as="nav" className="bg-transparent">
        {() => (
          <footer className="w-full bg-primary-navbar p-2 sm:pl-6 lg:pl-8 text-white">
            Orion Hackathon 2022
          </footer>
        )}
      </Disclosure>
    )
  );
};

export default Footer;
