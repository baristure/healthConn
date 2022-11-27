import { rest } from "msw";

export const appointmentHandler = [
  rest.post("/appointment", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
