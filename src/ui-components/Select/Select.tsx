import React from "react";
import styled from "styled-components";

import { IconChevronDown, IconClose } from "@/icons";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  border-radius: 24px;
  background: ${({ theme }) => theme.color("white", "black")};
  border: solid 1px ${({ theme }) => theme.color("grey.very-dark")};
`;

const StyledPlaceholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;

  display: flex;
  align-items: center;
  padding-left: 13px;
  pointer-events: none;
  user-select: none;

  font-size: 12px;

  color: ${({ theme }) => theme.color("grey")};
`;

const StyledSelect = styled.select`
  border-radius: 24px;
  padding: 8px 32px 8px 12px;
  background: ${({ theme }) => theme.color("white", "black")};
  color: ${({ theme }) => theme.color("black", "white")};
  background: transparent;
  border: none;
  appearance: none;

  option {
    background: ${({ theme }) => theme.color("white", "black")};
    color: ${({ theme }) => theme.color("black", "white")};
  }
`;

const StyledClearButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 12px;

  display: flex;
  align-items: center;

  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 8px;
    height: 8px;
    fill: ${({ theme }) => theme.color("black", "white")};
  }
`;

const StyledChevronDownIconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 10px;

  display: flex;
  align-items: center;

  pointer-events: none;
  user-select: none;

  svg {
    width: 12px;
    height: 12px;
    fill: ${({ theme }) => theme.color("black", "white")};
  }
`;

type Props<T> = {
  readonly value: T | null;
  readonly onChange: (newValue: T | null) => void;
  readonly placeholder?: React.ReactNode;
  readonly options: readonly { readonly value: T; readonly label: string }[];
  readonly allowClear?: boolean;
  readonly "aria-label"?: string;
};

export const Select = <T,>({
  value,
  onChange,
  placeholder,
  options,
  allowClear,
  "aria-label": ariaLabel,
}: Props<T>) => (
  <StyledWrapper>
    {placeholder && !value ? (
      <StyledPlaceholder>{placeholder}</StyledPlaceholder>
    ) : null}

    <StyledSelect
      aria-label={ariaLabel}
      onChange={(event) => onChange((event.target.value as T) || null)}
      value={(value ?? "") as string}
    >
      {allowClear ? <option value="" /> : null}

      {options.map((option) => (
        <option key={option.value as string} value={option.value as string}>
          {option.label}
        </option>
      ))}
    </StyledSelect>

    {value && allowClear ? (
      <StyledClearButton onClick={() => onChange(null)}>
        <IconClose />
      </StyledClearButton>
    ) : (
      <StyledChevronDownIconWrapper>
        <IconChevronDown />
      </StyledChevronDownIconWrapper>
    )}
  </StyledWrapper>
);
