import React from "react";
import styled, { useTheme } from "styled-components";

import { useSelectedLanguage } from "@/features/IntlProvider/IntlProvider";
import { IconDark, IconLight } from "@/icons";
import { useChangeTheme } from "@/theme";
import { Button } from "@/ui/Button/Button";
import { Flex } from "@/ui/Flex/Flex";
import { Switch } from "@/ui/Switch/Switch";
import { T } from "@/ui/Text/Text";

const StyledWrapper = styled.nav`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;

  z-index: ${({ theme }) => theme.zindex.navbar};
  padding: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledIconLight = styled(IconLight)`
  margin: 4px;
  fill: white;
`;
const StyledIconDark = styled(IconDark)`
  margin: 4px;
  fill: white;
`;

export const NavBar = () => {
  const theme = useTheme();
  const handleChangeTheme = useChangeTheme();
  const [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();

  return (
    <StyledWrapper>
      <Flex>
        {[
          { lang: "en", label: "English" },
          { lang: "fr", label: "French" },
          { lang: "de", label: "German" },
          { lang: "es", label: "Spanish" },
        ].map(({ lang, label }) => (
          <Button
            key={lang}
            mode="transparent"
            onClick={() => setSelectedLanguage(lang as typeof selectedLanguage)}
            size="small"
          >
            <T
              color={theme.color(
                selectedLanguage === lang ? "yellow" : "white",
              )}
            >
              {label}
            </T>
          </Button>
        ))}
      </Flex>
      <Switch
        checked={theme.mode === "dark"}
        icon={{
          off: <StyledIconLight />,
          on: <StyledIconDark />,
        }}
        onChange={() =>
          handleChangeTheme(theme.mode === "dark" ? "light" : "dark")
        }
        overrideColors={{
          offBackground: theme.color("yellow.light"),
          offButton: theme.color("yellow"),

          onBackground: theme.color("blue.dark"),
          onButton: theme.color("blue"),
        }}
      />
    </StyledWrapper>
  );
};
