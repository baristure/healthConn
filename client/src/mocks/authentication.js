import { rest } from "msw";

import db from "./db";

export const authenticationHandler = [
  rest.post("/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImlhdCI6MTUxNjIzOTAyMiwiaWQiOiIxMjMxMjMiLCJsYXN0X25hbWUiOiJEb2UiLCJhZ2UiOjMyLCJ3ZWlnaHQiOjkwLCJoZWlnaHQiOjE4Nywic3ViIjoiMTIzNDU2Nzg5MCIsInVzZXJfdHlwZSI6InBhdGllbnQifQ.lo7LSt75KY-1Zo7RYru4vnQYJXVQp_pIAh0Kx7p72po"
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
