import { View, Image, StyleSheet, Linking } from "react-native";
import Text from "../../components/Text";
import theme from "../../theme";
import ItemStat from "./ItemStat";
import { Button } from "../buttons";

const styles = StyleSheet.create({
  item_logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  item_container: {
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
    // margin: 5,
    // borderRadius: 5,
    // maxWidth: 1000,
  },
});

const RepositoryItem = ({ repository, showLink }) => {
  if (!repository) {
    return null;
  }

  return (
    <View style={styles.item_container} testID="repositoryItem">
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.item_logo}
        />
        <View
          style={{
            flexShrink: 1,
          }}
        >
          <Text
            style={{
              fontWeight: theme.fontWeights.bold,
              fontSize: theme.fontSizes.subheading,
            }}
          >
            {repository.fullName}
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              marginTop: 0,
              // textWrap: "wrap",
              // flexShrink: 1,
            }}
          >
            {repository.description}
          </Text>
          <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
            <Text
              style={{
                color: theme.colors.textLight,
                backgroundColor: theme.colors.primary,
                padding: 5,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 5,
                // marginRight: 10,
              }}
            >
              {repository.language}
            </Text>
          </View>
        </View>
      </View>

      {/* stars, forks review rating  */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
        }}
      >
        <ItemStat label="Stars" value={repository.stargazersCount} />
        <ItemStat label="Forks" value={repository.forksCount} />
        <ItemStat label="Reviews" value={repository.reviewCount} />
        <ItemStat label="Rating" value={repository.ratingAverage} />
      </View>

      {/* maybe show link to github */}
      {showLink && (
        <View style={{ marginTop: 10 }}>
          <Button
            text="Open in Github"
            onPress={() => Linking.openURL(repository.url)}
          />
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
