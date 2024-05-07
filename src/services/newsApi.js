export const fetchNewsApi = async (location) => {
  const res = await fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?q=${location}%20Weather&freshness=Day&textFormat=Raw&safeSearch=Off`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_NEWS_API_KEY,
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    }
  );
  const data = await res.json();
  return data;
};
