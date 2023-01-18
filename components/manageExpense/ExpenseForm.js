// text Input formated in this component

import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../constants/styles";
import DateFormatter, { getFormattedDate } from "../../util/DateFormatter";
import Button from "../UI/Button";
import Input from "./Input";

function ExpenseForm({ onSubmit, isUpdating, onCancelHander, defaultValue }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });

  const onChangeTextHandler = (inputID, amountValue) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputID]: { value: amountValue, isValid: true },
    }));
  };
  const onSubmitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    };
    // Some form validation
    const dateResult = DateFormatter(expenseData);
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = dateResult !== "Invalid date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevState) => ({
        amount: { value: prevState.amount.value, isValid: amountIsValid },
        date: { value: prevState.date.value, isValid: dateIsValid },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };
  const formIsValid =
    inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View style={styles.viewRoot}>
      <Text style={styles.textTitle}>
        {isUpdating ? "Update" : "Add"} Expense
      </Text>
      <View style={styles.viewInput}>
        <Input
          invalid={!inputs.amount.isValid}
          label={"Amount"}
          style={styles.rowInput}
          textInputProps={{
            keyboardType: "decimal-pad",
            onChangeText: onChangeTextHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          invalid={!inputs.date.isValid}
          label={"Date"}
          style={styles.rowInput}
          textInputProps={{
            keyboardType: "decimal-pad",
            placeholder: "YYYY-MM-DD",
            onChangeText: onChangeTextHandler,
            maxLength: 10,
            onChangeText: onChangeTextHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label={"Description"}
        textInputProps={{
          onChangeText: () => {},
          multiline: true,
          onChangeText: onChangeTextHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {!formIsValid && <Text style={styles.textError}>Invalid Input</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancelHander} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmitHandler}>
          {isUpdating ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;
const styles = StyleSheet.create({
  viewRoot: {
    marginBottom: 20,
  },
  viewInput: {
    justifyContent: "center",
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  textTitle: {
    color: "white",
    fontSize: 25,
    marginVertical: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    fontWeight: "bold",
    margin: 8,
  },
});
