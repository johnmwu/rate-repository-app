import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

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
  input_field: {
    // margin: 5,
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

import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    // console.log(values);
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // not sure what is resetForm but it doesn't remove all form data
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <View style={styles.input_container}>
      <View style={{ marginBottom: 10 }}>
        <View
          style={[
            styles.input_field,
            formik.touched.username &&
              formik.errors.username && { borderColor: "red" },
          ]}
        >
          <TextInput
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
          />
        </View>
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: "red" }}>{formik.errors.username}</Text>
        )}
      </View>

      <View style={{ marginBottom: 10 }}>
        <View
          style={[
            styles.input_field,
            formik.touched.password &&
              formik.errors.password && { borderColor: "red" },
          ]}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
          />
        </View>
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: "red" }}>{formik.errors.password}</Text>
        )}
      </View>

      <Pressable style={styles.submit_button} onPress={formik.handleSubmit}>
        <Text
          style={{
            color: theme.colors.textLight,
            fontWeight: theme.fontWeights.bold,
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
