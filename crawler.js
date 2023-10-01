import axios from 'axios';
import cheerio from 'cheerio';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export async function scrapeWebsite(localUrl) {
    try {
        const url = "https://" + localUrl; 
        const response = await axios.get(url);
        const $ = cheerio.load(response.data, null , false);
        
        const h3Elements = [];
        const pElements = [];
        $('h3').each((index, element) => {
            h3Elements.push($(element).text());
        });
        $('p').each((index, element) => {
            pElements.push($(element).text());
        });

        // Extract images and links
        const imageUrls = [];
        const linkUrls = [];
        $('img').each((index, element) => {
            imageUrls.push($(element).attr('src'));
        });
        $('a').each((index, element) => {
            linkUrls.push($(element).attr('href'));
        });

        return {
            h3: h3Elements,
            p: pElements,
            images: imageUrls,
            links: linkUrls,
        };
    } catch (error) {
        throw error;
    }
}

export function analyzeSentiment(text) {
    const result = sentiment.analyze(text);
    if (result.score > 0) {
        return 'positive';
    } else if (result.score < 0) {
        return 'negative';
    } else {
        return 'neutral';
    }
}