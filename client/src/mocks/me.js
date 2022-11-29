import { rest } from "msw";

import db from "./db";

export const meRouterHandler = [
  rest.get("/api/me", (req, res, ctx) => {
    const user = db.users.findFirst();

    return res(ctx.status(200), ctx.json(user));
  }),
  rest.post("/api/me/update", async (req, res, ctx) => {
    // I need to handle user token but not worked :(
    const user = db.users.findFirst({});
    const body = await req.json();
    // db.users.update({ id: user.id }, body);

    return res(ctx.status(200), ctx.json({}));
  }),
];
