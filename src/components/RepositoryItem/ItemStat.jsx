import { View } from "react-native";
import Text from "../../components/Text";
import theme from "../../theme";

const ItemStat = ({ label, value }) => {
  const value_str = value > 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`;
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text style={{ fontWeight: theme.fontWeights.bold }}>{value_str}</Text>
      <Text style={{ color: theme.colors.textSecondary }}>{label}</Text>
    </View>
  );
};

export default ItemStat;
