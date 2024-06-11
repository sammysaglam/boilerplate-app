import React from "react";
import { DefaultTheme } from "styled-components";

type BaseVariant = {
  readonly h1?: undefined;
  readonly h2?: undefined;
  readonly h3?: undefined;
  readonly h4?: undefined;
  readonly h5?: undefined;
  readonly h6?: undefined;
};

type Variant =
  | BaseVariant
  | (Omit<BaseVariant, "h1"> & { readonly h1: true })
  | (Omit<BaseVariant, "h2"> & { readonly h2: true })
  | (Omit<BaseVariant, "h3"> & { readonly h3: true })
  | (Omit<BaseVariant, "h4"> & { readonly h4: true })
  | (Omit<BaseVariant, "h5"> & { readonly h5: true })
  | (Omit<BaseVariant, "h6"> & { readonly h6: true });

type Props = {
  readonly color?: ReturnType<DefaultTheme["color"]>;
  readonly children: React.ReactNode;
  readonly size?: number;
  readonly weight?: 400 | 600 | 700;
} & Variant;

// eslint disabled next line because we want a short & distinct <T> component instead of <Text>
// eslint-disable-next-line id-length
export const T = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  size,
  color,
  weight,
  children,
}: Props) => {
  const determineElement = () => {
    switch (true) {
      case h1:
        return "h1";
      case h2:
        return "h2";
      case h3:
        return "h3";
      case h4:
        return "h4";
      case h5:
        return "h5";
      case h6:
        return "h6";
      default:
        return "span";
    }
  };

  const Element = determineElement();

  return (
    <Element style={{ color, fontSize: size, fontWeight: weight }}>
      {children}
    </Element>
  );
};
