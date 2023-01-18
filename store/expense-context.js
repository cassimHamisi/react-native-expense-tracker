import { createContext, useReducer } from "react";

// // Lets Create a DUMMY_EXPENSES
// const DUMMY_EXPENSES = [
//   {
//     id: "m1",
//     description: "Break fast",
//     amount: 12.23,
//     date: new Date("2020-01-08"),
//   },
//   {
//     id: "m2",
//     description: "Break Slow",
//     amount: 50.55,
//     date: new Date("2020-11-20"),
//   },
//   {
//     id: "m3",
//     description: "Lunch",
//     amount: 120.05,
//     date: new Date("2021-12-08"),
//   },
//   {
//     id: "m4",
//     description: "Dinner",
//     amount: 100,
//     date: new Date("2022-05-24"),
//   },
//   {
//     id: "m5",
//     description: "Supper One",
//     amount: 30,
//     date: new Date("2020-11-28"),
//   },
//   {
//     id: "m6",
//     description: "Supper Six",
//     amount: 30,
//     date: new Date("2023-01-11"),
//   },
//   {
//     id: "m7",
//     description: "Supper seven",
//     amount: 30,
//     date: new Date("2023-01-14"),
//   },
//   {
//     id: "m8",
//     description: "Supper eight",
//     amount: 30,
//     date: new Date("2023-01-15"),
//   },
//   {
//     id: "m9",
//     description: "Supper nine",
//     amount: 30,
//     date: new Date("2023-01-04"),
//   },
//   {
//     id: "m10",
//     description: "Supper ten",
//     amount: 30,
//     date: new Date("2023-01-12"),
//   },
// ];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (is, { description, amount, date }) => {},
  setExpenses: () => {},
});

const useReducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [{ ...action.payload }, ...state];
    }
    case "DELETE": {
      return state.filter((expense) => expense.id !== action.payload);
    }
    case "SET": {
      const inverted = action.payload.reverse();
      return inverted;
    }
    case "UPDATE": {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
      //   let updatedExpenses = state.map((expense, index) => {
      //     if (index === updatableItemIndex) return action.payload.expenseData;
      //     else return expense;
      //   });
    }
    default: {
      return state;
    }
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [expenseState, dispatchStateFn] = useReducer(useReducerFunction, []);
  const addExpense = (expenseData) => {
    dispatchStateFn({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    // delete dispatch called
    dispatchStateFn({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    // update dispatch called
    dispatchStateFn({
      type: "UPDATE",
      payload: { id: id, expenseData: expenseData },
    });
  };
  // setting expenses from the backend funtion
  function setExpenses(expenses) {
    dispatchStateFn({ type: "SET", payload: expenses });
  }

  value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
