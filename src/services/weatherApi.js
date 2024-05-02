import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `weatherapi-com.p.rapidapi.com`;

const weatherHeaders = {
  "X-RapidAPI-Key": "aaea3c74efmshcfa3494b6433b50p153adcjsnee729377941c",
  "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
};

const requestWeather = (url) => ({url, headers: weatherHeaders})

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getForecastWeather: builder.query({
            query: (location) => requestWeather(`forecast.json?q=${location}&days=3`)
        }),
        getSearchWeather: builder.query({
            query: (search) => requestWeather(`search.json?q=${search}&days=3`)
        })
    })
})

export const { useGetForecastWeatherQuery, useGetSearchWeatherQuery} = weatherApi