import { View } from "react-native";
import { useFormik } from "formik";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import { Button } from "./buttons";
import InputField from "./InputField";
import styles from "../styles";
import useSignIn from "../hooks/useSignIn";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.input_container}>
      <InputField
        placeholder="Username"
        field="username"
        formik={formik}
        secureTextEntry={false}
      />

      <InputField
        placeholder="Password"
        field="password"
        formik={formik}
        secureTextEntry={true}
      />

      <InputField
        placeholder="Password confirmation"
        field="passwordConfirmation"
        formik={formik}
        secureTextEntry={true}
      />

      <Button text="Sign Up" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    // console.log(values);
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
