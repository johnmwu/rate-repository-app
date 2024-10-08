import { GET_ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { View, FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import theme from "../theme";
import { StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error :( {error.message}</Text>;
  }

  if (!data) {
    return <Text>No data :(</Text>;
  }

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewItem review={item} itemFormat="myreview" />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default MyReviews;
