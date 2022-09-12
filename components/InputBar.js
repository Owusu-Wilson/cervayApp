import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { Component } from "react";

const GRAY = "#BFBDBD";
const InputBar = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
    },
    textfield: {
      backgroundColor: GRAY,
      color: "black",
      fontSize: 20,
      width: props.width ? props.width : 200,
      height: 50,
      borderRadius: 10,
      padding: 10,
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCorrect
        caretHidden={false}
        disableFullscreenUI={false}
        editable={props.editable}
        placeholder={props.placeholder}
        multiline={props.multiline}
        maxLength={props.maxLength}
        onEndEditing={props.onEndEditing}
        keyboardType={props.dataType == "number" ? "decimal-pad" : "default"}
      />
    </View>
  );
};

class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleInputChange = (text) => {
    if (/^\d+$/.test(amount) || amount === "") {
      this.setState({ amount });
    }
  };

  render() {
    return (
      <TextInput
        keyboardType="numeric"
        onChangeText={this.handleInputChange}
        value={this.state.text}
      />
    );
  }
}

export default InputBar;
