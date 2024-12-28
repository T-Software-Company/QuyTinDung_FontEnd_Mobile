import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';

const ButtonShortCut = ({name, urlIcon, styleCustom, onPress, theme}) => {
  return (
    <View style={styles.wrapButton}>
      <TouchableOpacity
        style={[styles.borderButton, {backgroundColor: theme.backgroundIcon}]}
        onPress={onPress}>
        <Image
          style={[styleCustom, {tintColor: theme.iconColor}]}
          source={urlIcon}
        />
      </TouchableOpacity>
      <Text style={[styles.textButton, {color: theme.text}]}>{name}</Text>
    </View>
  );
};

export default ButtonShortCut;

const styles = StyleSheet.create({
  wrapButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  borderButton: {
    width: 54,
    height: 54,
    borderRadius: 9999,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  textButton: {
    textAlign: 'center',
  },
});
