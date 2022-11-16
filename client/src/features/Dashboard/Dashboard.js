import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";

import Card from "../common/Elements/Card/Card";
import Button from "../common/Elements/Button/Button";
import Loading from "../common/Elements/Loading/Loading";
import Checkbox from "../common/Elements/Checkbox/Checkbox";
import { SelectBox, Input, Datepicker } from "../common/Elements";

export const Dashboard = () => {
  const showToast = (type, msg) => {
    console.log("girdi");
    if (type === "error") {
      toast.error(msg);
    } else if (type === "success") {
      toast.success(msg);
    } else {
      toast.info(msg);
    }
  };

  return (
    <>
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 flex flex-row flex-wrap items-center justify-between sm:px-6 lg:px-8">
          <span className="text-2xl font-medium leading-6 text-contrast-90 sm:truncate ">
            Welcome {faker.name.fullName()}
          </span>
        </div>
        {/* 1/3 Cards */}
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-4 mt-3">
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
          </div>
        </div>
        {/* 2/3 1/3 row */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3 mt-6 sm:px-6 lg:px-8 px-4">
          <div className="relative rounded-md col-span-2 bg-white px-6 py-5 shadow-md flex items-center">
            <div className="col-span-2 w-full">
              <div className="flex flex-col">
                <div className="text-lg font-medium text-contrast-90">
                  {faker.random.word()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex shadow-md rounded-md bg-white items-center justify-center w-full">
            <div className="font-bold">
              <Loading />
            </div>
          </div>
        </div>
        {/* Full row */}
        <div className=" mt-6 sm:px-6 lg:px-8 px-4">
          <div className="relative rounded-md  bg-white px-6 py-5 shadow-md flex items-center">
            <div className=" w-full">
              <div className="flex flex-col">
                <div className="text-lg font-medium text-contrast-90">
                  <div className="mb-2">
                    <Button
                      type="submit"
                      color="primary"
                      hover="primary"
                      className="mr-3"
                      size="md"
                    >
                      Primary
                    </Button>
                    <Button
                      type="button"
                      color="gray"
                      hover="gray"
                      size="md"
                      className="mr-3"
                      callback={() => console.log("Hello World")}
                    >
                      Secondary
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      type="submit"
                      color="success"
                      hover="success"
                      size="md"
                      className="mr-3"
                      callback={() => showToast("success", "Success message")}
                    >
                      Success Toast
                    </Button>
                    <Button
                      type="button"
                      color="error"
                      hover="error"
                      size="md"
                      className="mr-3"
                      callback={() => showToast("error", "error message")}
                    >
                      Error Toast
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      hover="primary"
                      size="md"
                      className="mr-3"
                      callback={() => showToast("info", "info message")}
                    >
                      Information Toast
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      type="submit"
                      color="primary"
                      hover="primary"
                      size="lg"
                      loading={true}
                    >
                      Primary
                    </Button>
                  </div>
                  <div className="mb-5">
                    <Checkbox
                      label="Is Test?"
                      name="isTest"
                      type="checkbox"
                      onChange={() => console.log("hello checkbox")}
                      // value={true}
                    />
                  </div>
                  <div className="w-1/2 mb-5">
                    <Input
                      type="text"
                      name="textInput"
                      // isForm={true}
                      label="Username"
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>

                  <div className="w-1/2 mb-5">
                    <SelectBox
                      label={"Please select"}
                      options={[
                        {
                          value: 0,
                          label: "Option 1",
                        },
                        {
                          value: 1,
                          label: "Option 2",
                        },
                        {
                          value: 2,
                          label: "Option 3",
                        },
                      ]}
                      onChange={(val) => console.log(val)}
                      defaultValue={0}
                      value={0}
                    />
                  </div>
                  <div className="w-1/2 mb-5">
                    <Datepicker
                      label="Time Range"
                      name="dateRange"
                      type="range"
                      onChange={(val) => console.log(val)}
                    />
                    <Datepicker
                      label="Time Select"
                      name="dateSelect"
                      onChange={(val) => console.log(val)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-6 sm:px-6 lg:px-8 px-4 mb-4">
          {/* CARD */}
          <Card
            icon="FaLink"
            title="Card Component"
            description={faker.random.words(10)}
          >
            <div className="lg:space-y-0 space-y-2 lg:space-x-2 space-x-0 flex lg:flex-row flex-col items-center justify-center w-full">
              <Button size="md" color="gray" hover="gray" className="w-full">
                Button
              </Button>
              <Button
                size="md"
                color="primary"
                hover="primary"
                className="w-full"
              >
                Button
              </Button>
            </div>
          </Card>
        </div>
        <div className="w-1/2 mt-6 sm:px-6 lg:px-8 px-4 mb-4"></div>
      </main>
    </>
  );
};
