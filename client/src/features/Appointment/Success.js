import { Card, Button } from "../common/Elements";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "./appointmentSlice";
import { useEffect } from "react";
export const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearState());
  }, []);

  return (
    <div className="flex-1 w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex flex-col justify-center align-center min-h-screen pb-48">
        <Card
          icon="FaCheckCircle"
          title="Appointment created successfully"
          description={
            "Please be ready approximately 15 minutes before than the appointment."
          }
        >
          <div className="lg:space-y-0 space-y-2 lg:space-x-2 space-x-0 flex lg:flex-row flex-col items-center justify-center w-full mt-4">
            <Button size="md" color="gray" hover="gray" className="w-full">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </Button>
            <Button
              size="md"
              color="primary"
              hover="primary"
              className="w-full"
            >
              <NavLink to="/appointments">Appointments</NavLink>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
