import React, { CSSProperties } from "react";
import styled from "styled-components";

export type Padding = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56;

type Props = {
  readonly className?: string;
  readonly children?: React.ReactNode;

  readonly basis?: CSSProperties["flexBasis"];
  readonly grow?: true | CSSProperties["flexGrow"];
  readonly shrink?: CSSProperties["flexShrink"];
  readonly gap?: Padding | `${Padding}px ${Padding}px`;
  readonly wrap?: true | CSSProperties["flexWrap"];
  readonly direction?: CSSProperties["flexDirection"];

  readonly align?: CSSProperties["alignItems"];
  readonly justify?: CSSProperties["justifyContent"];
  readonly alignSelf?: CSSProperties["alignSelf"];

  readonly padding?: Padding | `${Padding}px ${Padding}px`;
};

type StyledProps = {
  readonly $basis?: Props["basis"];
  readonly $grow?: Props["grow"];
  readonly $shrink?: Props["shrink"];
  readonly $gap?: Props["gap"];
  readonly $wrap?: Props["wrap"];
  readonly $direction?: Props["direction"];

  readonly $align?: Props["align"];
  readonly $justify?: Props["justify"];
  readonly $alignSelf?: Props["alignSelf"];

  readonly $padding?: Props["padding"];
};

const StyledWrapper = styled.div.attrs<StyledProps>(
  ({
    $gap,
    $direction,
    $wrap,
    $basis,
    $grow,
    $shrink,
    $align,
    $alignSelf,
    $justify,
    $padding,
  }) => ({
    style: {
      flexBasis: $basis,
      flexGrow: $grow === true ? 1 : $grow,
      flexShrink: $shrink,
      gap: $gap,
      alignItems: $align,
      alignSelf: $alignSelf,
      justifyContent: $justify,
      flexWrap: $wrap === true ? "wrap" : $wrap,
      flexDirection: $direction,
      padding: $padding,
    } as CSSProperties,
  }),
)<StyledProps>`
  display: flex;
`;

export const Flex = ({
  children,
  className,

  gap,
  direction,
  wrap,
  basis,
  grow,
  shrink,
  align,
  alignSelf,
  justify,
  padding,
}: Props) => (
  <StyledWrapper
    $align={align}
    $alignSelf={alignSelf}
    $basis={basis}
    $direction={direction}
    $gap={gap}
    $grow={grow}
    $justify={justify}
    $padding={padding}
    $shrink={shrink}
    $wrap={wrap}
    className={className}
  >
    {children}
  </StyledWrapper>
);
