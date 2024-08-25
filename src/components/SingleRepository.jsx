import { useParams } from "react-router-native";

import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import format from "date-fns/format";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// format is either "myreview" or "reviews"

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
