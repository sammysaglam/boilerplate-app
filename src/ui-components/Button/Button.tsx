import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

import { IconLoading } from "@/icons";
import { Flex } from "@/ui/Flex/Flex";

type StyledProps = {
  readonly disabled?: Props["disabled"];
  readonly $size?: Props["size"];
  readonly $loading?: Props["loading"];
  readonly $mode?: Props["mode"];
};

const StyledWrapper = styled.button<StyledProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }

  ${({ $mode, theme }) => {
    switch ($mode) {
      case "transparent":
        return css`
          background-color: transparent;
          border: none;
        `;

      case "primary":
        return css`
          color: ${theme.color("white")};
          background-color: ${theme.color("blue")};
          border: none;
          border-radius: 40px;
        `;

      default:
      case "secondary":
        return css`
          color: ${theme.color("black", "white")};
          background-color: ${theme.color("white", "black")};
          border: 1px solid ${theme.color("grey.very-dark")};
          border-radius: 40px;
        `;
    }
  }};

  ${({ $size }) => {
    switch ($size) {
      case "large":
        return css`
          min-height: 48px;
          padding: 4px 16px;
          font-size: 14px;
        `;

      default:
      case "medium":
        return css`
          min-height: 40px;
          padding: 4px 16px;
          font-size: 14px;
        `;

      case "small":
        return css`
          min-height: 31px;
          padding: 4px 16px;
          font-size: 12px;
        `;
    }
  }};
`;

const StyledLoadingWrapper = styled(Flex)<StyledProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  svg {
    stroke: ${({ theme }) => theme.color("black", "white")};
  }

  ${({ $size }) => {
    switch ($size) {
      case "large":
        return css`
          svg {
            width: 26px;
            height: 26px;
          }
        `;

      default:
      case "medium":
        return css`
          svg {
            width: 20px;
            height: 20px;
          }
        `;

      case "small":
        return css`
          svg {
            width: 16px;
            height: 16px;
          }
        `;
    }
  }}
`;

type Props = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly size?: "small" | "medium" | "large";
  readonly mode?: "primary" | "secondary" | "transparent";
  readonly href?: string;
  readonly type?: "button" | "submit";
  readonly loading?: boolean;
  readonly disabled?: boolean;

  readonly onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  >;
};

export const Button = ({
  href,
  className,
  size = "medium",
  type = "button",
  mode = "secondary",
  onClick,
  children,
  disabled,
  loading = false,
}: Props) => (
  <StyledWrapper
    $loading={loading}
    $mode={mode}
    $size={size}
    as={typeof href === "string" ? NavLink : undefined}
    className={className}
    disabled={disabled || loading}
    onClick={onClick}
    to={href!}
    type={type}
  >
    {loading ? (
      <StyledLoadingWrapper $size={size} align="center" justify="center">
        <IconLoading />
      </StyledLoadingWrapper>
    ) : null}

    <span style={loading ? { visibility: "hidden" } : undefined}>
      {children}
    </span>
  </StyledWrapper>
);
