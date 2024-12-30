import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import QuestionHome from '../QuestionHome/QuestionHome';
import { useTranslation } from 'react-i18next';
import { AppIcons } from '../../icons';

const WrapQuestionHome = ({name, theme}) => {
  const {t} = useTranslation()
  return (
    <View style={styles.questions}>
      <Text style={[styles.headingTitle, {color: theme.text}]}>{name}</Text>

      <View style={styles.wrapBox}>
        <QuestionHome
          question={t("home.descQuestion1")}
          urlIcon={AppIcons.add}
          theme={theme}
        />

        <QuestionHome
          question={t("home.descQuestion2")}
          urlIcon={AppIcons.message}
          theme={theme}
        />

        <QuestionHome
          question={t("home.descQuestion1")}
          urlIcon={AppIcons.add}
          theme={theme}
        />

        <QuestionHome
          question={t("home.descQuestion2")}
          urlIcon={AppIcons.message}
          theme={theme}
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
