import { rest } from "msw";

import db from "./db";

export const authenticationHandler = [
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3RfbmFtZSI6IkpvaG4iLCJsYXN0X25hbWUiOiJEb2UiLCJpZCI6IjEyMzEyMyIsInVzZXJfdHlwZSI6InBhdGllbnQiLCJpYXQiOjE1MTYyMzkwMjJ9.qAc0sYAzSiQBiERGLwVuRRUEJbxoyIw8b-07FnGO6-I"
      )
    );
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
