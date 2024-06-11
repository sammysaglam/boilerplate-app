import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import styled from "styled-components";

import { HomePage } from "@/features/HomePage/HomePage";
import { IntlProvider } from "@/features/IntlProvider/IntlProvider";
import { GlobalStyles, ThemeProvider } from "@/theme";

const queryClient = new QueryClient();

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  z-index: 1;
`;

const AppShell = () => (
  <StyledWrapper>
    <Outlet />
  </StyledWrapper>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppShell />} path="/">
      <Route element={<HomePage />} index />
    </Route>,
  ),
);
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <IntlProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Toaster containerClassName="toast-notifications" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </IntlProvider>
  </QueryClientProvider>
);
