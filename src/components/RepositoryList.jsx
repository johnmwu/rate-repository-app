import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem/index"; // idk why index is necessary but it was for expo
import theme from "../theme";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  );
};

export default RepositoryList;
