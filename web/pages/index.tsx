import React from "react";
import { NextPage, GetStaticProps } from "next";
import App from "../components/App";
import { Country } from "../types/press-attacks";

const Home: NextPage<{ countries: Country[] }> = ({ countries }) => (
  <App countries={countries} />
);

export const getStaticProps: GetStaticProps = async () => {
  const query = `query getCountries {
    countries(orderBy: name_ASC) {
      id
      name
      numJournalists
    }
  }`;
  const url = "http://localhost:3000/api/graphql";
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  const res = await fetch(url, opts);
  const resJson = await res.json();
  const countries = resJson.data.countries;
  return {
    props: {
      countries
    }
  };
};

export default Home;
