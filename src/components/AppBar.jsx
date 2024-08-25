import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
    flexDirection: "row",
  },
  // ...
});

const AppBar = () => {
  // determine if signed in
  const { loading, error, data } = useQuery(GET_ME);
  const username = !loading && !error && data.me;
  const isSignedIn = !!username;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" route="/" />
        {isSignedIn ? (
          <AppBarTab text="Sign Out" route="/signout" />
        ) : (
          <AppBarTab text="Sign In" route="/signin" />
        )}
        {isSignedIn && <AppBarTab text="Review" route="/review" />}
        {!isSignedIn && <AppBarTab text="Sign Up" route="/signup" />}
        <AppBarTab text="Test" route="/test" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
