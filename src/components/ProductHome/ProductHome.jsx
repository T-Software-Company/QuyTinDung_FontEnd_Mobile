import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductHome = ({header, desc}) => {
  return (
    <View style={styles.boxProduct}>
      <Text style={styles.headerProduct}>{header}</Text>
      <Text style={styles.descriptionProduct}>{desc}</Text>
    </View>
  );
};

export default ProductHome;

const styles = StyleSheet.create({
  boxProduct: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#f4f4f4',
  },
  headerProduct: {
    fontWeight: 'bold',
  },
  descriptionProduct: {
    lineHeight: 22,
  },
});
