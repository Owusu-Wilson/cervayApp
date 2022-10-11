import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import { colors } from "../colors";

const ExportScreen = () => {
  return (
    <View style={styles.container}>
      <LargeButton
        type="m"
        primaryText="Export Adjustments"
        secondaryText="Get only adjustment results"
        iconName="file"
        width="80%"
      />
    </View>
  );
};

export default ExportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});
