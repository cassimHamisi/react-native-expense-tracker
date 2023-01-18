import { Pressable, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";
import DateFormatter from "../../util/DateFormatter";
import { useNavigation } from "@react-navigation/native";

function Expenseitem({ id, description, date, amount }) {
  const navigation = useNavigation();
  const onPressItemHandler = () => {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  };

  return (
    <Pressable
      onPress={onPressItemHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.rootView}>
        <View style={styles.descriptionView}>
          <Text style={[styles.dateText, styles.descrText]}>{description}</Text>
          <Text style={styles.dateText}>
            <DateFormatter date={date} />
          </Text>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.amountText}>{amount.toFixed(2)}/=</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default Expenseitem;
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  dateText: {
    color: GlobalStyles.colors.primary50,
  },
  descrText: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  amountView: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
    overflow: "hidden",
  },
});
