import { View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import format from "date-fns/format";

const ReviewItem = ({ review, itemFormat }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10,
        backgroundColor: theme.colors.backgroundWhite,
      }}
    >
      {/* rating */}
      <View
        style={{
          height: 40,
          width: 40,
          borderWidth: 2,
          borderRadius: 20,
          borderColor: theme.colors.primary,

          // these three really just for centering
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          color="primary"
          fontWeight="bold"
          fontSize={theme.fontSizes.subheading}
          style={{ textAlign: "center" }}
        >
          {review.rating}
        </Text>
      </View>

      {/* name, date, text */}
      <View
        style={{
          marginLeft: 10,
          flexShrink: 1,
        }}
      >
        <Text
          fontWeight="bold"
          fontSize={theme.fontSizes.subheading}
          style={{ marginBottom: 2 }}
        >
          {itemFormat === "myreview"
            ? review.repository.fullName
            : review.user.username}
        </Text>
        <Text style={{ marginBottom: 5, color: theme.colors.textSecondary }}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
