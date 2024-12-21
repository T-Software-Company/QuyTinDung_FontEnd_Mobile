import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const SelectedTabs = ({tabs, selectedTab, onSelectTab}) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, selectedTab === tab.key && styles.activeTab]}
          onPress={() => onSelectTab(tab.key)}>
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.key && styles.tabTextActive,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectedTabs;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007BFF', // Màu nền khi tab được chọn
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
  },
});
