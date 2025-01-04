import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import {AppIcons} from '../../icons';

const FieldInputLogin = ({
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
  editable

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
      color: theme.text,
      paddingVertical: 0,
      textAlignVertical: 'center',
    },
  });

  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.heading}>{name}</Text>
      <View>
        <Image source={iconSource} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.noteText}
          keyboardType={keyboardType}
          onChangeText={onSetValue}
          secureTextEntry={secureVisible}
          value={value}
          style={styles.textInput}
          autoCapitalize="none"
          editable={editable}

        />
        {touchEyes && (
          <TouchableOpacity style={styles.iconEyes} onPress={onPressIcon}>
            {secureVisible ? (
              <Image
                source={AppIcons.eyesOpen}
                style={{tintColor: theme.iconColor}}
              />
            ) : (
              <Image
                style={{
                  bottom: Platform.OS === 'ios' ? 4 : 4,
                  paddingVertical: 0,
                  textAlignVertical: 'center',
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

export default FieldInputLogin;
