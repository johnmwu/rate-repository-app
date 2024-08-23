import { React } from "react";
import { Platform, Text, StyleSheet, View } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: Platform.OS === "android" ? "green" : "blue",
  },
});

const Test = () => {
  return (
    <View>
      <Text style={styles.text}>Your platform is: {Platform.OS}</Text>
      <Text>
        {Platform.select({
          ios: theme.fonts.ios.main,
          android: theme.fonts.android.main,
        })}
      </Text>
    </View>
  );
};
export default Test;
