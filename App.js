import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import GlobalStyles from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpenseContextProvider from "./store/expense-context";
import ExpenseForm from "./components/manageExpense/ExpenseForm";
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: {
          backgroundColor: GlobalStyles.colors.accent500,
        },
        headerRight: ({ tintColor, size }) => (
          <IconButton
            icon="add"
            size={40}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recents",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass" />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <ExpenseContextProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ExpenseOverView"
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpenseOverView"
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManageExpenses"
            component={ManageExpenses}
            options={() => ({ presentation: "modal" })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
