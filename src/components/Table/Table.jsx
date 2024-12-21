import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Table = ({name, data, navigation, detail}) => {
  return (
    <>
      {name === 'rate'
        ? data.map((box, idx) => (
            <View
              key={idx}
              style={[
                styles.boxWrap,
                idx === 0 && styles.firstChild, // Áp dụng kiểu cho phần tử đầu tiên
                idx > 0 && idx < data.length - 1 && styles.middleChild, // Phần tử giữa
              ]}>
              <Text
                style={[
                  idx === 0 && styles.textKeyRow,
                  idx > 0 && idx < data.length - 1 && styles.textRow,
                ]}>
                {box.key}
              </Text>
              <Text
                style={[
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
              style={styles.boxList}>
              {boxList.boxes.map((box, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.boxWrap,
                    idx === 0 && styles.firstChild, // Áp dụng kiểu cho phần tử đầu tiên
                    idx > 0 &&
                      idx < boxList.boxes.length - 1 &&
                      styles.middleChild, // Phần tử giữa
                  ]}>
                  <Text
                    style={[
                      idx === 0 && styles.textKeyRow,
                      idx > 0 &&
                        idx < boxList.boxes.length - 1 &&
                        styles.textRow,
                    ]}>
                    {box.key}
                  </Text>
                  <Text
                    style={[
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

const styles = StyleSheet.create({
  boxList: {
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,

    // Shadow for iOS
    shadowColor: '#171717', // Màu bóng
    shadowOffset: {width: 0, height: 2}, // Độ lệch bóng
    shadowOpacity: 0.2, // Độ trong suốt
    shadowRadius: 5, // Bán kính làm mờ bóng
    // Shadow for Android
    elevation: 5, // Mức độ nổi
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },

  boxWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },

  firstChild: {
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  middleChild: {
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },

  textKeyRow: {
    fontWeight: 'bold',
  },
  textRow: {
    fontWeight: 'regular',
  },
});
