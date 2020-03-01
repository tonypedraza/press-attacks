import { NextPage } from "next";
import App from "../components/App";

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => <App />;

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
