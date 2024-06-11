import React from "react";
import type { Preview } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { ThemeProvider, theme } from "@/theme";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const providersDecorator = (Story, context) => {
  const { themeMode } = context.globals;

  return (
    <IntlProvider locale="en">
      <ThemeProvider theme={{ ...theme, mode: themeMode }}>
        <MemoryRouter>
          <Routes>
            <Route path="/*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </IntlProvider>
  );
};

export const decorators = [providersDecorator];

export default preview;
