import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// @testing-library/react normally registers this automatically via a global
// afterEach, but this project runs with `globals: false`, so it must be
// wired up explicitly to avoid DOM leaking between tests in the same file.
afterEach(() => {
  cleanup();
});
