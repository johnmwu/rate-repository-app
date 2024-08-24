import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";

import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import theme from "../theme";

const styles = StyleSheet.create({
  signout_button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.backgroundRed,
  },
});

const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.signout_button}>
      <Pressable
        onPress={async () => {
          await signOut();
          navigate("/");
        }}
      >
        <Text
          style={{
            color: theme.colors.textLight,
            fontWeight: theme.fontWeights.bold,
            textAlign: "center",
          }}
        >
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
};

export default SignOut;
