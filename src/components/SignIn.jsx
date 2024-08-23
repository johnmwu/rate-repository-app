import { Text, View, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  input_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    width: "100%",

    backgroundColor: theme.colors.backgroundWhite,
  },
  input_field: {
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.backgroundGray,
    borderStyle: "solid",
    borderRadius: 5,
  },
  submit_button: {
    margin: 5,
    padding: 10,

    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.input_container}>
      <View style={styles.input_field}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
      </View>
      <View style={styles.input_field}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
      </View>

      <View style={styles.submit_button}>
        <Text
          style={{
            color: theme.colors.textLight,
            fontWeight: theme.fontWeights.bold,
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
