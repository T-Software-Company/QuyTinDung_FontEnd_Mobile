import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../context/ThemeContext';

const BoxTotalNav = () => {
  const [hide, setHide] = useState(true);
  const {t} = useTranslation();
  const {theme} = useTheme();

  return (
    <View style={[styles.boxShow, {backgroundColor: theme.backgroundBox}]}>
      <View style={styles.wrapTitle}>
        <Text style={{color: theme.text}}>{t('home.boxTitle')}</Text>

        <TouchableOpacity
          style={styles.wrapOption}
          onPress={() => setHide(!hide)}>
          {hide ? (
            <>
              <Image
                style={[styles.icon, {tintColor: theme.iconColor}]}
                source={require('../../../assets/images/eyes-icon.png')}
              />
              <Text style={{color: theme.text}}>{t('home.showButton')}</Text>
            </>
          ) : (
            <>
              <Image
                style={[styles.iconClose, {tintColor: theme.iconColor}]}
                source={require('../../../assets/images/eyesclose-icon.png')}
              />
              <Text style={{color: theme.text}}>{t('home.hideButton')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.wrapMoney}>
        <View style={styles.handleMoney}>
          <View>
            {/* <Text style={styles.money}>100.100.000 đ</Text> */}
            {hide ? (
              <Text style={[styles.money, {color: theme.text}]}>
                *** *** ***
              </Text>
            ) : (
              <Text style={[styles.money, {color: theme.text}]}>
                100.100.000 đ
              </Text>
            )}
          </View>
          <View style={styles.borderArrowHandle}>
            <Image
              style={{tintColor: theme.iconColor}}
              source={require('../../../assets/images/arrow-right.png')}
            />
          </View>
        </View>
        {/* <Text style={styles.profit}>+100.000 đ</Text> */}
        {hide ? (
          <Text style={[styles.hide, {color: theme.text}]}>*** ***</Text>
        ) : (
          <Text style={{color: theme.profit}}>+100.000 đ</Text>
        )}
      </View>
    </View>
  );
};

export default BoxTotalNav;

const styles = StyleSheet.create({
  boxShow: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  wrapTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 15,
    height: 10,
    resizeMode: 'stretch',
  },
  iconClose: {
    width: 15,
    height: 15,
    resizeMode: 'stretch',
  },
  wrapOption: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapMoney: {
    marginTop: 12,
  },
  handleMoney: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  money: {
    fontSize: 16,
    fontWeight: 'bold',
    // alignItems: "center"
  },
  borderArrowHandle: {
    width: 16,
    height: 16,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  profit: {
    color: '#76FA39',
  },
  hide: {
    color: '#1e1e2d',
  },
});
