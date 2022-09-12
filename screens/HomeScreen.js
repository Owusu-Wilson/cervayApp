import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import ActionButton from "../components/ActionButton";
import LargeButton from "../components/LargeButton";

import { colors } from "../colors";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* ======================================= */}
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* <> */}
        <View>
          <Image
            style={styles.coverImage}
            source={{ uri: "https://picsum.photos/500/500?random=211" }}
          />
        </View>
        <View style={styles.profileContainer}>{/* Profile Details */}</View>

        {/* ======================================= */}
        <View style={styles.buttonView}>
          <LargeButton
            type="i"
            iconName="analytics-outline"
            primaryText="Open Traverse"
            secondaryText="Start an open traverse survey"
            onPress={() => {
              navigation.navigate("OpenTraverse");
            }}
          />
          <LargeButton
            type="m"
            iconName="close-box"
            primaryText="Close Traverse"
            secondaryText="Start a close traverse survey"
            onPress={() => {
              navigation.navigate("CloseTraverse");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // marginTop: 10,
    justifyContent: "flex-start",
  },
  coverImage: { height: 200, width: "100%" },
  profileContainer: {
    height: 0,
    backgroundColor: "#fff",
    // marginTop: -100,
    borderTopLeftRadius: 500,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: "center", marginTop: -50 },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },

  buttonView: {
    paddingTop: 80,
  },
});
