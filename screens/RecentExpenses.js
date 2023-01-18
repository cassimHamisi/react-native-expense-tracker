import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { fetchHttpRequest } from "../components/UI/http";
import LoadingOverlay from "../components/UI/LoadingOveray";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/DateFormatter";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const expenseCtx = useContext(ExpenseContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  const recentExpenses = expenseCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return (
      expenses.date >= date7daysAgo &&
      expenses.date <= today.toISOString().slice(0, 10)
    );
  });

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchHttpRequest();
        // setFetchedExpenses(expenses);
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setErrorMessage("Could Not Fetch Expenses");
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);

  const onConfirmErrorHandler = () => {
    setErrorMessage(null);
  };

  if (errorMessage && !isFetching) {
    return (
      <ErrorOverlay message={errorMessage} onConfirm={onConfirmErrorHandler} />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Recent"
      fallBackText="No Expenses Registered in Last 7 days"
    />
  );
}

export default RecentExpenses;
