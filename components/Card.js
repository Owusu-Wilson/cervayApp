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

import { colors } from "../colors";
/**
 * Custom Call to Large Button
 */
function Card(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      marginTop: 10,
      justifyContent: "center",
    },
    left: {
      alignItems: "flex-end",
      width: "80%",
      backgroundColor: "#ffffff00",
    },
    right: {
      alignItems: "flex-start",
      width: "20%",
      backgroundColor: "#ffffff00",
    },

    card: {
      flexDirection: "row",
      height: 100,
      backgroundColor: props.bg ? props.bg : colors.primaryColor,
      elevation: 5,
      width: props.width ? props.width : "70%",
      marginHorizontal: 2,
      marginBottom: 20,
      padding: 10,
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
        <Text style={styles.label}>{props.primaryText}</Text>
        <Text style={styles.helper}>{props.secondaryText}</Text>
      </View>
      <View style={styles.right}>
        {props.type == "m" ? (
          <MaterialCommunityIcons
            name={props.iconName}
            size={70}
            color="white"
          />
        ) : props.type == "mi" ? (
          <MaterialIcons
            name={props.iconName}
            size={props.iconSize}
            color="white"
          />
        ) : props.type == "i" ? (
          <Ionicons name={props.iconName} size={props.iconSize} color="white" />
        ) : props.type == "f" ? (
          <FontAwesome5
            name={props.iconName}
            size={props.iconSize}
            color="white"
          />
        ) : (
          <AntDesign
            name={props.iconName}
            size={props.iconSize}
            color="white"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
// ====================================================================

export { Card };
