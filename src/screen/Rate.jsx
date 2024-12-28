import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header/Header';
import Table from '../components/Table/Table';
import SelectedTabs from '../components/SelectedTabs/SelectedTabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const Rate = ({navigation}) => {
  const {t} = useTranslation();
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState('saving');

  const tabs = [
    {key: 'saving', label: `${t("rate.tabSave")}`},
    {key: 'loan', label: `${t("rate.tabLoan")}`},
  ];

  const loanRates = [
    {key: `${t("rate.term")}`, value: `${t("rate.rate")}`},
    {key: `1 ${t("rate.month")}`, value: '12%'},
    {key: `3 ${t("rate.month")}`, value: '12%'},
    {key: `6 ${t("rate.month")}`, value: '12%'},
    {key: `9 ${t("rate.month")}`, value: '12%'},
    {key: `12 ${t("rate.month")}`, value: '12%'},
  ];

  const saveRates = [
    {key: `${t("rate.term")}`, value: `${t("rate.rate")}`},
    {key: `7 ${t("rate.day")}`, value: '0.2%'},
    {key: `14 ${t("rate.day")}`, value: '0.2%'},
    {key: `1 ${t("rate.month")}`, value: '1.6%'},
    {key: `2 ${t("rate.month")}`, value: '1.6%'},
    {key: `3 ${t("rate.month")}`, value: '1.9%'},
    {key: `6 ${t("rate.month")}`, value: '2.9%'},
    {key: `9 ${t("rate.month")}`, value: '2.9%'},
    {key: `12 ${t("rate.month")}`, value: '4.6%'},
    {key: `24 ${t("rate.month")}`, value: '4.8%'},
  ];

  const data = selectedTab === 'saving' ? saveRates : loanRates;

  return (
    <SafeAreaView style={[styles.view, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Rate" />

        {/* Body */}
        <View style={styles.body}>
          <SelectedTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            theme={theme}
          />

          {/* View data */}
          <View style={[styles.boxList, {
            backgroundColor: theme.background,
            shadowColor: theme.headerShadow,
          }]}>
            <Table name="rate" data={data} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Rate;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },

  body: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  boxList: {
    marginVertical: 12,
    borderRadius: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },
});
