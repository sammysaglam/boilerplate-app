import { booleanFilter } from "./booleanFilter";

const testCases = [
  {
    label: "false",
    value: false,
    expected: false,
  },
  {
    label: "null",
    value: null,
    expected: false,
  },
  {
    label: "undefined",
    value: undefined,
    expected: false,
  },
  {
    label: "empty string",
    value: "",
    expected: false,
  },
  {
    label: "number zero",
    value: 0,
    expected: false,
  },
  {
    label: "true",
    value: true,
    expected: true,
  },
  {
    label: "object",
    value: { a: "" },
    expected: true,
  },
  {
    label: "array",
    value: ["", undefined, 0],
    expected: true,
  },
  {
    label: "empty object",
    value: {},
    expected: true,
  },
  {
    label: "empty array",
    value: [],
    expected: true,
  },
  {
    label: "non-empty string",
    value: "0",
    expected: true,
  },
  {
    label: "non-zero number",
    value: 2513,
    expected: true,
  },
];

describe("booleanFilter", () => {
  test.each(testCases)(
    "Should return $expected for $label",
    ({ value, expected }) => {
      expect(booleanFilter(value)).toBe(expected);
    },
  );
});
