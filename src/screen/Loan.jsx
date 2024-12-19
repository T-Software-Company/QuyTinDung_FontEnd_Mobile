import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Save = ({navigation}) => {
  const [hide, setHide] = useState(true);

  const data = [
    {
      id: 1,
      boxes: [
        {key: 'Số tiền vay', value: '100.000.000 đ'},
        {key: 'Số hợp đồng', value: '123-456-789'},
        {key: 'Ngày đến hạn', value: '22/07/2024'},
      ],
    },
    {
      id: 2,
      boxes: [
        {key: 'Số tiền vay', value: '200.000.000 đ'},
        {key: 'Số hợp đồng', value: '987-654-321'},
        {key: 'Ngày đến hạn', value: '15/08/2024'},
      ],
    },
    {
      id: 3,
      boxes: [
        {key: 'Số tiền vay', value: '300.000.000 đ'},
        {key: 'Số hợp đồng', value: '987-654-321'},
        {key: 'Ngày đến hạn', value: '15/08/2024'},
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}

        <View style={styles.containHeading}>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('CreateLoan')}>
            <Image source={require('../../assets/images/add-icon.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.heading}>Khoản vay</Text>
          </View>
          <TouchableOpacity
            style={styles.borderArrow}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={require('../../assets/images/notification-icon.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Body */}

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.boxShow}>
              <View style={styles.wrapTitle}>
                <Text style={styles.textWhite}>Tổng số tiền vay</Text>
                <View style={styles.wrapMoney}>
                  <Text style={[styles.money, styles.textWhite]}>
                    100.000.000 đ
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.wrapOption}
                onPress={() => navigation.navigate("CreateLoan")}>
                <Image
                  style={[styles.iconPrimary, {width: 12, height: 12}]}
                  source={require('../../assets/images/add-icon.png')}
                />
                <Text style={[styles.textPrimary, {fontWeight: 'bold'}]}>
                  Vay thêm
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.listSaves}>
              <Text style={styles.headingList}>Danh sách khoản vay</Text>

              {data.map(boxList => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('InfoLoan')}
                  key={boxList.id}
                  style={styles.boxList}>
                  {boxList.boxes.map((box, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.boxWrap,
                        idx === 0 && styles.firstChild, // Áp dụng kiểu cho phần tử đầu tiên
                        idx > 0 &&
                          idx < boxList.boxes.length - 1 &&
                          styles.middleChild, // Phần tử giữa
                      ]}>
                      <Text
                        style={[
                          idx === 0 && styles.textKeyRow,
                          idx > 0 &&
                            idx < boxList.boxes.length - 1 &&
                            styles.textRow,
                        ]}>
                        {box.key}
                      </Text>
                      <Text
                        style={[
                          idx === 0 && styles.textKeyRow,
                          idx > 0 &&
                            idx < boxList.boxes.length - 1 &&
                            styles.textRow,
                        ]}>
                        {box.value}
                      </Text>
                    </View>
                  ))}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Save;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '100%',
  },

  containHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e2d',
  },
  borderArrow: {
    width: 42,
    height: 42,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },

  body: {
    marginTop: 32,
    paddingHorizontal: 20,
  },

  boxShow: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapTitle: {
    display: 'flex',
    flexDirection: 'column',
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
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 30,
    paddingVertical: 0,
  },
  wrapMoney: {
    marginTop: 4,
  },

  money: {
    fontSize: 16,
    fontWeight: 'bold',
    // alignItems: "center"
  },
  textWhite: {
    color: 'white',
  },
  textPrimary: {
    color: '#007BFF',
  },
  iconPrimary: {
    tintColor: '#007BFF',
  },

  listSaves: {
    marginTop: 18,
  },
  headingList: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  boxList: {
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,

    // Shadow for iOS
    shadowColor: '#171717', // Màu bóng
    shadowOffset: {width: 0, height: 2}, // Độ lệch bóng
    shadowOpacity: 0.2, // Độ trong suốt
    shadowRadius: 5, // Bán kính làm mờ bóng
    // Shadow for Android
    elevation: 5, // Mức độ nổi
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },

  boxWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },

  firstChild: {
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  middleChild: {
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },

  textKeyRow: {
    fontWeight: 'bold',
  },
  textRow: {
    fontWeight: 'regular',
  },
});
