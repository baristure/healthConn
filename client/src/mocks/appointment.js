import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const appointmentHandler = [
  rest.post("/appointment", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/appointments-data", (req, res, ctx) => {
    const data = [
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        patient: faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        patient: faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        patient: faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        patient: faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        patient: faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        patient: faker.random.words(2),
        date: new Date(),
      },
    ];

    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get("/appointment-data/:id", (req, res, ctx) => {
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
      date: new Date(),
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
