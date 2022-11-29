import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Elements/Button/Button";

export const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="md:flex md:flex-row w-full items-center p-5 xs:flex-col xs:justify-center">
      <div className="md:basis-1/4 basis-1/2">
        <h1 className="font-sans text-6xl font-bold tracking-wider text-blue-900 mb-4 ">
          A Great Place to Receive Care
        </h1>
        <p className="font-sans text-2xl font-medium tracking-normal text-gray-900 mb-6 ">
          We are always fully focused on helping you
        </p>
        <div className="mb-2">
          <Button
            type="submit"
            color="primary"
            hover="primary"
            className="mr-3"
            size="md"
            callback={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            type="button"
            color="success"
            hover="gray"
            size="lg"
            className="mr-3"
            callback={() => navigate("/register")}
          >
            Join us &rarr;
          </Button>
        </div>
      </div>
      <img
        className="basis-1/2 text-white xs:m-0 xs:h-72 sm:m-0 sm:h-96 xl:h-xl block w-auto sm:block"
        src="/images/greeting.jpg"
        alt="Workflow"
      />
    </div>
  );
};
 