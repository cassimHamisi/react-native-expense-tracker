import { StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

// Component to diplay our Expenses
function ExpensesOutput({ expenses, expensesPeriod, fallBackText }) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.rootView}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}
export default ExpensesOutput;
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingBottom: 0,
  },
  infoText: {
    marginTop: 16,
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
