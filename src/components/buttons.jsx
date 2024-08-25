import Text from "./Text";
import { Pressable, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
});

export const PrimaryButton = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ ...styles.button, backgroundColor: theme.colors.primary }}
    >
      <Text
        style={{
          color: theme.colors.textLight,
          fontWeight: theme.fontWeights.bold,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
