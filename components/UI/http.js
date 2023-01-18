import axios from "axios";

const DEFAULTURL = `https://expensetracker-native-default-rtdb.firebaseio.com/`;

// Sending Http request
async function sendHttpRequest(expenseData) {
  const response = await axios.post(DEFAULTURL + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

// fetching http requests
export async function fetchHttpRequest() {
  const response = await axios.get(DEFAULTURL + "expenses.json");
  const expenses = [];
  if (response) {
    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: response.data[key].date,
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
  }
  return expenses;
}

export default sendHttpRequest;

export function updateExpense(id, expenseData) {
  return axios.put(DEFAULTURL + `expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  console.log("deleting id", id);
  return axios.delete(DEFAULTURL + `expenses/${id}.json`);
}
