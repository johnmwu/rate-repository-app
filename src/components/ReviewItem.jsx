import { View, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import format from "date-fns/format";
import { Button } from "./buttons";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const ReviewItem = ({ review, itemFormat }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  return (
    <View
      style={{ padding: 10, backgroundColor: theme.colors.backgroundWhite }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
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

      {/* Maybe buttons */}
      {itemFormat === "myreview" && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
          }}
        >
          <Button
            text="View repository"
            onPress={() => {
              navigate(`/repository/${review.repository.id}`);
            }}
          />
          <Button
            text="Delete review"
            backgroundColor={theme.colors.backgroundRed}
            onPress={() => {
              Alert.alert(
                "Delete review",
                "Are you sure you want to delete this review?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      deleteReview(review.id);
                    },
                  },
                ]
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
