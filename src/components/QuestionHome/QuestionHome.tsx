import {StyleSheet, Text, View, Image, ImageSourcePropType} from 'react-native';
import React from 'react';

interface Theme {
  backgroundBox: string;
  iconColor: string;
  text: string;
}

interface QuestionHomeProps {
  question: string;
  urlIcon: ImageSourcePropType;
  theme: Theme;
}

const QuestionHome: React.FC<QuestionHomeProps> = ({question, urlIcon, theme}) => {
  return (
    <View style={[styles.boxContent, {backgroundColor: theme.backgroundBox}]}>
      <View>
        <Image style={{tintColor: theme.iconColor}} source={urlIcon} />
      </View>
      <Text style={[styles.textQuestion, {color: theme.text}]}>{question}</Text>
    </View>
  );
};

export default QuestionHome;

const styles = StyleSheet.create({
  boxContent: {
    width: '48%',
    paddingHorizontal: 20,
    paddingVertical: 24,
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
