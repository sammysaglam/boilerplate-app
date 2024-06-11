import { Meta } from "@storybook/react";
import React from "react";
import styled, { css } from "styled-components";

import { Flex } from "./Flex";

const ExampleElement = styled(Flex)<{ readonly tall?: boolean }>`
  background-color: red;
  height: 60px;
  min-width: 100px;

  ${({ tall }) =>
    tall &&
    css`
      height: 100px;
    `}
`;

export default {
  title: "UI Components/<Flex>",
  component: Flex,
} as Meta<typeof Flex>;

export const Grow = () => (
  <Flex gap={8}>
    <ExampleElement grow />
    <ExampleElement grow={2} />
    <ExampleElement grow />
  </Flex>
);

export const Alignment = () => (
  <Flex align="center" gap={8} justify="space-around">
    <ExampleElement tall />
    <ExampleElement />
    <ExampleElement />
  </Flex>
);

export const Wrap = () => (
  <Flex gap={32} wrap>
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
    <ExampleElement />
  </Flex>
);
