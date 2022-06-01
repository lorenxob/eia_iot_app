import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { NavigationContext } from "@react-navigation/native";

import {
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
} from "@expo/vector-icons";

export default function NavigationMenu() {
  const navigation = useContext(NavigationContext);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("home")}>
        <Entypo style={styles.icon} name="home" size={30} color="white" />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("machines")}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="factory"
          size={30}
          color="white"
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("devices")}>
        <AntDesign
          style={styles.icon}
          name="pluscircle"
          size={30}
          color="white"
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("graph")}>
        <Foundation
          style={styles.icon}
          name="graph-bar"
          size={30}
          color="white"
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("control")}>
        <Entypo
          style={styles.icon}
          name="game-controller"
          size={30}
          color="white"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    height: 80,
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    marginTop: 20,
  },
});
