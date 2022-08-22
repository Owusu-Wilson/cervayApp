import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export  const CustomButton = (props) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        button: {
            backgroundColor: (props.type=='outline')?"white":props.color,
            borderColor: (props.type=='outline')?props.color:null, 
            borderWidth: (props.type=='outline')?3:null,
            width: (props.width)?props.width: "70%",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          },
          buttonText: {
            color: (props.type=='outline')?props.color:"white",
            fontWeight: "700",
            fontSize: 20,
          },
    });
    
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onclick} style={styles.button}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

