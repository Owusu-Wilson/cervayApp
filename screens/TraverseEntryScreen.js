import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import InputBar from "../components/InputBar";
import { addData, getData } from "./dbfunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import { dms_to_degrees, degrees_to_dms, toRadians } from "../api/computations";
import { formatBearing } from "../api/functions";
import moment from "moment/moment";
// import {} from  ''
// import fs from "fs/promises"

const TraverseEntryScreen = ({ route, navigation }) => {
  const { initial_bearing, closing_bearing } = route.params;
  /**
   * These variables are hooks that help to keep
   *  track of certain values within the screen of the app.
   */
  const [station, setStation] = useState("");
  let [traverseCount, setTraverseCount] = useState(1);
  const [traverseData, setTraverseData] = useState([]);
  const [description_1, setDescription_1] = useState("");
  const [description_2, setDescription_2] = useState("");
  const [bearingLL1, setBearingLL1] = useState("");
  const [bearingLL2, setBearingLL2] = useState("");
  const [bearingRR1, setBearingRR1] = useState("");
  const [bearingRR2, setBearingRR2] = useState("");
  const [dropdownValue, setValue] = useState(null); //Set to the id of the current dropdown item
  const [distance1, setDistance1] = useState(""); //Set to the id of the current dropdown item
  const [distance2, setDistance2] = useState(""); //Set to the id of the current dropdown item

  /**
   *
   * Computations of the mean are held in this variable to be further processed
   * with the _*formatBearing*_ function
   * to put it in the right format.
   */
  const mean_val =
    dms_to_degrees(bearingLL1) -
    dms_to_degrees(bearingRR2) / dms_to_degrees(bearingLL2) -
    dms_to_degrees(bearingRR1);
  /**
   * An object of all the data received from the input fields.
   * This is to help in transporting the data across other pages and indexing the data
   */
  const dataPayload = {
    id: traverseCount,
    traverseStation: station,
    distance: (distance1 + distance2) / 2,
    desc_1: description_1,
    desc_2: description_2,

    bearings: {
      LL1: bearingLL1,
      LL2: bearingLL2,
      RR1: bearingRR1,
      RR2: bearingRR2,
    },
    mean: formatBearing(degrees_to_dms(mean_val).toString()),
  };
  /**
   * Clears all the input field except the station name
   */
  function clearFields() {
    setDescription_1("");
    setDescription_2("");
    setBearingLL1("");
    setBearingLL2("");
    setBearingRR1("");
    setBearingRR2("");
    setDistance1("");
    setDistance2("");
  }
  let traverseArray = [];
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      const storedTraverses = await AsyncStorage.getItem("traverse_data");
      if (storedTraverses !== null) {
        traverseArray = JSON.parse(storedTraverses);
        // await AsyncStorage.setItem(key, jsonValue)
      }
      traverseArray.push(dataPayload);
      await AsyncStorage.setItem(
        "traverse_data",
        JSON.stringify(traverseArray)
      );
    } catch (e) {
      // saving error
    }
  };

  /**
   * Event handler for the Done button
   */
  function handleDone() {
    if (traverseCount == 1) {
      Alert.alert(
        "Empty Traverse",
        "You have not entered any traverse sheets. You cannot continue with computations"
      );
    } else {
      storeData();
      navigation.navigate("TraverseAction", {
        initial_bearing: initial_bearing,
        closing_bearing: closing_bearing,
        tableData: traverseData,
        // the above data is sent to the TravesreActionScreen to be parsed further to the Traverse Table
        // and Export screens.
      });
    }
  }

  /**
   * Function to update the data after it is selected from the dropdown.
   * An event handler for the update button
   */
  function updateItem() {
    const objIndex = traverseData.findIndex((obj) => obj.id == dropdownValue);
    traverseData[objIndex] = dataPayload;
    Alert.alert(
      "Operation Successful",
      `${traverseData[objIndex]["traverseStation"]} updated successfully`
    );
  }
  /**
   * Handles the event press of Next button.
   * Performs a lot of checks to make sure the input is in the right format.
   * Station should not be empty or be a duplicate of another that already exists
   */
  function next() {
    // the station entry cannot be left empty.
    if (station == "") {
      Alert.alert("Empty station", "Please Fill out the Station value");
    }
    // condition to check for duplicate stations in the station list
    //  to avoid multiple traverse sheets with the same station name
    if (
      traverseData.find((element) => {
        return element.traverseStation == station;
      })
    ) {
      Alert.alert(
        "Duplicate",
        "A field with the same station already exists.Click on update"
      );
    } else {
      // condition to make sure that the data RR,LL...  are in the needed forms
      // These check for the 3 different parts of the bearing received.
      // It also test for the first value !> 360.
      // i.e. False will be thrown if bearingRR1.split(".")[0] > 360
      // Also, we check if the distance1 field is empty or not
      if (
        bearingLL1.split(".").length < 3 ||
        bearingLL1.split(".")[0] > 360 ||
        bearingLL2.split(".").length < 3 ||
        bearingLL2.split(".")[0] > 360 ||
        bearingRR1.split(".").length < 3 ||
        bearingRR1.split(".")[0] > 360 ||
        bearingRR2.split(".").length < 3 ||
        bearingRR2.split(".")[0] > 360 ||
        distance1 == ""
      ) {
        Alert.alert(
          "Invalid Input",
          "Your bearings are not in the right form. Please check your values"
        );
      } else {
        traverseData.push(dataPayload);
        setTraverseCount(traverseCount + 1);

        setStation("");
        clearFields();
      }
    }
  }

  /**
   *
   * @param {*} item represents the item selected.
   */
  function dropdownItem(item) {
    // setValue(item.value);
    console.log(item);
    setValue(item.id);
    setStation(item.traverseStation);
    setDescription_1(item.desc_1);
    setDescription_2(item.desc_2);
    setBearingLL1(item.bearings.LL1);
    setBearingLL2(item.bearings.LL2);
    setBearingRR1(item.bearings.RR1);
    setBearingRR2(item.bearings.RR2);
    setDistace(item.distance1);
  }

  return (
    <View style={styles.container}>
      {/* row for the text and dropdown */}
      <View style={styles.row}>
        <Text style={styles.head}>Traverse</Text>
        {/* <AntDesign style={styles.topIcon} name="infocirlce" size={30} /> */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={traverseData}
          search
          maxHeight={300}
          labelField="traverseStation"
          valueField="id"
          placeholder="Select Traverse"
          searchPlaceholder="Search..."
          value={dropdownValue}
          onChange={dropdownItem}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="search1"
              size={25}
            />
          )}
        />
      </View>

      <Text style={styles.label}>Instrument Station</Text>
      <InputBar
        style={styles.stationField}
        placeholder="Instrument station"
        value={station}
        onChangeText={(text) => setStation(text)}
        width={350}
      />
      <Text style={styles.warningInfo}>Use dot (.) as a seperator</Text>

      <View style={styles.row}>
        <InputBar
          style={styles.desc}
          placeholder="Back Station"
          value={description_1}
          multiline={true}
          onChangeText={(text) => setDescription_1(text)}
        />
        {/* <Text style={styles.inlineLabel}>LL </Text> */}
        <InputBar
          style={styles.bearingField}
          placeholder="000.00.00"
          dataType="number"
          maxLength={11}
          value={bearingLL1}
          onEndEditing={(text) => {
            text;
          }}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              setBearingLL1(text);
            } else {
              alert("Only numbers are allowed");
            }
          }} //set LL1
        />
      </View>
      {/* Row 2 - Foresite a*/}
      <View style={styles.row}>
        <InputBar
          style={styles.desc}
          placeholder="Forward Station"
          value={description_2}
          multiline={true}
          onChangeText={(text) => setDescription_2(text)}
        />
        {/* <Text style={styles.inlineLabel}>LL </Text> */}
        <InputBar
          style={styles.bearingField}
          placeholder="000.00.00"
          dataType="number"
          maxLength={11}
          value={bearingLL2}
          onEndEditing={(text) => {
            text;
          }}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              setBearingLL2(text);
            } else {
              alert("Only numbers are allowed");
            }
          }} //SET LL2
        />
      </View>
      {/* Row 3 - foresite b */}
      <View style={styles.row}>
        <InputBar
          style={styles.desc}
          placeholder="Forward Station"
          value={description_2}
          multiline={true}
          editable={false}
        />
        {/* <Text style={styles.inlineLabel}>RR </Text> */}
        <InputBar
          style={styles.bearingField}
          placeholder="000.00.00"
          dataType="number"
          maxLength={11}
          value={bearingRR1}
          onEndEditing={(text) => {
            text;
          }}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              setBearingRR1(text);
            } else {
              alert("Only numbers are allowed");
            }
          }} //SET RR1
        />
      </View>
      {/* Row 4  - backsite b*/}
      <View style={styles.row}>
        <InputBar
          style={styles.desc}
          placeholder="Back Station"
          value={description_1}
          multiline={true}
          editable={false}
        />
        {/* <Text style={styles.inlineLabel}>RR </Text> */}
        <InputBar
          setDistace
          style={styles.bearingField}
          placeholder="000.00.00"
          dataType="number"
          maxLength={11}
          value={bearingRR2}
          onEndEditing={(text) => {
            text;
          }}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              setBearingRR2(text);
            } else {
              alert("Only numbers are allowed");
            }
          }} //SET RR2
        />
      </View>
      <Text style={styles.distanceLabel}>{"Distance (Ft)"}</Text>
      <View style={styles.row}>
        <InputBar
          style={styles.distanceField}
          placeholder="1. xxx.xxx"
          value={distance1}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              setDistance1(text);
            } else {
              alert("Only numbers are allowed");
            }
            7;
          }}
          width={200}
        />
        <InputBar
          style={styles.distanceField}
          placeholder="2. xxx.xxx"
          value={distance2}
          onChangeText={(text) => {
            if (/[0-9.]/.test(text) || text === "") {
              setDistance2(text);
            } else {
              alert("Only numbers are allowed");
            }
            7;
          }}
          width={200}
        />
      </View>
      {/* ================================================================= */}
      <View style={styles.buttonsTab}>
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Clear All"}
          width="80%"
          onclick={clearFields}
        />
        {/* butotn to update a traverse sheet when the user selects from the dropdown */}
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Update"}
          width="80%"
          onclick={updateItem}
        />
        {/* the next button */}
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Next"}
          width="80%"
          onclick={next}
        />
      </View>

      {/* Button to navigate to the next screen after all traverse data is inputted */}
      <CustomButton
        color={colors.primaryColor}
        text={"Done"}
        width={370}
        onclick={handleDone}
      />
    </View>
  );
};

export default TraverseEntryScreen;

/**
 * Styles object for the styles properties of the various components
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // marginBottom: 2,
  },
  dropdown: {
    flex: 1,
    margin: 16,
    height: 50,
    width: "30%",
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
    marginLeft: 50,
    alignSelf: "flex-end",
  },
  counterRow: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  stationField: {
    alignSelf: "flex-start",
  },
  distanceField: {
    alignSelf: "flex-start",
  },

  desc: {
    flex: 1 / 5,
    // color: "black",
    // fontFamily: "SSBold",
    // fontSize: 25,
    alignSelf: "center",
    alignItems: "center",
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
    fontFamily: "SSBold",
    fontSize: 25,
    fontWeight: "500",
  },

  warningInfo: {
    color: "red",
    fontFamily: "SSRegular",
    fontSize: 20,
    alignSelf: "flex-end",
    paddingRight: 40,
    paddingBottom: 5,
  },
  distanceLabel: {
    color: "black",
    fontFamily: "SSBold",
    fontSize: 25,
    fontWeight: "500",
  },

  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  bearingField: { flex: 2 / 5 },
  buttonsTab: {
    flexDirection: "row",
    alignContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 1,
    marginHorizontal: 1,
    // marginTop: 20,
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: colors.secondaryColor,
    marginTop: 5,
    borderColor: colors.primaryColor,
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: colors.primaryColor,
    fontWeight: "700",
    fontSize: 16,
  },
  topIcon: {
    alignSelf: "center",
    left: 200,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
