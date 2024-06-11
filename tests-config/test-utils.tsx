import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@/theme";

import { IntlProvider } from "../src/features/IntlProvider/IntlProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => (
  <QueryClientProvider client={queryClient}>
    <IntlProvider>
      <ThemeProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </IntlProvider>
  </QueryClientProvider>
);

type Options = RenderOptions<
  typeof import("@testing-library/dom/types/queries"),
  HTMLElement,
  HTMLElement
>;

const customRender = (ui: JSX.Element, options?: Options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
