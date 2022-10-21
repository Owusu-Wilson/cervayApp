import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";
import InputBar from "../components/InputBar";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CloseTraverseScreen = ({ navigation }) => {
  const [refStation_x, setRefStation_x] = useState("");
  const [refStation_y, setRefStation_y] = useState("");

  const [instrumentStation_x, setInstrumentStation_x] = useState("");
  const [instrumentStation_y, setInstrumentStation_y] = useState("");
 const retrieveData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id);
      if (value !== null) {
        // We have data!!
        return (value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
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
          value={refStation_x}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setRefStation_x(text);
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
          value={refStation_y}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setRefStation_y(text);
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
          value={instrumentStation_x}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setInstrumentStation_x(text);
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
          value={instrumentStation_y}
          dataType="number"
          maxLength={14}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              ///^\d+$/
              setInstrumentStation_y(text);
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
            Number(refStation_x) > 100000000 ||
            Number(instrumentStation_x) > 100000000 ||
            Number(refStation_y) > 100000000 ||
            Number(instrumentStation_y) > 100000000
          ) {
            Alert.alert(
              "Wrong Input",
              "Your coordinates are incorrect. Please recheck!"
            );
          } else {
            navigation.navigate("TraverseEntry", {
              previousTraverseData:retrieveData('traverse_data'),
              bearings: {
                reference_station: { x: refStation_x, y: refStation_y },
                instrument_station: { x: instrumentStation_x, y: instrumentStation_y },
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
