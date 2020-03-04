const fetch = require("isomorphic-unfetch");
require("dotenv").config();

const setOrCreateCountry = async country => {
  // Query the database to see if the country already exists
  // if not create it, if so use that country foreign key
  return country;
};

const scrapeData = async () => {
  const rawData = await fetch(process.env.SCRAPE_URL);
  const data = await rawData.json();
  let writeData = await data.map(async datum => {
    return {
      href: datum.href,
      fullName: datum.fullName,
      country: await setOrCreateCountry(datum.country),
      primaryNationality: datum.primaryNationality,
      gender: datum.gender,
      notes: datum.notes,
      type: datum.type,
      mtpage: datum.mtpage,
      typeOfDeath: datum.typeOfDeath,
      status: datum.status,
      employedAs: datum.employedAs,
      organizations: datum.organizations,
      jobs: datum.jobs,
      coverages: datum.coverages,
      mediums: datum.mediums,
      location: datum.location,
      startDisplay: datum.startDisplay,
      endDisplay: datum.endDisplay,
      sourcesOfFire: datum.sourcesOfFire,
      motiveConfirmed: datum.motiveConfirmed,
      body: datum.body,
      year: datum.year
    };
  });
  return writeData;
};

scrapeData();
