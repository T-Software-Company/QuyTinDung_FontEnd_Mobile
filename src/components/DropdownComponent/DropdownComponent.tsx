import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';

interface DropdownItem {
  value: string;
  label: string;
  rate?: string;
}

interface DropdownComponentProps<T> {
  data: T[];
  placeholder: string;
  value: string | null;
  onChange: (item: T) => void;
}

const DropdownComponent = <T extends DropdownItem>({
  data,
  placeholder,
  value,
  onChange,
}: DropdownComponentProps<T>) => {
  const renderItem = (item: T) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown<T>
      style={styles.textInput}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.dropDownContainer} // Changed from dropDownContainerStyle
      activeColor="#eaeaea"
      maxHeight={200}
      value={value}
      data={data}
      valueField="value"
      labelField="label"
      placeholder={placeholder}
      searchPlaceholder="Search..."
      onChange={onChange}
      renderItem={renderItem}
    />
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
    borderRadius: 999,
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },

  iconStyle: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },

  dropDownContainer: {
    backgroundColor: '#fff',
  },
});
