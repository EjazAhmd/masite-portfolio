import Parser from "rss-parser"

const parser = new Parser();

export const mediumRSSParser = async (link) => {
    const feedResponse = await parser.parseURL(link);
      
    const articles = feedResponse.items.map(item => ({
        title: item.title,
        description: item['content:encodedSnippet'],
        datePublished: item.pubDate,
        link: item.link
    }));
    return articles;
}

export const devRSSParser = async (link) => {
    const feedResponse = await parser.parseURL(link);
      
    const articles = feedResponse.items.map(item => ({
        title: item.title,
        description: item.contentSnippet,
        datePublished: item.pubDate,
        link: item.link
    }));
    return articles;
}

export const hashNodeRSSParser = async (link) => {
    const feedResponse = await parser.parseURL(link);
      
    const articles = feedResponse.items.map(item => ({
        title: item.title,
        description: item.description,
        datePublished: item.pubDate,
        link: item.link
    }));
    return articles;
}