import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { Button } from "./Button";

export default {
  title: "UI Components/<Button>",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  mode: "primary",
  children: "Submit",
};

export const Secondary = Template.bind({});
Secondary.args = {
  mode: "secondary",
  children: "Submit",
};

export const Transparent = Template.bind({});
Transparent.args = {
  mode: "transparent",
  children: "Submit",
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: "Submit",
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  size: "small",
  children: "Submit",
};

export const SizeMedium = Template.bind({});
SizeMedium.args = {
  size: "medium",
  children: "Submit",
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: "large",
  children: "Submit",
};
