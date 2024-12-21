import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductHome from '../ProductHome/ProductHome';

const WrapProductHome = ({name}) => {
  return (
    <View style={styles.product}>
      <Text style={styles.headingTitle}>{name}</Text>

      <View style={styles.wrapProduct}>
        <ProductHome
          header="Vay phục vụ đời sống"
          desc="Là khoản vay để thanh toán các chi phí cho mục đích tiêu dùng, sinh hoạt của cá nhân, gia đình."
        />

        <ProductHome
          header="Vay phục vụ đời sống"
          desc="Là khoản vay để thanh toán các chi phí cho mục đích tiêu dùng, sinh hoạt của cá nhân, gia đình."
        />

        <ProductHome
          header="Vay phục vụ đời sống"
          desc="Là khoản vay để thanh toán các chi phí cho mục đích tiêu dùng, sinh hoạt của cá nhân, gia đình."
        />
      </View>
    </View>
  );
};

export default WrapProductHome;

const styles = StyleSheet.create({
  product: {
    marginTop: 20,
  },
  headingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  wrapProduct: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 16,
  },
  
});
