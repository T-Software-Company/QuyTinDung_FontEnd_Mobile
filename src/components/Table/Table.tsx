import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/RootNavigator';

interface TableBox {
  key: string;
  value: string;
}

interface TableBoxList {
  id: number | string; // Update to handle both number and string IDs
  boxes: TableBox[];
}

interface Theme {
  headerShadow: string;
  tableChildBackground: string;
  tableHeaderBackground: string;
  tableBorderColor: string;
  text: string;
  background: string;
}

type TableName = 'rate' | 'loan' | 'save';

type TableNavigationTarget = {
  rate: never;
  loan: 'InfoLoan';
  save: 'InfoSave';
};

interface TableProps {
  name: TableName;
  data: TableBox[] | TableBoxList[];
  navigation?: StackNavigationProp<RootStackParamList>;
  detail?: TableNavigationTarget[TableName];
}

const Table: React.FC<TableProps> = ({name, data, navigation, detail}) => {
  const {theme} = useTheme() as {theme: Theme};

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

  const handleNavigation = () => {
    if (navigation && detail) {
      navigation.navigate({
        name: detail,
        params: {id: undefined}, // Add required params structure
      });
    }
  };

  return (
    <>
      {name === 'rate'
        ? (data as TableBox[]).map((box, idx) => (
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
        : (data as TableBoxList[]).map(boxList => (
            <TouchableOpacity
              onPress={handleNavigation}
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
