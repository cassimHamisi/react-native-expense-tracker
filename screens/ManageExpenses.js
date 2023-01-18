import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import sendHttpRequest, {
  deleteExpense,
  updateExpense,
} from "../components/UI/http";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOveray";
import GlobalStyles from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";

function ManageExpenses({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);
  const expenseId = route.params?.expenseId;
  const isEdtingExpense = !!expenseId;

  // getSelected Expenses
  const selectedExpenses = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdtingExpense ? "Edit Expense" : "Add an Expense",
    });
  }, [isEdtingExpense, expenseId]);

  const deleteExpenseHandler = async () => {
    setIsFetching(true);
    // delete Expense
    try {
      await deleteExpense(expenseId);
      navigation.goBack();
      expenseCtx.deleteExpense(expenseId);
    } catch (error) {
      setError("Could not delete the Expense");
      setIsFetching(false);
    }
  };
  const onCancelHander = () => {
    // cancel Expense Modal
    navigation.goBack();
  };
  const onUpdateHandler = async (expenseData) => {
    setIsFetching(true);
    try {
      // Update Expense
      if (isEdtingExpense) {
        expenseCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await sendHttpRequest(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not update Item Please Try again next time");
      setIsFetching(false);
    }
  };
  const onConfirmErrorHandler = () => {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={onConfirmErrorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.viewRoot}>
      <ExpenseForm
        isUpdating={isEdtingExpense}
        onCancelHander={onCancelHander}
        onSubmit={onUpdateHandler}
        defaultValue={selectedExpenses}
      />
      {isEdtingExpense && (
        <View style={styles.viewIcon}>
          <IconButton
            icon="trash"
            color="red"
            size={30}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;
const styles = StyleSheet.create({
  viewRoot: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  viewIcon: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
