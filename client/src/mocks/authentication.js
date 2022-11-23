import { rest } from "msw";

import db from "./db";

export const authenticationHandler = [
  rest.post("/login", (req, res, ctx) => {
    const user =
      db.users.findMany({
        email: req.body.email,
        password: req.body.password,
      })[0] || null;

    return res(ctx.status(200), ctx.json(user));
  }),
  rest.post("/register", (req, res, ctx) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };
    let response = db.users.create(user);
    return res(ctx.status(200), ctx.json(response));
  }),
];
