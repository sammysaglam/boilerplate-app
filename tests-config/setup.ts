import "../src/utils/loadEnvVars";
import "@testing-library/jest-dom";

import { mockServer } from "./mock-server";

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
