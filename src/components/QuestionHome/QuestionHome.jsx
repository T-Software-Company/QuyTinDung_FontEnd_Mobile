import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const QuestionHome = ({question, urlIcon}) => {
  return (
    <View style={styles.boxContent}>
      <View>
        <Image
          style={styles.imgQuestion}
          source={urlIcon}
        />
      </View>
      <Text style={styles.textQuestion}>{question}</Text>
    </View>
  );
};

export default QuestionHome;

const styles = StyleSheet.create({
  boxContent: {
    width: '48%',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 20,
    flexWrap: 'nowrap',
  },
  imgQuestion: {},
  textQuestion: {
    flexGrow: 1,
  },
});
