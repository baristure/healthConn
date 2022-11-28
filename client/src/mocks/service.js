import { rest } from "msw";
import { faker } from "@faker-js/faker";

export const getServices = [
  rest.get("/services", (req, res, ctx) => {
    const data = [
      {
        service_id: faker.random.numeric(5),
        name: "Radiology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Psychology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Pathology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Oral and Dental Health",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Sports Medicine",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Hematology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Gastroenterology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Endocrinology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Dermatology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Cardiology",
      },
      {
        service_id: faker.random.numeric(5),
        name: "Anesthesiology",
      },
    ];
    return res(ctx.status(200), ctx.json(data));
  }),
];
