import React from "react";
import styled from "styled-components";

import { IconSearch } from "@/icons";

const StyledWrapper = styled.div`
  position: relative;

  display: flex;

  background: ${({ theme }) => theme.color("white", "black")};
  border: solid 1px ${({ theme }) => theme.color("grey.very-dark")};
  border-radius: 40px;
`;

const StyledSearchIcon = styled(IconSearch)`
  width: 24px;
  height: 24px;

  flex-shrink: 0;

  margin: 8px 0 8px 8px;

  fill: ${({ theme }) => theme.color("black", "white")};
`;

const StyledInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background: transparent;
  border: none;
  border-radius: 40px;
  padding: 0 12px 0 40px;
  color: ${({ theme }) => theme.color("black", "white")};

  &::placeholder {
    color: ${({ theme }) => theme.color("grey")};
  }
`;

type Props = {
  readonly placeholder?: string;
  readonly value: string;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const TextInput = ({ value, onChange, placeholder }: Props) => (
  <StyledWrapper>
    <StyledSearchIcon />
    <StyledInput
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  </StyledWrapper>
);
