import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";
import InputBar from "../components/InputBar";
import CustomButton from "../components/CustomButton";

const CloseTraverseScreen = ({ navigation }) => {
  const [initialX1, setInitialX1] = useState("");
  const [initialY1, setInitialY1] = useState("");

  const [initialX2, setInitialX2] = useState("");
  const [initialY2, setInitialY2] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Closed Traverse</Text>
      {/* <Text style={styles.secondaryText}>Initial bearing Data</Text> */}
      <Text style={styles.stations_label}>Reference Station</Text>
      {/* =========================================== */}
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={initialX1}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setInitialX1(text);
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
          value={initialY1}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setInitialY1(text);
            } else {
              alert("Only numbers are allowed");
            }
          }}
        />
      </View>
      {/* ====================================== */}
      <Text style={styles.stations_label}>Instrument Station</Text>
      {/* =========================================== */}
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={initialX2}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setInitialX2(text);
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
          value={initialY2}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setInitialY2(text);
            } else {
              alert("Only numbers are allowed");
            }
          }}
        />
      </View>
      {/* ====================================== */}
      {/* <FloatingAction
        color={colors.primaryColor}
        overlayColor="rgba(240, 255, 255, 0.02)"
        floatingIcon={<AntDesign name="back" size={24} color="white" />}
        onPressMain={() => {
          navigation.goBack();
        }}
        onPressItem={(name) => {
          navigation.navigate(name);
        }}
      /> */}

      <CustomButton
        color={colors.primaryColor}
        text={"Next"}
        width={370}
        onclick={() => {
          if (
            Number(initialX1) > 100000000 ||
            Number(initialX2) > 100000000 ||
            Number(initialY1) > 100000000 ||
            Number(initialY2) > 100000000
          ) {
            Alert.alert(
              "Wrong Input",
              "Your coordinates are incorrect. Please recheck!"
            );
          } else {
            navigation.navigate("TraverseEntry", {
              bearings: {
                reference_station: { x: initialX1, y: initialX2 },
                instrument_station: { x: initialY1, y: initialY2 },
              },
            });
          }
        }}
      />
    </View>
  );
};

export default CloseTraverseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    marginTop: 50,
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
    alignItems: "center",
    fontSize: 20,
    alignSelf: "flex-start",
    marginBottom: 30,
    paddingRight: 40,
    paddingTop: 10,
  },
  stations_label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 25,
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 40,
    paddingRight: 40,
  },
  inputField: {
    paddingLeft: 30,
  },
});
