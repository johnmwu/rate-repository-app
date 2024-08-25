import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import format from "date-fns/format";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
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
          {review.user.username}
        </Text>
        <Text style={{ marginBottom: 5, color: theme.colors.textSecondary }}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams().id;
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <View>
            <RepositoryItem repository={repository} showLink={true} />
            <ItemSeparator />
          </View>
        )}
      />
    </View>
  );
};

export default SingleRepository;
