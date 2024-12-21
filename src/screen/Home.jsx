import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../components/Header/Header';
import ButtonShortCut from '../components/ButtonShortCut/ButtonShortCut';
import WrapProductHome from '../components/WrapProductHome/WrapProductHome';
import WrapQuestionHome from '../components/WrapQuestionHome/WrapQuestionHome';
import BoxTotalNav from '../components/BoxTotalNav/BoxTotalNav';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <Header Navbar="Home" navigation={navigation} />

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <BoxTotalNav />

            <View style={styles.wrapFunction}>
              <ButtonShortCut
                name="Nạp tiền"
                urlIcon={require('../../assets/images/sent-icon.png')}
                styleCustom={{transform: [{rotate: '-90deg'}]}}
                onPress={() => Alert.alert('Thông báo', 'Comming soon!')}
              />
              <ButtonShortCut
                name="Rút tiền"
                urlIcon={require('../../assets/images/sent-icon.png')}
                styleCustom={{transform: [{rotate: '90deg'}]}}
                onPress={() => Alert.alert('Thông báo', 'Comming soon!')}
              />
              <ButtonShortCut
                name="Gửi tiết kiệm"
                urlIcon={require('../../assets/images/save-sent-icon.png')}
                onPress={() => navigation.navigate('SentSave')}
              />
              <ButtonShortCut
                name="Tạo khoản vay"
                urlIcon={require('../../assets/images/loan-icon.png')}
                onPress={() => navigation.navigate('CreateLoan')}
              />
            </View>

            {/* Product Home */}
            <WrapProductHome name="Sản phẩm vay" />

            {/* Question Home */}
            <WrapQuestionHome name="Bạn cần hỗ trợ gì?" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
  },

  body: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  wrapFunction: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexShrink: 1,
    height: 'auto',
    flexWrap: 'wrap',
  },
});
