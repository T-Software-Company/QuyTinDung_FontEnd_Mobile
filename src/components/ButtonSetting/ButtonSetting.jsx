import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

const ButtonSetting = ({title, icon, onPress, optionText}) => {
  const {theme} = useTheme();
  
  const styles = StyleSheet.create({
    wrapButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 22,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.backgroundBox,
      backgroundColor: theme.background,
    },
    textButton: {
      fontSize: 15,
      color: theme.text,
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
      color: theme.noteText,
    },
  });

  return (
    <>
      <TouchableOpacity style={styles.wrapButton} onPress={onPress}>
        <Text style={styles.textButton}>{title}</Text>
        <View style={styles.wrapText}>
          {optionText && <Text style={styles.textOption}>{optionText}</Text>}
          <View style={styles.wrapIcon}>
            <Image source={icon} style={{tintColor: theme.iconColor}} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ButtonSetting;
