import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

/**
 * Custom Call to Action Button
 */
function ActionButton(props) {
  return (
    <TouchableOpacity
      {...props}
      onPress={props.eventHandler}
      disabled={props.disabled}
      style={{
        height: 70,
        padding: 15,
        paddingHorizontal: 80,
        marginTop: 20,
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: props.bg,
      }}
    >
      <Text
        style={{
          paddingRight: 10,
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text>
      <AntDesign name={props.icon} size={24} color={props.iconColor} />
      {/* <AntDesign name='' size={24} color={props.iconColor} /> */}
    </TouchableOpacity>
  );
}

export default ActionButton;
