/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database/generated/client";
require("dotenv").config();

const setOrCreateCountry = async (country: string) => {
  let countryRecord = await prisma.country({ name: country });
  if (!countryRecord) {
    countryRecord = await prisma.createCountry({
      name: country
    });
  }
  return countryRecord.id;
};

const addJournalist = async (datum: any) => {
  let journalistCountryId = await setOrCreateCountry(datum.country);
  let startDate = new Date(datum.startDisplay).toISOString();
  let endDate = new Date(datum.endDisplay).toISOString();
  let journalist = await prisma.createJournalist({
    href: datum.href,
    cpjId: `${datum.id}`,
    fullName: datum.fullName,
    country: {
      connect: {
        id: journalistCountryId
      }
    },
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
    startDate: startDate,
    endDate: endDate,
    sourcesOfFire: datum.sourcesOfFire,
    motiveConfirmed: datum.motiveConfirmed,
    body: datum.body,
    year: datum.year
  });
  return journalist;
};

const scrapeData = async () => {
  // Delete all the journalists in the DB to keep data fresh:
  await prisma.deleteManyJournalists({ id_not_in: [0] });
  const url = process.env.SCRAPE_URL;
  const rawData = await fetch(url as RequestInfo);
  const data = await rawData.json();
  for await (let datum of data) {
    try {
      let journalist = await addJournalist(datum);
      console.log("added journalist");
      console.log(journalist);
    } catch (error) {
      console.log(error);
    }
  }
};

scrapeData();
