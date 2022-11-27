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
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        date: new Date(),
      },
      {
        id: faker.random.numeric(5),
        service: faker.random.word(),
        doctor: "Prof. " + faker.random.words(2),
        date: new Date(),
      },
    ];

    return res(ctx.status(200), ctx.json(data));
  }),
];
