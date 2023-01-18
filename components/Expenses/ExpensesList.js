import { FlatList, StyleSheet, Text } from "react-native";
import Expenseitem from "./ExpenseItem";

function renderItemCallback(itemDta) {
  return <Expenseitem {...itemDta.item} />;
}
function ExpensesList({ expenses }) {
  return (
    <>
      {/* List of Expenses */}
      <FlatList
        data={expenses}
        renderItem={renderItemCallback}
        keyExtractor={(item, index) => item.id}
      />
    </>
  );
}
export default ExpensesList;
const Styles = StyleSheet.create({});
