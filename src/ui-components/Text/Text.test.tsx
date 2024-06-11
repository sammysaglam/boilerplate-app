import { render, screen } from "@testing-library/react";
import React from "react";

import { T } from "@/ui/Text/Text";

describe("<T> text component", () => {
  it("renders an h1 tag", () => {
    render(<T h1>test text</T>);

    expect(
      screen.getByRole("heading", {
        name: "test text",
      }),
    ).toBeInTheDocument();
  });

  it("renders an h2 tag", () => {
    render(<T h2>test text</T>);

    expect(
      screen.getByRole("heading", {
        name: "test text",
      }),
    ).toBeInTheDocument();
  });

  it("renders an h3 tag", () => {
    render(<T h3>test text</T>);

    expect(
      screen.getByRole("heading", {
        name: "test text",
      }),
    ).toBeInTheDocument();
  });

  it("renders an h4 tag", () => {
    render(<T h4>test text</T>);

    expect(
      screen.getByRole("heading", {
        name: "test text",
      }),
    ).toBeInTheDocument();
  });

  it("renders an h5 tag", () => {
    render(<T h5>test text</T>);

    expect(
      screen.getByRole("heading", {
        name: "test text",
      }),
    ).toBeInTheDocument();
  });

  it("renders an h6 tag", () => {
    render(<T h6>test text</T>);

    expect(
      screen.getByRole("heading", {
        name: "test text",
      }),
    ).toBeInTheDocument();
  });
});
