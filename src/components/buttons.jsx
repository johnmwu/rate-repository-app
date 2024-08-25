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

export const Button = ({ text, backgroundColor, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: backgroundColor || theme.colors.primary,
        flexGrow: 1,
        flexShrink: 1,
      }}
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
