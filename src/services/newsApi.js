import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://newsnow.p.rapidapi.com/newsv2_top_news_location";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "aaea3c74efmshcfa3494b6433b50p153adcjsnee729377941c",
  "X-RapidAPI-Host": "newsnow.p.rapidapi.com",
};

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl, headers }),
  endpoints: (builder) => ({
    getNews: builder.query({
      queryFn: async ({ location, language = "en", page = 1 }) => {
        const options = {
          method: "POST",
          headers,
          body: JSON.stringify({ location, language, page }),
        };

        const response = await fetch(baseUrl, options);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }

        return response.json();
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
