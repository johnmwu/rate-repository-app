import { View, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { PrimaryButton } from "./buttons";

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
});

import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validationSchema,
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

      <PrimaryButton text="Sign In" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    // console.log(values);
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
