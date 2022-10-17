import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = require("../assets/landing.png");

const HomeScreen = ({ route, navigation }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (AsyncStorage.getAllKeys().length) {
      setShow(true);
    }
  });
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* <Text style={styles.head}>Inside</Text> */}
        <View style={styles.btnContainer}>
          {!show && (
            <CustomButton
              // style={styles.btn}
              color={colors.primaryColor}
              text={"View Previous Works"}
              width={370}
              onclick={() => {
                navigation.navigate("PreviousTraverse");
              }}
            />
          )}
          <CustomButton
            style={styles.btn}
            color={colors.primaryColor}
            text={"Start New"}
            width={370}
            onclick={() => {
              navigation.navigate("HomeStack");
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#202020",
  },
  head: {
    color: colors.secondaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
    // paddingLeft: 20,
    marginBottom: 10,
  },
  btnContainer: {
    // backgroundColor: "yellow",
    flex: 1 / 5,
    marginHorizontal: 20,
    top: "30%",
  },
  btn: {
    // marginTop: "50%",
  },
});
