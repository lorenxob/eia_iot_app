import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationMenu from "./components/tools/NavigationMenu";
import HomeScreen from "./components/HomeScreen";
import MachinesScreen from "./components/MachinesScreen";
import DevicesScreen from "./components/DevicesScreen";
import GraphScreen from "./components/GraphScreen";
import ControlScreen from "./components/ControlScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="machines" component={MachinesScreen}></Stack.Screen>
        <Stack.Screen name="devices" component={DevicesScreen}></Stack.Screen>
        <Stack.Screen name="graph" component={GraphScreen}></Stack.Screen>
        <Stack.Screen name="control" component={ControlScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
