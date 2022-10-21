import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import { colors } from "../colors";
import { generateExcel } from "../api/handleExport";
const ExportScreen = () => {
 const data =  [
    ["Odd", "Even", "Total"],
    [1, 2, { t: "n", v: 3, f: "A2+B2" }],
    [3, 4, { t: "n", v: 7, f: "A3+B3" }],
    [5, 6, { t: "n", v: 10, f: "A4+B4" }],
  ];
  return (
    <View style={styles.container}>
      <LargeButton
        type="m"
        primaryText="Export Adjustments"
        secondaryText="Get only adjustment results"
        iconName="file"
        width="80%"
        onPress = {()=>{
          // alert("clicked")
          generateExcel(data)
        }}
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
