import React from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

import { IconChevronLeft, IconChevronRight } from "@/icons";
import { Button } from "@/ui/Button/Button";
import { Flex } from "@/ui/Flex/Flex";

const StyledChangePageIcon = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.color("black", "white")};
  }
`;

const StyledLastPageLink = styled(NavLink)`
  text-decoration: underline;
`;

type Props = {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onChange: (newPage: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onChange }: Props) => {
  const location = useLocation();

  if (totalPages < 2) {
    return null;
  }

  const linkToLastPage = new URLSearchParams({
    ...Object.fromEntries(new URLSearchParams(location.search).entries()),

    // eslint disabled next line because we want short query params
    p: String(totalPages), // eslint-disable-line id-length
  }).toString();

  return (
    <Flex align="center" gap={4}>
      {currentPage > 1 ? (
        <Button mode="transparent" onClick={() => onChange(currentPage - 1)}>
          <StyledChangePageIcon>
            <IconChevronLeft />
          </StyledChangePageIcon>
        </Button>
      ) : null}

      <FormattedMessage
        defaultMessage="page {currentPage} of {totalPages}"
        id="0l9Gb/"
        values={{
          currentPage,
          totalPages: (
            <StyledLastPageLink
              to={{
                search: linkToLastPage,
              }}
            >
              {totalPages}
            </StyledLastPageLink>
          ),
        }}
      />

      {currentPage < totalPages ? (
        <Button mode="transparent" onClick={() => onChange(currentPage + 1)}>
          <StyledChangePageIcon>
            <IconChevronRight />
          </StyledChangePageIcon>
        </Button>
      ) : null}
    </Flex>
  );
};
