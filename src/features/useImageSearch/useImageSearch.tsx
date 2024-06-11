import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorId, SearchOrderBy } from "unsplash-js";

import { unsplashApi } from "@/utils/unsplashApi";

type Filters = {
  readonly searchPhrase: string;
  readonly color: ColorId | undefined;
  readonly sort: SearchOrderBy | undefined;
  readonly page: number | undefined;
};

export const useImageSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);

  const filters: Filters = {
    searchPhrase: urlParams.get("q") ?? "",
    color: (urlParams.get("color") as ColorId) ?? null,
    sort: (urlParams.get("sort") as SearchOrderBy) ?? null,
    page: urlParams.get("p") ? Number(urlParams.get("p")) : 1,
  };

  const setFilters = (newFilters: Partial<Filters>) => {
    navigate({
      search: new URLSearchParams(
        JSON.parse(
          JSON.stringify({
            // eslint disabled next lines because we want short query params
            q: newFilters.searchPhrase || undefined, // eslint-disable-line id-length
            p: newFilters.page || undefined, // eslint-disable-line id-length

            color: newFilters.color || undefined,
            sort: newFilters.sort || undefined,
          }),
        ),
      ).toString(),
    });
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ["search-images", filters],
    queryFn: async () => {
      const result = await unsplashApi.search.getPhotos({
        query: filters.searchPhrase,
        color: filters.color,
        orderBy: filters.sort || "relevant",
        page: filters.page || 1,
      });

      return result?.response;
    },
    placeholderData: (previousData) => previousData,
    enabled: Boolean(filters.searchPhrase),
  });

  return { data, isFetching, filters, setFilters, isError };
};
