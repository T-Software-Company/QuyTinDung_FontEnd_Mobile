import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductHome = ({header, desc, theme}) => {
  return (
    <View style={[styles.boxProduct, {backgroundColor: theme.backgroundBox}]}>
      <Text style={[styles.headerProduct, {color: theme.text}]}>{header}</Text>
      <Text style={[styles.descriptionProduct, {color: theme.text}]}>
        {desc}
      </Text>
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
