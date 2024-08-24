import { StatusBar } from "expo-status-bar";

import { NativeRouter } from "react-router-native";

import Main from "./src/components/Main";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";

import Constants from "expo-constants";

import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.expoConfig);
  return (
    <>
      <ApolloProvider client={client}>
        <NativeRouter>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </NativeRouter>
      </ApolloProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
