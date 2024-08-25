import { View } from "react-native";
import { useFormik } from "formik";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { PrimaryButton } from "./buttons";
import InputField from "./InputField";
import styles from "../styles";

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
