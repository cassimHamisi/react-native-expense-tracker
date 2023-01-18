import { StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
  // Add all the Expenses
  const expensesSummation = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View style={styles.rootView}>
      {/* Summary Of Expenses */}
      <Text style={styles.nameText}>{periodName}</Text>
      <Text style={styles.numberText}>Ksh.{expensesSummation.toFixed(2)}</Text>
    </View>
  );
}
export default ExpensesSummary;
const styles = StyleSheet.create({
  rootView: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  nameText: {
    fontSize: 13,
    color: GlobalStyles.colors.primary400,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
