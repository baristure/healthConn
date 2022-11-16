import { rest } from "msw";

import db from "./db";

export const authenticationHandler = [
  rest.post("/login", (req, res, ctx) => {
    const user =
      db.users.findMany({
        username: req.body.username,
        password: req.body.password,
      })[0] || null;

    return res(ctx.status(200), ctx.json(user));
  }),
];
