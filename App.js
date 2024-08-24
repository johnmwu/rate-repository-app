import { StatusBar } from "expo-status-bar";

import { NativeRouter } from "react-router-native";

import Main from "./src/components/Main";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";

import Constants from "expo-constants";

const client = createApolloClient();

const App = () => {
  console.log(Constants.expoConfig);
  return (
    <>
      <ApolloProvider client={client}>
        <NativeRouter>
          <Main />
        </NativeRouter>
      </ApolloProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
