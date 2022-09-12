import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
/**
 * Custom Call to Large Button
 */
function LargeButton(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      marginTop: 10,
      justifyContent: "center",
    },
    right: {
      alignItems: "flex-end",
      width: "70%",
      backgroundColor: "#ffffff00",
    },
    left: {
      alignItems: "flex-start",
      width: "30%",
      backgroundColor: "#ffffff00",
    },

    card: {
      flexDirection: "row",
      height: 150,
      backgroundColor: props.bg ? props.bg : "#180829",
      elevation: 10,
      width: props.width ? props.width : "70%",
      marginHorizontal: 4,
      marginBottom: 20,
      padding: 15,
      borderRadius: 10,
      shadowColor: "black",
      shadowOpacity: 1,
      alignSelf: "center",
      alignItems: "center",
      alignContent: "center",
    },
    label: {
      // fontWeight: '700',
      fontFamily: "SSBold",
      fontSize: 20,
      marginTop: 5,
      color: "white",
      position: "relative",
      alignContent: "flex-start",
      alignSelf: "flex-start",
      marginBottom: 20,
      paddingLeft: 20,
    },
    helper: {
      fontSize: 13,
      color: "white",
      alignContent: "flex-start",
      alignSelf: "flex-start",
      paddingLeft: 20,
      // backgroundColor: `${Colors.colors.primary}`,
    },
  });

  return (
    <TouchableOpacity
      onPress={
        // alert("Forms to create")
        props.onPress
      }
      style={styles.card}
    >
      <View style={styles.left}>
        {props.type == "m" ? (
          <MaterialCommunityIcons
            name={props.iconName}
            size={70}
            color="white"
          />
        ) : props.type == "mi" ? (
          <MaterialIcons name={props.iconName} size={70} color="white" />
        ) : props.type == "i" ? (
          <Ionicons name={props.iconName} size={70} color="white" />
        ) : props.type == "f" ? (
          <FontAwesome5 name={props.iconName} size={70} color="white" />
        ) : (
          <AntDesign name={props.iconName} size={70} color="white" />
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.label}>{props.primaryText}</Text>
        <Text style={styles.helper}>{props.secondaryText}</Text>
      </View>
    </TouchableOpacity>
  );
}
// ====================================================================

export default LargeButton;
