import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

const Table = ({name, data, navigation, detail}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    boxList: {
      marginVertical: 12,
      borderRadius: 12,
      shadowOffset: {width: 0, height: 2},
      shadowColor: theme.headerShadow,
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      backgroundColor: theme.tableChildBackground,
    },
    boxWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
    },

    firstChild: {
      backgroundColor: theme.tableHeaderBackground,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    middleChild: {
      // borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,
    },

    textKeyRow: {
      fontWeight: 'bold',
    },
    textRow: {
      fontWeight: 'regular',
    },
  });

  return (
    <>
      {name === 'rate'
        ? data.map((box, idx) => (
            <View
              key={idx}
              style={[
                styles.boxWrap,
                {
                  borderBottomColor: theme.tableBorderColor,
                  backgroundColor:
                    idx === 0 ? theme.tableHeaderBackground : theme.tableChildBackground,
                },
                idx === 0 && styles.firstChild,
                idx > 0 && idx < data.length - 1 && styles.middleChild,
              ]}>
              <Text
                style={[
                  {color: theme.text},
                  idx === 0 && styles.textKeyRow,
                  idx > 0 && idx < data.length - 1 && styles.textRow,
                ]}>
                {box.key}
              </Text>
              <Text
                style={[
                  {color: theme.text},
                  idx === 0 && styles.textKeyRow,
                  idx > 0 && idx < data.length - 1 && styles.textRow,
                ]}>
                {box.value}
              </Text>
            </View>
          ))
        : data?.map(boxList => (
            <TouchableOpacity
              onPress={() => navigation.navigate(detail)}
              key={boxList.id}
              style={[styles.boxList, {backgroundColor: theme.background}]}>
              {boxList.boxes.map((box, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.boxWrap,
                    {
                      borderBottomColor: theme.tableBorderColor,
                      backgroundColor:
                        idx === 0
                          ? theme.tableHeaderBackground
                          : theme.tableChildBackground,
                    },
                    idx === 0 && styles.firstChild,
                    idx > 0 &&
                      idx < boxList.boxes.length - 1 &&
                      styles.middleChild,
                  ]}>
                  <Text
                    style={[
                      {color: theme.text},
                      idx === 0 && styles.textKeyRow,
                      idx > 0 &&
                        idx < boxList.boxes.length - 1 &&
                        styles.textRow,
                    ]}>
                    {box.key}
                  </Text>
                  <Text
                    style={[
                      {color: theme.text},
                      idx === 0 && styles.textKeyRow,
                      idx > 0 &&
                        idx < boxList.boxes.length - 1 &&
                        styles.textRow,
                    ]}>
                    {box.value}
                  </Text>
                </View>
              ))}
            </TouchableOpacity>
          ))}
    </>
  );
};

export default Table;
