import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

const Home = ({navigation}) => {
  const [hide, setHide] = useState(true);
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.containHeading}>
          <TouchableOpacity style={styles.borderAvatar} onPress={() => navigation.navigate("InfoPerson")}>
            <Image
              source={require('../../assets/images/avatar.jpg')}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 16, gap: 8}}>
            <Text>Chào bạn,</Text>
            <Text style={styles.heading}>Nguyễn Văn A</Text>
          </View>
          <TouchableOpacity style={styles.borderArrow} onPress={() => navigation.navigate("Notification")}>
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
                <Text>Tổng tài sản</Text>

                <TouchableOpacity style={styles.wrapOption} onPress={() => setHide(!hide)}>
                  {hide ? (
                    <>
                      <Image
                        style={styles.icon}
                        source={require('../../assets/images/eyes-icon.png')}
                      />
                      <Text>Hiện</Text>
                    </>
                  ) : (
                    <>
                      <Image
                        style={styles.iconClose}
                        source={require('../../assets/images/eyesclose-icon.png')}
                      />
                      <Text>Ẩn</Text>
                    </>
                  )}
                </TouchableOpacity>

                
              </View>

              <View style={styles.wrapMoney}>
                <View style={styles.handleMoney}>
                  <View>
                    {/* <Text style={styles.money}>100.100.000 đ</Text> */}
                    {hide ? (
                      <Text style={styles.money}>*** *** ***</Text>
                    ) : (
                      <Text style={styles.money}>100.100.000 đ</Text>
                    )}
                  </View>
                  <View style={styles.borderArrowHandle}>
                    <Image
                      // style={{width: 16, height: 16}}
                      source={require('../../assets/images/arrow-right.png')}
                    />
                  </View>
                </View>
                {/* <Text style={styles.profit}>+100.000 đ</Text> */}
                {hide ? (
                  <Text style={styles.hide}>*** ***</Text>
                ) : (
                  <Text style={styles.profit}>+100.000 đ</Text>
                )}
              </View>
            </View>

            <View style={styles.wrapFunction}>
              <View style={styles.wrapButton}>
                <View style={styles.borderButton}>
                  <Image
                    source={require('../../assets/images/sent-icon.png')}
                  />
                </View>
                <Text>Chuyển tiền</Text>
              </View>
              <View style={styles.wrapButton}>
                <TouchableOpacity style={styles.borderButton} onPress={() => navigation.navigate("SentSave")}>
                  <Image
                    source={require('../../assets/images/save-sent-icon.png')}
                  />
                </TouchableOpacity>
                <Text>Gửi tiết kiệm</Text>
              </View>
              <View style={styles.wrapButton}>
                <View style={styles.borderButton}>
                  <Image
                    source={require('../../assets/images/loan-icon.png')}
                  />
                </View>
                <Text>Tạo khoản vay</Text>
              </View>
              <View style={styles.wrapButton}>
                <View style={styles.borderButton}>
                  <Image
                    source={require('../../assets/images/loan-icon.png')}
                  />
                </View>
                <Text>Chuyển tiền</Text>
              </View>
            </View>

            <View style={styles.product}>
              <Text style={styles.headingTitle}>Sản phẩm vay</Text>

              <View style={styles.wrapProduct}>
                <View style={styles.boxProduct}>
                  <Text style={styles.headerProduct}>Vay phục vụ đời sống</Text>
                  <Text style={styles.descriptionProduct}>
                    Là khoản vay để thanh toán các chi phí cho mục đích tiêu
                    dùng, sinh hoạt của cá nhân, gia đình.
                  </Text>
                </View>

                <View style={styles.boxProduct}>
                  <Text style={styles.headerProduct}>Vay phục vụ đời sống</Text>
                  <Text style={styles.descriptionProduct}>
                    Là khoản vay để thanh toán các chi phí cho mục đích tiêu
                    dùng, sinh hoạt của cá nhân, gia đình.
                  </Text>
                </View>

                <View style={styles.boxProduct}>
                  <Text style={styles.headerProduct}>Vay phục vụ đời sống</Text>
                  <Text style={styles.descriptionProduct}>
                    Là khoản vay để thanh toán các chi phí cho mục đích tiêu
                    dùng, sinh hoạt của cá nhân, gia đình.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.questions}>
              <Text style={styles.headingTitle}>Bạn cần hỗ trợ gì?</Text>

              <View style={styles.wrapBox}>
                <View style={styles.boxContent}>
                  <View>
                    <Image
                    style={styles.imgQuestion}
                      source={require('../../assets/images/add-icon.png')}
                    />
                  </View>
                  <Text style={styles.textQuestion}>
                    Hướng dẫn nạp/rút tiền
                  </Text>
                </View>

                <View style={styles.boxContent}>
                  <View>
                    <Image
                      source={require('../../assets/images/message-icon.png')}
                    />
                  </View>
                  <Text>Chat với nhân viên</Text>
                </View>

                <View style={styles.boxContent}>
                  <View>
                    <Image
                      source={require('../../assets/images/add-icon.png')}
                    />
                  </View>
                  <Text>Hướng dẫn nạp/rút tiền</Text>
                </View>
              </View>
            </View>
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
  containHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 8,
    backgroundColor: "white",

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e1e2d',
  },
  borderAvatar: {
    width: 50,
    height: 50,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
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
    paddingBottom: 20
  },
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
    color: 'green',
  },
  hide: {
    color: '#1e1e2d',
  },

  wrapFunction: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'centere',
  },
  borderButton: {
    width: 54,
    height: 54,
    borderRadius: 9999,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  product: {
    marginTop: 32,
  },
  headingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  wrapProduct: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 16,
  },
  boxProduct: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#f4f4f4',
  },
  headerProduct: {
    fontWeight: 'bold',
  },
  descriptionProduct: {
    lineHeight: 22,
  },
  questions: {
    marginTop: 32,
  },
  wrapBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
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
    flexWrap: "nowrap"
  },
  imgQuestion: {
    
  },
  textQuestion: {
    flexGrow: 1
  },
});
