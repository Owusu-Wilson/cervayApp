import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../colors";

const TempTraverseScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.head}>TempTraverseScreen</Text>
      </SafeAreaView>
    </View>
  );
};

export default TempTraverseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // marginTop: 10,
    justifyContent: "flex-start",
  },
  head: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 30,
    alignSelf: "flex-start",
  },

  label: {
    color: "black",
    fontFamily: "SSRegular",
    fontSize: 25,
    // alignSelf: "flex-start",
  },
});
