import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';

const ButtonShortCut = ({name, urlIcon, styleCustom, onPress}) => {
  return (
    <View style={styles.wrapButton}>
      <TouchableOpacity
        style={styles.borderButton}
        onPress={onPress}>
        <Image
          style={styleCustom}
          source={urlIcon}
        />
      </TouchableOpacity>
      <Text style={styles.textButton}>{name}</Text>
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
