import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const ButtonSetting = ({onPress, title, icon, optionText}) => {
  return (
    <>
      <TouchableOpacity style={styles.wrapButton} onPress={onPress}>
        <Text style={styles.textButton}>{title}</Text>
        <View style={styles.wrapText}>
          {optionText && <Text style={styles.textOption}>{optionText}</Text>}
          <View style={styles.wrapIcon}>
            <Image source={icon} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ButtonSetting;

const styles = StyleSheet.create({
  wrapButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  textButton: {
    fontSize: 15,
    color: '#1e1e2d',
  },
  wrapText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  textOption: {
    fontSize: 14,
    color: '#a2a2a7',
  },
});
