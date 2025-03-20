import axios from "axios";
import newsImage from '../images/newsImage.jpg'


const NEW_API_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_KEY;
const BBC_API_KEY = process.env.REACT_APP_NYT_KEY;
const GNEWS_API_KEY = process.env.REACT_APP_GNEWS_KEY;


// function help to make api request
const makeApiRequest = async (url: string, params: any) => {
    try {
        const response = await axios.get(url, { params });
        return response.data;

    } catch (error) {
        console.error("API request failed:", error);
        return null;
    }
};


// helper function to normalize article data
const normalizeArticles = (articles: any, source: any) => {
    console.log("normalize article", articles);

    return articles.map((article: any) => ({
        title: article.title || article.webTitle || article.headline.main,
        description: article.description || article.fields?.trailText || article.lead_paragraph,
        url: article.url || article.webUrl || article.web_url,
        source: article.source.name || article.fields?.publication || article.source,
        publishedAt: article.publishedAt || article.webPublicationDate || article.pub_date,
        author: article.author || (article.fields?.byline || 'Unkown Author') || article.byline.original || 'No Author',
        category: article.urlToImage || article.sectionName || 'General',
        imgSrc: article.urlToImage || article.image || newsImage,
    }));
};


// fetch NewsApi articles
export const fetchNewsAPIArticles = async (query: string, filters: any) => {
    const searchUrl = `https://newsapi.org/v2/everything?q=${query}&from=${filters.date}`;
    const topHeadUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${filters.category}`;
    const categoryUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${filters.category}`;

    const url = (query) ? searchUrl : (filters.category) ? categoryUrl : topHeadUrl;
    const params = {
        apiKey: NEW_API_KEY,
    };

    const data = await makeApiRequest(url, params);
    return data ? normalizeArticles(data.articles, 'NewsAPI') : [];
};

//Fetch Guardian articles
export const fetchGuardianArticles = async (query: string, filters: any) => {
    const searchUrl = `https://content.guardianapis.com/search`;
    const searchWithDateUrl = `https://content.guardianapis.com?from-date=${filters.date}`;
    const url = (query || filters.category) ? searchUrl : (filters.date) ? searchWithDateUrl : searchUrl;

    const params = {
        q: query || filters.category,
        'api-key': GUARDIAN_API_KEY,
        'show-fields': 'all',
    };

    const data = await makeApiRequest(url, params);
    return data ? normalizeArticles(data.response.result, 'The Guardian') : [];
};


// fetch NewYork news articles
export const fetchNYTimesArticles = async (query:string, filters:any) => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
    const params = {
        fq: query,
        from: filters.date,
        'api-key': BBC_API_KEY,
        category: filters.category
    };

    const data = await makeApiRequest(url, params);
    return data ? normalizeArticles(data.response.docs, 'BC News') : [];
};

// fetch Gnews articles
export const fetchGnewsArticles = async (query: string, filters:any) => {
    const url = `https://gnews.io/api/v4/top-headlines`;
    const params = {
      q: query,
      from: filters.date,
      category: filters.category || 'general',
      apikey: GNEWS_API_KEY,
    };

    const data = await makeApiRequest(url, params);
    return data ? normalizeArticles(data.articles, 'GNews') : [];
  };

  console.log("Normalize end", normalizeArticles);
