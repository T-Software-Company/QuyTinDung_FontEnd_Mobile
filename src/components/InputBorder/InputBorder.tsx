import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { AppIcons } from '../../icons';

interface InputBorderProps {
  name: string;
  iconSource: any; // Update this if you have a more specific type for icons
  placeholder: string;
  onSetValue: (value: string) => void;
  value: string;
  theme: {
    noteText: string;
    iconColor: string;
    text: string;
  };
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureVisible?: boolean;
  onPressIcon?: () => void;
  touchEyes?: boolean;
  editable?: boolean;
  textContentType?: string;
  onPress?: () => void;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  notChange?: boolean;
  error?: string;
}

const InputBorder: React.FC<InputBorderProps> = ({
  name,
  iconSource,
  placeholder,
  onSetValue,
  value,
  theme,
  keyboardType,
  secureVisible,
  onPressIcon,
  touchEyes,
  onPress,
  pointerEvents,
  notChange,
}) => {
  const styles = StyleSheet.create({
    heading: {
      fontSize: 14,
      marginBottom: 16,
      color: theme.noteText,
    },
    icon: {
      position: 'absolute',
      left: 0,
      top: 0,
      tintColor: theme.iconColor,
    },
    iconEyes: {
      position: 'absolute',
      right: 0,
    },

    textInput: {
      borderBottomColor: theme.noteText,
      borderBottomWidth: 1,
      height: 32,
      paddingLeft: 40,
      paddingRight: 30,
      paddingBottom: 10,
      color: notChange ? theme.noteText : theme.text,
      paddingVertical: 0,
      textAlignVertical: 'center',
    },
    inputContainer: {
      position: 'relative',
    },
    touchableContainer: {
      width: '100%',
    },
  });

  const inputElement = (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.noteText}
      keyboardType={keyboardType}
      onChangeText={onSetValue}
      secureTextEntry={secureVisible}
      value={value}
      style={styles.textInput}
      autoCapitalize="none"
      editable={!notChange}
      // textContentType={textContentType}
      pointerEvents={pointerEvents}
    />
  );

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{marginBottom: 20}}>
      <Text style={styles.heading}>{name}</Text>
      <View style={styles.inputContainer}>
        <Image source={iconSource} style={styles.icon} />
        {onPress ? (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.touchableContainer}>
            {inputElement}
          </TouchableOpacity>
        ) : (
          inputElement
        )}
        {touchEyes && (
          <TouchableOpacity style={styles.iconEyes} onPress={onPressIcon}>
            {secureVisible ? (
              <Image
                source={AppIcons.eyesOpen}
                style={{tintColor: theme.iconColor}}
              />
            ) : (
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  bottom: Platform.OS === 'ios' ? 4 : 4,
                  paddingVertical: 0,
                  // textAlignVertical: 'center',
                  tintColor: theme.iconColor,
                }}
                source={AppIcons.eyesClose}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputBorder;
