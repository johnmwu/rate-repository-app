import { StyleSheet } from "react-native";

import theme from "./theme";

const styles = StyleSheet.create({
  input_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",

    padding: 10,

    backgroundColor: theme.colors.backgroundWhite,
  },
});

export default styles;
