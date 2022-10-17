import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  DatePickerIOSComponent,
  Platform,
} from "react-native";
import {} from "react-native-paper";
import React, { useState } from "react";
import { DatePickerAndroidStatic, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ReinputButton , } from "reinput";
const InfoFormScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const onChange = (event, selectedDate) => {
    const currDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currDate);
    let tempDate = new Date(currDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <Text style={styles.head}>Surveyor Profile</Text>
          <Text style={styles.label}>Name</Text>
          {/*component and styles for Email field */}
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          {/*component and styles for Password field */}
          <Text style={styles.label}>Location</Text>

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Date</Text>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => {
                // Alert.alert("clicked");
                showMode("date");
              }}
            >
              <Fontisto
                name="date"
                style={styles.icon}
                size={25}
                color="white"
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Click the button to add a date"
              editable={false}
              value={text}
              style={styles.dateShowField}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* <Text style={styles.head}>Surveyor Details</Text> */}
      <CustomButton
        style={styles.btn}
        color={colors.primaryColor}
        text="Next"
        width={370}
        onclick={() => {
          storeData("user_info", {
            name: name,
            location: location,
            date: date,
          });
          console.log([name, location, date]);
          navigation.navigate("refStation");
        }}
      />
    </View>
  );
};

export default InfoFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  head: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 50,
  },
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontSize: 25,
    alignSelf: "flex-start",
    // paddingBottom: ,
    paddingTop: 40,
  },
  inputContainer: {
    marginTop: 40,
    width: "80%",
    justifyContent: "center",
    paddingLeft: 20,
  },
  dateShowField: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    height: 50,
    width: 285,
    // marginTop: 5,
    marginLeft: 30,
    elevation: 5,
    color: "black",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    elevation: 5,
    color: "black",
  },
  dateBtn: {
    width: 50,
    height: 50,
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  icon: {},
  btn: {
    marginTop: "50%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // marginBottom: 2,
  },
});
