import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';

interface InputBackgroundProps extends Omit<TextInputProps, 'onChangeText'> {
  value: string | undefined;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
}

const InputBackground: React.FC<InputBackgroundProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  ...props
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={styles.placeholderTextColor.color}
      onChangeText={onChangeText}
      value={value ?? ''}
      style={styles.textInput}
      keyboardType={keyboardType}
      {...props}
    />
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
    color: '#aaa',
  },
});
