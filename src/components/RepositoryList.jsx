import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem/index"; // idk why index is necessary but it was for expo
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ setOrderBy, setOrderDirection }) => {
  return (
    <Picker
      onValueChange={(itemValue) => {
        switch (itemValue) {
          case "latest":
            setOrderBy("CREATED_AT");
            setOrderDirection("DESC");
            break;
          case "highestRated":
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("DESC");
            break;
          case "lowestRated":
            setOrderBy("RATING_AVERAGE");
            setOrderDirection("ASC");
            break;
        }
      }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  navigate,
  picker,
  searchBar,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          {searchBar}
          {picker}
        </View>
      }
      // other props
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} showLink={false} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <TextInput
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      placeholder="Search repositories"
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedKeyword,
    first: 8,
  });
  const navigate = useNavigate();
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      {/* <SearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      /> */}
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
        navigate={navigate}
        picker={
          <SortPicker
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
          />
        }
        searchBar={
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        }
      />
    </View>
  );
};

export default RepositoryList;
