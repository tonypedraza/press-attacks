const fetch = require("isomorphic-unfetch");
require("dotenv").config();

const scrapeData = async () => {
  const rawData = await fetch(process.env.SCRAPE_URL);
  const data = await rawData.json();
  console.log(data);
  console.log(data.length);
};

scrapeData();
