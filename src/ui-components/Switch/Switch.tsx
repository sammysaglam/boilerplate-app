import React from "react";
import styled, { DefaultTheme, useTheme } from "styled-components";

const StyledSwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 21px;
  height: 21px;
  border-radius: 45px;
  transition: 0.2s;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 50px;
  height: 27px;
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;
  border: solid 1px ${({ theme }) => theme.color("grey.dark")};
`;

const StyledInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked + ${StyledSwitchButton} {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

type Props = {
  readonly checked: boolean;
  readonly onChange: (newValue: boolean) => void;
  readonly icon?: {
    readonly off?: React.ReactNode;
    readonly on?: React.ReactNode;
  };
  readonly overrideColors?: {
    readonly offButton?: ReturnType<DefaultTheme["color"]>;
    readonly offBackground?: ReturnType<DefaultTheme["color"]>;

    readonly onButton?: ReturnType<DefaultTheme["color"]>;
    readonly onBackground?: ReturnType<DefaultTheme["color"]>;
  };
};

export const Switch = ({ checked, onChange, icon, overrideColors }: Props) => {
  const theme = useTheme();

  return (
    <StyledLabel
      style={{
        background: checked
          ? overrideColors?.onBackground ?? theme.color("green.light")
          : overrideColors?.offBackground ?? theme.color("grey.light"),
      }}
    >
      <StyledInput
        checked={checked}
        className="switch-checkbox"
        onChange={() => onChange(!checked)}
        type="checkbox"
      />

      <StyledSwitchButton
        style={{
          background: checked
            ? overrideColors?.onButton ?? theme.color("green")
            : overrideColors?.offButton ?? theme.color("white"),
        }}
      >
        {checked ? icon?.on : icon?.off}
      </StyledSwitchButton>
    </StyledLabel>
  );
};
