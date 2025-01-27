import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/* Run cleanup after each test case */
afterEach(() => {
  cleanup();
});
