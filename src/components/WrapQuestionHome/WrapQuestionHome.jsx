import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import QuestionHome from '../QuestionHome/QuestionHome';

const WrapQuestionHome = ({name}) => {
  return (
    <View style={styles.questions}>
      <Text style={styles.headingTitle}>{name}</Text>

      <View style={styles.wrapBox}>
        <QuestionHome
          question="Hướng dẫn nạp/rút tiền"
          urlIcon={require('../../../assets/images/add-icon.png')}
        />

        <QuestionHome
          question="Chat với nhân viên"
          urlIcon={require('../../../assets/images/message-icon.png')}
        />

        <QuestionHome
          question="Hướng dẫn nạp/rút tiền"
          urlIcon={require('../../../assets/images/add-icon.png')}
        />

        <QuestionHome
          question="Chat với nhân viên"
          urlIcon={require('../../../assets/images/message-icon.png')}
        />
      </View>
    </View>
  );
};

export default WrapQuestionHome;

const styles = StyleSheet.create({
  questions: {
    marginTop: 32,
  },
  headingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  wrapBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  
});
