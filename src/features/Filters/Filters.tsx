import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ColorId, SearchOrderBy } from "unsplash-js";

import { useImageSearch } from "@/features/useImageSearch/useImageSearch";
import { Select } from "@/ui/Select/Select";

const useSortOptions = (): readonly {
  readonly value: SearchOrderBy;
  readonly label: string;
}[] => {
  const intl = useIntl();

  return [
    {
      value: "relevant",
      label: intl.formatMessage({
        defaultMessage: "Most relevant",
        id: "6su7BI",
      }),
    },
    {
      value: "latest",
      label: intl.formatMessage({
        defaultMessage: "Latest",
        id: "adThp5",
      }),
    },
    {
      value: "editorial",
      label: intl.formatMessage({
        defaultMessage: "Editorial",
        id: "YhCsdY",
      }),
    },
  ];
};

const useColorOptions = (): readonly {
  readonly value: ColorId;
  readonly label: string;
}[] => {
  const intl = useIntl();

  return [
    {
      value: "white",
      label: intl.formatMessage({
        defaultMessage: "White",
        id: "OAG+sQ",
      }),
    },
    {
      value: "black",
      label: intl.formatMessage({
        defaultMessage: "Black",
        id: "XjGbuY",
      }),
    },
    {
      value: "yellow",
      label: intl.formatMessage({
        defaultMessage: "Yellow",
        id: "5Tw3Ta",
      }),
    },
    {
      value: "orange",
      label: intl.formatMessage({
        defaultMessage: "Orange",
        id: "n3m1xt",
      }),
    },
    {
      value: "red",
      label: intl.formatMessage({
        defaultMessage: "Red",
        id: "D+ZFS/",
      }),
    },
    {
      value: "purple",
      label: intl.formatMessage({
        defaultMessage: "Purple",
        id: "tihmF3",
      }),
    },
    {
      value: "magenta",
      label: intl.formatMessage({
        defaultMessage: "Magenta",
        id: "T6JjH9",
      }),
    },
    {
      value: "green",
      label: intl.formatMessage({
        defaultMessage: "Green",
        id: "1W4okO",
      }),
    },
    {
      value: "teal",
      label: intl.formatMessage({
        defaultMessage: "Teal",
        id: "c/BsMm",
      }),
    },
    {
      value: "blue",
      label: intl.formatMessage({
        defaultMessage: "Blue",
        id: "k2tJ9k",
      }),
    },
    {
      value: "black_and_white",
      label: intl.formatMessage({
        defaultMessage: "Black & White",
        id: "JS/4Xt",
      }),
    },
  ];
};

export const Filters = () => {
  const intl = useIntl();
  const sortOptions = useSortOptions();
  const colorOptions = useColorOptions();
  const { setFilters, filters } = useImageSearch();

  return (
    <>
      <Select
        allowClear
        aria-label={intl.formatMessage({
          defaultMessage: "color",
          id: "39dRjL",
        })}
        onChange={(newValue) =>
          setFilters({
            ...filters,
            color: newValue ?? undefined,
            page: 1,
          })
        }
        options={colorOptions}
        placeholder={
          <FormattedMessage defaultMessage="Pick a color" id="9rLJkS" />
        }
        value={filters.color ?? null}
      />

      <Select
        aria-label={intl.formatMessage({
          defaultMessage: "sort",
          id: "bvmIrI",
        })}
        onChange={(newValue) =>
          setFilters({
            ...filters,
            sort: newValue ?? undefined,
            page: 1,
          })
        }
        options={sortOptions}
        placeholder={<FormattedMessage defaultMessage="Sort" id="25oM9Q" />}
        value={filters.sort ?? "relevant"}
      />
    </>
  );
};
