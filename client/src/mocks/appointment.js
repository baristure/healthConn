import { rest } from "msw";
// import { faker } from "@faker-js/faker";
import db from "./db";

export const appointmentHandler = [
  rest.post("/appointment", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/api/appointment-rating/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const { rating } = await req.json(); // request body
    db.appointments.update({
      where: { id: { equals: +id } },
      data: { rating },
    });
    return res(ctx.status(200));
  }),
  rest.post("/api/appointment-doctor-note/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const { doctorNote } = await req.json(); // request body

    db.appointments.update({
      where: { id: { equals: +id } },
      data: { doctorNote },
    });
    return res(ctx.status(200));
  }),
  rest.get("/appointments-data", (req, res, ctx) => {
    const appointments = db.appointments.findMany({});
    return res(ctx.status(200), ctx.json(appointments));
  }),
  rest.get("/appointment-detail-data", (req, res, ctx) => {
    const id = req.url.searchParams.get("appointment");
    const appointment = db.appointments.findFirst({
      where: { id: { equals: +id } },
    })
    const data = {
      user: {
        first_name: "John",
        last_name: "Doe",
        gender: "Male",
        blood_type: "A+",
        birth_date: "21.03.1991",
        weight: 95,
        height: 1.9,
        story:
          "Nisi eiusmod est ut commodo aliqua non sunt ipsum consectetur voluptate laboris. Ea pariatur officia enim non in ex ad ipsum officia ipsum minim anim enim. Adipisicing labore sint Lorem adipisicing minim minim nulla id Lorem amet. Officia laboris sint ea elit dolore excepteur. Lorem magna et ea aliquip aliquip ut irure anim excepteur excepteur nisi eu amet. Officia culpa aute ullamco elit ullamco proident duis excepteur. Officia ipsum reprehenderit tempor aute exercitation.",
      },
      date: appointment.date,
      rating: appointment.rating,
      doctorNote: appointment.doctorNote,
      service: {
        name: "Cardiology",
      },
      doctor: {
        first_name: "Jane",
        last_name: "Doe",
        title: "Prof. Dr.",
        office_number: "12312345",
        location: "Floor 2, No:25",
      },
      complaints: [
        {
          part: "head",
          side: "front",
          severity: 6,
          comment:
            "Deserunt esse sint enim occaecat minim.\n Duis quis sint dolor veniam aute Lorem nisi consequat eu excepteur elit reprehenderit anim.",
        },
        {
          part: "right_hand",
          side: "back",
          severity: 2,
          comment:
            "Deserunt esse sint enim occaecat minim.\n Duis quis sint dolor veniam aute Lorem nisi consequat eu excepteur elit reprehenderit anim.",
        },
      ],
      recognization: "",
    };
    return res(ctx.status(200), ctx.json(data));
  }),
];
