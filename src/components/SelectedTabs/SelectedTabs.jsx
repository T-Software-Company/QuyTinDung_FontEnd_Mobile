import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '../../context/ThemeContext';

const SelectedTabs = ({tabs, selectedTab, onSelectTab}) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    tab: {
      padding: 12,
      backgroundColor: theme.tabBarInactive, // Màu nền khi tab không được chọn
      borderRadius: 10,
      width: '48%',
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: theme.tabBarActive, // Màu nền khi tab được chọn
    },
    tabText: {
      color: theme.textInactive,
      fontWeight: 'bold',
    },
    tabTextActive: {
      color: '#fff',
    },
  });

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
