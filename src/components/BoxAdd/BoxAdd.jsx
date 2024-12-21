import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const BoxAdd = ({title, number, navigation, add, addText}) => {
  return (
    <>
      <View style={styles.boxShow}>
        <View style={styles.wrapTitle}>
          <Text style={styles.textWhite}>{title}</Text>
          <View style={styles.wrapMoney}>
            <Text style={[styles.money, styles.textWhite]}>{number}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.wrapOption}
          onPress={() => navigation.navigate(add)}>
          <Image
            style={[styles.iconPrimary, {width: 12, height: 12}]}
            source={require('../../../assets/images/add-icon.png')}
          />
          <Text style={[styles.textPrimary, {fontWeight: 'bold'}]}>
            {addText}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BoxAdd;

const styles = StyleSheet.create({
  boxShow: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapTitle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapOption: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 30,
    paddingVertical: 0,
  },
  wrapMoney: {
    marginTop: 4,
  },

  money: {
    fontSize: 16,
    fontWeight: 'bold',
    // alignItems: "center"
  },
  textWhite: {
    color: 'white',
  },
  textPrimary: {
    color: '#007BFF',
  },
  iconPrimary: {
    tintColor: '#007BFF',
  },
});
