import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Новий базовий URL
const baseUrl = 'https://google-news13.p.rapidapi.com/latest/';

// Оновлені заголовки
const newsHeaders = {
    'X-RapidAPI-Key': 'aaea3c74efmshcfa3494b6433b50p153adcjsnee729377941c',
    'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
};

// Функція для формування запиту з новими заголовками
const requestNews = (url) => ({ url, headers: newsHeaders });

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        // Оновлення назви запиту та параметрів запиту
        getLatestNews: builder.query({
            query: () => requestNews(`?lr=en-US`) // Використання нового URL для запиту останніх новин
        }),
    })
});

// Експорт хука для використання в компонентах
export const { useGetLatestNewsQuery } = newsApi;