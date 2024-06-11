import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { useTheme } from "styled-components";

import { useImageSearch } from "@/features/useImageSearch/useImageSearch";
import { Button } from "@/ui/Button/Button";
import { Flex } from "@/ui/Flex/Flex";
import { T } from "@/ui/Text/Text";
import { TextInput } from "@/ui/TextInput/TextInput";

const StyledWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  height: 30vh;
  min-height: 200px;

  color: ${({ theme }) => theme.color("white", "black")};
  background: ${({ theme }) => theme.color("blue.very-dark")};
  border-bottom: solid 1px ${({ theme }) => theme.color("grey.very-dark")};
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.13);
`;

const StyledSearchForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  max-width: 600px;
  padding: 0 24px;
`;

const StyledBlurredBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  opacity: 0.4;

  background-position: center;
  background-size: 50%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(4px);
  }
`;

type Props = {
  readonly backgroundImage: string | undefined;
  readonly onSubmit: (searchPhrase: string) => void;
};

export const PhotoSearchForm = ({ backgroundImage, onSubmit }: Props) => {
  const intl = useIntl();
  const theme = useTheme();
  const { filters, isFetching } = useImageSearch();
  const [searchPhrase, setSearchPhrase] = useState(filters.searchPhrase);

  useEffect(() => {
    if (filters.searchPhrase !== searchPhrase) {
      setSearchPhrase(filters.searchPhrase || "");
      return;
    }
  }, [filters.searchPhrase]);

  return (
    <StyledWrapper>
      <StyledBlurredBackgroundImage
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
        }}
      />
      <StyledSearchForm
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(searchPhrase);
        }}
      >
        <T color={theme.color("white")} h1 size={16} weight={400}>
          <FormattedMessage
            defaultMessage="The internet’s source for visuals. Powered by creators everywhere."
            id="Uw0XrI"
          />
        </T>

        <Flex gap={4}>
          <Flex direction="column" grow>
            <TextInput
              onChange={(event) => setSearchPhrase(event.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: "Search for photos",
                id: "aoLOgo",
              })}
              value={searchPhrase}
            />
          </Flex>

          <Button loading={isFetching} type="submit">
            <FormattedMessage
              defaultMessage="Go"
              description="This is the button which will trigger the user's photo search."
              id="ZW8yMG"
            />
          </Button>
        </Flex>
      </StyledSearchForm>
    </StyledWrapper>
  );
};
