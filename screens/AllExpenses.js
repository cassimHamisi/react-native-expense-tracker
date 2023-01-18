import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallBackText="No Registred Expenses Found"
    />
  );
}

export default AllExpenses;
const styles = StyleSheet.create({});
