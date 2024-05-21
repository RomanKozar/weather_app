import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://google-news13.p.rapidapi.com/latest/';

const newsHeaders = {
    'X-RapidAPI-Key': 'aaea3c74efmshcfa3494b6433b50p153adcjsnee729377941c',
    'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
};

const requestNews = (url) => ({ url, headers: newsHeaders });

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getLatestNews: builder.query({
            query: () => requestNews(`?lr=en-US`) 
        }),
    })
});

export const { useGetLatestNewsQuery } = newsApi;