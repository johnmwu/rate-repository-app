import { View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  input_field: {
    // margin: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.backgroundGray,
    borderStyle: "solid",
    borderRadius: 5,
  },
});

const InputField = ({ placeholder, field, formik, ...extraProps }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={[
          styles.input_field,
          formik.touched[field] &&
            formik.errors[field] && { borderColor: "red" },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          value={formik.values[field]}
          onChangeText={formik.handleChange(field)}
          {...extraProps}
        />
      </View>
      {formik.touched[field] && formik.errors[field] && (
        <Text style={{ color: "red" }}>{formik.errors[field]}</Text>
      )}
    </View>
  );
};

export default InputField;
