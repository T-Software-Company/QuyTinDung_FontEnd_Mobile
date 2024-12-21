import {StyleSheet, TextInput} from 'react-native';
import React from 'react';

const InputBackground = ({value, setValue, placeholder, ...props}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={styles.placeholderTextColor.color}
        onChangeText={setValue}
        value={value}
        style={styles.textInput}
      />
    </>
  );
};

export default InputBackground;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000',
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  placeholderTextColor: {
    color: "#aaa"
  }
});
