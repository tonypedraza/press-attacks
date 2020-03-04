// import { Flex, Box } from "rebass";
// import { PrimaryButton } from "@nice-boys/components";
// import { GetViewerComponent } from "../graphql/queries/getViewer.generated";
// import Heading from "../components/Heading";
// import Home from "../components/Home";

// export default () => {
//   return (
//     <GetViewerComponent>
//       {({ data, loading, error }) => {
//         if (data) {
//           return (
//             <Flex alignItems="center" justifyContent="center" mt={4}>
//               {data.viewer && data.viewer.name ? (
//                 <Flex flexDirection="column" alignItems="center">
//                   <Heading>
//                     👋 Hello, {data.viewer ? data.viewer.name : "anonymous"}!
//                   </Heading>
//                   <Box mt={2}>
//                     <a href="/api/auth/logout">
//                       <PrimaryButton>Log out</PrimaryButton>
//                     </a>
//                   </Box>
//                 </Flex>
//               ) : (
//                 /* Implement an Error page here if
//                 you want to enforce user accounts */
//                 <Home />
//               )}
//             </Flex>
//           );
//         }

//         if (loading) return <p>Loading...</p>;

//         if (error) return <p>Error :(</p>;

//         return null;
//       }}
//     </GetViewerComponent>
//   );
// };

import React from "react";
import { NextPage } from "next";
import App from "../components/App";

const Home: NextPage<{ userAgent: string }> = () => <App />;

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
