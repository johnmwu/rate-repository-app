import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import { Route, Routes, Navigate } from "react-router-native";
import Test from "./Test";
import SignOut from "./SignOut";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundGray },
      ]}
    >
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/test" element={<Test />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/review" element={<ReviewForm />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
