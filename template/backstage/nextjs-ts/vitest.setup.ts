import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from "./src/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
  console.log("Mock server started");
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
