import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";

const ProfileScreen = () => {
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
    <View>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.label}>{data.name}</Text>
      <Text style={styles.label}>Location</Text>
      <Text style={styles.label}>{data.location}</Text>
      <Text style={styles.label}>Current Traverse on</Text>
      <Text style={styles.label}>{data.date}</Text>
      <View style={styles.btnContainer}>
        <CustomButton
          style={styles.btn}
          color={colors.primaryColor}
          text={"Generate Report"}
          width={370}
          onclick={() => {}}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontSize: 25,
    alignSelf: "flex-start",
    // paddingBottom: ,
    paddingTop: 40,
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
});
