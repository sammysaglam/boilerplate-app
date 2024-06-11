import { act, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";

import { Filters } from "@/features/Filters/Filters";
import { render } from "@/test-utils";

describe("<Filters>", () => {
  describe("color selection", () => {
    it("is not selected by default", async () => {
      render(<Filters />);

      expect(screen.getByRole("combobox", { name: "color" })).toHaveValue("");
    });

    it("sets the correct color", async () => {
      render(<Filters />);

      await act(async () => {
        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: "color" }),
          screen.getByRole("option", { name: "Purple" }),
        );
      });

      expect(screen.getByRole("combobox", { name: "color" })).toHaveValue(
        "purple",
      );
    });
  });

  describe("sort selection", () => {
    it('has "relevant" selected by default', async () => {
      render(<Filters />);

      expect(screen.getByRole("combobox", { name: "sort" })).toHaveValue(
        "relevant",
      );
    });

    it("sets the correct color", async () => {
      render(<Filters />);

      await act(async () => {
        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: "sort" }),
          screen.getByRole("option", { name: "Editorial" }),
        );
      });

      expect(screen.getByRole("combobox", { name: "sort" })).toHaveValue(
        "editorial",
      );
    });
  });
});
