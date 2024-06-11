import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";

import { Filters } from "@/features/Filters/Filters";
import { NavBar } from "@/features/NavBar/NavBar";
import { PhotoSearchForm } from "@/features/PhotoSearchForm/PhotoSearchForm";
import { useImageSearch } from "@/features/useImageSearch/useImageSearch";
import { Flex } from "@/ui/Flex/Flex";
import { Pagination } from "@/ui/Pagination/Pagination";
import { T } from "@/ui/Text/Text";

const StyledImageWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;

  min-width: 200px;
  width: 100%;

  box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media screen and (min-width: 1024px) {
    max-width: 50vw;
  }

  @media screen and (min-width: 1024px) {
    height: 300px;
  }
`;

const useScrollToTopOnFiltersChange = () => {
  const { filters } = useImageSearch();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [filters.page || 1]);
};

export const HomePage = () => {
  const intl = useIntl();

  const { data, isFetching, setFilters, filters, isError } = useImageSearch();

  useScrollToTopOnFiltersChange();

  return (
    <>
      <NavBar />

      <main>
        <PhotoSearchForm
          backgroundImage={data?.results?.[0]?.urls?.regular}
          onSubmit={(newSearchPhrase) =>
            setFilters({
              ...filters,
              searchPhrase: newSearchPhrase,
              page: 1,
            })
          }
        />

        <Flex align="center" direction="column" gap={24} padding={24}>
          {data ? (
            <Flex gap={8} justify="center">
              <Filters />
            </Flex>
          ) : null}

          {isError ? (
            <T size={24}>
              <FormattedMessage
                defaultMessage="There was an error!"
                id="8TXrbr"
              />
            </T>
          ) : (
            <>
              {data?.total === 0 ? (
                <Flex align="center" direction="column" gap={8}>
                  <T size={24}>
                    <FormattedMessage
                      defaultMessage='No results found for "{searchPhrase}"'
                      id="nLT452"
                      values={{ searchPhrase: filters.searchPhrase }}
                    />
                  </T>
                  <T size={14}>
                    <FormattedMessage
                      defaultMessage="Perhaps try clearing your filters..."
                      id="xvGSgL"
                    />
                  </T>
                </Flex>
              ) : (
                <Flex gap={24} justify="center" wrap>
                  {data?.results.map((item) => (
                    <StyledImageWrapper
                      data-testid="image-wrapper"
                      key={item.id}
                      style={{
                        aspectRatio: `${item.width}/${item.height}`,
                        width: `${(item.width / item.height) * 20}%`,
                        opacity: isFetching ? 0.3 : undefined,
                      }}
                    >
                      <img
                        alt={
                          item.alt_description ??
                          intl.formatMessage({
                            defaultMessage: "unknown image",
                            id: "4AjTWx",
                            description:
                              "Fallback alt tag for an image which didnt get back an alt_description property from the api",
                          })
                        }
                        src={item.urls.small}
                      />
                    </StyledImageWrapper>
                  ))}
                </Flex>
              )}
            </>
          )}

          {data?.total_pages && !isError ? (
            <Pagination
              currentPage={filters.page || 1}
              onChange={(newPage) => setFilters({ ...filters, page: newPage })}
              totalPages={data.total_pages}
            />
          ) : null}
        </Flex>
      </main>
    </>
  );
};
