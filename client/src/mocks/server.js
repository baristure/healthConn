// src/mocks/browser.js
import { setupWorker } from "msw";

import { authenticationHandler } from "./authentication";
import { appointmentHandler } from "./appointment";
import { getServices } from "./service";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...authenticationHandler,
  ...appointmentHandler,
  ...getServices
);
