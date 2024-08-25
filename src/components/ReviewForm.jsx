import { View, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { PrimaryButton } from "./buttons";
import InputField from "./InputField";
import useCreateReview from "../hooks/useCreateReview";

import styles from "../styles";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .integer()
    .required("Rating is required")
    .min(0, "Rating must be greater than or equal to 0")
    .max(100, "Rating must be less than or equal to 100"),
  text: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const { data } = await createReview(values);
        const { repositoryId } = data.createReview;
        navigate(`/repository/${repositoryId}`);
        console.log("Successful review creation", data);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <View style={styles.input_container}>
      <InputField
        placeholder="Repository owner name"
        field="ownerName"
        formik={formik}
      />
      <InputField
        placeholder="Repository name"
        field="repositoryName"
        formik={formik}
      />
      <InputField
        placeholder="Rating (0-100)"
        field="rating"
        formik={formik}
        keyboardType="numeric"
      />
      <InputField placeholder="Review" field="text" formik={formik} multiline />

      <PrimaryButton text="Create a review" onPress={formik.handleSubmit} />
    </View>
  );
};

export default ReviewForm;
