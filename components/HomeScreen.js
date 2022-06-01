import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import NavigationMenu from "./tools/NavigationMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

var mqtt = require("@taoqf/react-native-mqtt");
var options = {
  protocol: "mqtts",
  clientId: "User1",
  // username: "smart",
  // password: "FzSjl27L9Ac9VVlk",
  username: "loreeia",
  password: "OWeIsN2YhInvhO3q",
};

var cont = 0;

export default function HomeScreen({ navigation }) {
  const [current_val, setcurrent] = useState("");
  const [voltage_val, setvoltage_val] = useState("");

  // Real time graph
  const [current_graph, setcurrent_graph] = useState([0]);
  const [label, setlabel] = useState([0]);

  let currentref = useRef("");
  currentref.current = current_val;
  useEffect(() => {
    var client = mqtt.connect("mqtt://loreeia.cloud.shiftr.io", options);
    client.subscribe("Termofijadora01/fase1/#");
    var note;

    client.on("message", function (topic, message) {
      note = message.toString();

      if (topic === "Termofijadora01/fase1/corriente") {
        // console.log("corriente", note);
        cont = cont + 1;
        setlabel((label) => [...label, cont]);
        setcurrent_graph((current_graph) => [...current_graph, note]);

        setcurrent(note);
      } else if (topic === "Termofijadora01/fase1/voltaje") {
        setvoltage_val(note);
        // console.log("voltaje", note);
      }
      // if (currentref.current === "") {
      //   client.end();
      // }
    });
  }, []);

  return (
    <ScrollView>
      <NavigationMenu></NavigationMenu>
      <View style={styles.card_info}>
        <Text style={styles.text_info}>Corriente</Text>
        <Text style={styles.line_separator}></Text>

        <View style={styles.rowcard}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={80}
            color="white"
          />
          <Text style={styles.text_info}>{current_val}</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: label,
          datasets: [
            {
              data: current_graph,
            },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      ></LineChart>
      <View style={styles.card_info}>
        <Text style={styles.text_info}>Voltaje</Text>
        <Text style={styles.line_separator}></Text>

        <View style={styles.rowcard}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={80}
            color="white"
          />
          <Text style={styles.text_info}>{voltage_val}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 30,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  card_info: {
    width: "80%",
    height: 200,
    backgroundColor: "black",
    borderRadius: 20,
    display: "flex",
    marginTop: 150,
  },

  text_info: {
    fontSize: 30,
    color: "white",
  },
  rowcard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 35,
  },
  line_separator: {
    width: "90%",
    height: 2,
    backgroundColor: "white",
  },
  card_info_1: {},
});
