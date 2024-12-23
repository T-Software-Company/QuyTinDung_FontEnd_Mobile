import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductHome from '../ProductHome/ProductHome';
import { useTranslation } from 'react-i18next';

const WrapProductHome = ({name}) => {
  const {t} = useTranslation()
  return (
    <View style={styles.product}>
      <Text style={styles.headingTitle}>{name}</Text>

      <View style={styles.wrapProduct}>
        <ProductHome
          header={t("home.titleLoanProduct")}
          desc={t("home.descLoanProduct")}
          
        />

        <ProductHome
          header={t("home.titleLoanProduct")}
          desc={t("home.descLoanProduct")}
          
        />

        <ProductHome
          header={t("home.titleLoanProduct")}
          desc={t("home.descLoanProduct")}
          
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
