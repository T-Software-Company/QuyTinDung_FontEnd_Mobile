import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';

const DropdownComponent = ({data, placeholder, value, onChange}) => {
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <Dropdown
        style={styles.textInput}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        dropDownContainerStyle={styles.dropDownContainer} // Custom khoảng cách và box
        maxHeight={200}
        value={value}
        data={data}
        valueField="value"
        labelField="label"
        imageField="false"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        onChange={onChange}
        renderItem={renderItem}
      />
    </>
  );
};

export default DropdownComponent;

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

  placeholderStyle: {
    color: '#aaa',
    fontSize: 14,
  },

  selectedTextStyle: {
    color: '#000',
    fontSize: 14,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 999
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
});
