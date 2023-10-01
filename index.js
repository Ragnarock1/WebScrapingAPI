import express from 'express'
import { scrapeWebsite , analyzeSentiment } from './crawler.js';
const app = express();
const port = 3000;



app.use(express.json());

app.get('/:url', async (req, res) => {
    const url = req.params.url;
    try {
        const scrapedData = await scrapeWebsite(url);
        res.json({ data: scrapedData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape the website' });
    }
});

app.get('/:url/sentiment', async (req, res) => {
    const url = req.params.url;
    try {
        const text = await scrapeWebsite(url);
        const sentiment = analyzeSentiment(text);
        res.json({ sentiment });
        
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape the website' });
    }
    
    
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});