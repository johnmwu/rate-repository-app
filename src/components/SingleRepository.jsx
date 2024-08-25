import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, fetchMore, loading } = useRepository({
    id,
    first: 3,
  });
  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!repository) {
    return <Text>No data :(</Text>;
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
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        // android stuff gets cut off at the end
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default SingleRepository;
