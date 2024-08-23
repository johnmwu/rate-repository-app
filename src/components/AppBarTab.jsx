import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
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

const AppBarTab = ({ text, route }) => {
  return (
    <Pressable>
      <Link to={route}>
        <Text style={styles.tab}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
