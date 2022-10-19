import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
const ReportScreen = () => {
  const [data, setData] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user_info");
      if (value !== null) {
        // value previously stored
        setData(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.card}>
          <FontAwesome name="user" size={45} color="white" />
          <Text style={styles.username}>{data.name}</Text>
        </View>
        {/* <Text style={styles.label}>Top</Text> */}
      </View>
      <View style={styles.down}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.dataText}>{data.name}</Text>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.dataText}>{data.location}</Text>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.dataText}>{data.date}</Text>
      </View>
      {/* <Text style={styles.label}>Name</Text>
      <Text style={styles.label}>{data.name}</Text>
      <Text style={styles.label}>Location</Text>
      <Text style={styles.label}>{data.location}</Text>
      <Text style={styles.label}>Current Traverse on</Text>
      <Text style={styles.label}>{data.date}</Text>*/}
      {/* <View style={styles.btnContainer}>
        <CustomButton
          style={styles.btn}
          color={colors.primaryColor}
          text={"Generate Report"}
          width={370}
          onclick={() => {}}
        />
      </View> */}
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontSize: 25,
    alignSelf: "flex-start",
  },
  dataText: {
    color: colors.primaryColor,
    fontFamily: "SSRegular",
    fontSize: 25,
    alignSelf: "flex-start",
    paddingBottom: 20,
  },
  username: {
    color: "white",
    fontFamily: "SSBold",
    fontSize: 45,
    alignSelf: "center",
    textAlign: "center",
  },
  btnContainer: {
    // backgroundColor: "yellow",
    flex: 1 / 5,
    marginHorizontal: 20,
    top: "30%",
  },
  btn: {
    height: 60,
  },
  top: {
    flex: 4 / 10,
    // backgroundColor: colors.action/ButtonColor,
    paddingTop: 40,
  },
  down: {
    display: "flex",
    flex: 6 / 10,
    // backgroundColor: "white",
    paddingLeft: 20,
    // borderRadius: 100,
  },
  card: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",

    backgroundColor: colors.primaryColor,
    width: "90%",
    height: "80%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "black",
    elevation: 10,
    shadowOffset: 0.3,
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
});
