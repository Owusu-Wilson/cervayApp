import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";
import InputBar from "../components/InputBar";
import CustomButton from "../components/CustomButton";

const NextOpenTraverseScreen = ({ route, navigation }) => {
  const { initial_bearing } = route.params;

  const [closingX1, setClosingX1] = useState("");
  const [closingY1, setClosingY1] = useState("");

  const [closingX2, setClosingX2] = useState("");
  const [closingY2, setClosingY2] = useState("");

  return (
    <View style={styles.container}>
      {/* <Text style={styles.head}>Open Traverse</Text> */}
      <Text style={styles.secondaryText}>Closing bearing Data</Text>
      <Text style={styles.label}>Forward Station</Text>
      {/* =========================================== */}
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={closingX1}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setClosingX1(text);
            } else {
              alert("Only numbers are allowed");
            }
          }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Y Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={closingY1}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setClosingY1(text);
            } else {
              alert("Only numbers are allowed");
            }
          }}
        />
      </View>
      {/* ====================================== */}
      <Text style={styles.closingPillarLabel}>Instrument Station</Text>
      {/* =========================================== */}
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={closingX2}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setClosingX2(text);
            } else {
              alert("Only numbers are allowed");
            }
          }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Y Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={closingY2}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setClosingY2(text);
            } else {
              alert("Only numbers are allowed");
            }
          }}
        />
      </View>
      {/* ====================================== */}
      <FloatingAction
        color={colors.primaryColor}
        overlayColor="rgba(240, 255, 255, 0.02)"
        floatingIcon={<AntDesign name="back" size={24} color="white" />}
        onPressMain={() => {
          navigation.goBack();
        }}
        onPressItem={(name) => {
          navigation.navigate(name);
        }}
      />

      <CustomButton
        color={colors.primaryColor}
        text={"Next"}
        width={370}
        onclick={() => {
          if (
            closingX1 == "" ||
            closingX2 == "" ||
            closingY1 == "" ||
            closingY2 == ""
          ) {
            Alert.alert("Oops!!!", "Fields cannot be left empty.");
          } else {
            if (
              Number(closingX1) > 10000 ||
              Number(closingX2) > 10000 ||
              Number(closingY1) > 10000 ||
              Number(closingY2) > 10000
            ) {
              Alert.alert(
                "Wrong Input",
                "Your values should not be greater than 360°"
              );
            } else {
              console.log(initial_bearing);
              navigation.navigate("TraverseEntry", {
                initial_bearing: initial_bearing,
                closing_bearing: [closingX1, closingX2, closingY1, closingY2],
              });
            }
          }
        }}
      />
    </View>
  );
};

export default NextOpenTraverseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    padding: 20,
  },
  head: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
    // paddingLeft: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // paddingVertical: 20,
  },
  secondaryText: {
    color: colors.primaryColor,
    fontFamily: "SSRegular",
    // fontWeight: "700",
    fontSize: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "flex-start",
    marginBottom: 30,
    paddingRight: 40,
  },
  closingPillarLabel: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 40,
    paddingRight: 40,
  },
  inputField: {
    paddingLeft: 30,
  },
});
