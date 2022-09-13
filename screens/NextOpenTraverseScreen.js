import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";
import InputBar from "../components/InputBar";
import CustomButton from "../components/CustomButton";

const NextOpenTraverseScreen = ({ navigation }) => {
  const [closingX1, setClosingX1] = useState("");
  const [closingY1, setClosingY1] = useState("");

  const [closingX2, setClosingX2] = useState("");
  const [closingY2, setClosingY2] = useState("");

  return (
    <View style={styles.container}>
      {/* <Text style={styles.head}>Open Traverse</Text> */}
      <Text style={styles.secondaryText}>Closing bearing Data</Text>
      <Text style={styles.label}>Foreward Station</Text>
      {/* =========================================== */}
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder=""
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
          placeholder=""
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
          placeholder=""
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
          placeholder=""
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
          navigation.navigate("TraverseEntry");
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
