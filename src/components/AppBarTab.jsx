import { Pressable, Text, StyleSheet } from "react-native";
import theme from "../theme";
// import Text from "./Text";

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.textLight,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 5,
    margin: 5,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
      <Text style={styles.tab}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
