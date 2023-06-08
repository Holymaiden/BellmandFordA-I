import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import {useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../../../env';
import Alert from '../../constants/alert';

const Login = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [modalState, setModalState] = useState({
    visible: false,
    title: '',
    message: '',
    logo: Alert.ERROR,
  });

  const handleFocus = i => {
    setIsFocus({...isFocus, [i]: true});
  };
  const handleBlur = i => {
    setIsFocus({...isFocus, [i]: false});
  };

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleReset = () => {
    setData({
      email: '',
      password: '',
    });
  };

  const handleModal = (visible, title, message, logo) => {
    setModalState({
      visible: visible,
      title: title,
      message: message,
      logo: logo,
    });
  };

  const validateForm = () => {
    if (data.email === '' || data.password === '') {
      handleModal(
        true,
        'Terjadi Error',
        'Data tidak boleh kosong',
        Alert.ERROR,
      );
    } else if (data.email.indexOf('@') === -1) {
      handleModal(true, 'Terjadi Error', 'Email tidak valid', Alert.ERROR);
    } else {
      loginPress();
    }
  };

  const loginPress = async () => {
    axios
      .post(`${env.API_URL}/login`, {
        email: data.email.toLowerCase(),
        password: data.password,
      })
      .then(async res => {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('id', res.data.user.id.toString());
        handleReset();
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        handleModal(
          true,
          'Terjadi Error',
          'Email atau password salah',
          Alert.ERROR,
        );
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      if (res !== null) {
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Header> */}
        <View style={styles.menuWrapper}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: hp(4),
                color: colors.white,
                fontFamily: 'LibreBaskerville-Bold',
              }}>
              Login
            </Text>
            <Text
              style={{
                fontSize: hp(2),
                color: colors.white,
                fontFamily: 'LibreBaskerville-Regular',
                marginTop: hp(1),
              }}>
              Hi, Welcome Back
            </Text>
          </View>
        </View>
        {/* </Header> */}
        {/* <Body> */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <Avatar.Image
            size={wp('40%')}
            source={require('../../assets/images/login.png')}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: hp(2),
            width: wp(80),
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View style={{width: wp(80), marginTop: hp(2)}}>
            <Text
              style={{
                fontFamily: 'LibreBaskerville-Bold',
                color: colors.black,
                fontSize: hp(2),
              }}>
              Email
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: isFocus.email ? colors.blue : colors.gray,
                backgroundColor: colors.white,
                borderRadius: 12,
                fontSize: hp(2),
                fontFamily: 'LibreBaskerville-Regular',
                height: hp(6),
                marginTop: hp(1),
                paddingHorizontal: wp(3),
                paddingVertical: hp(0.5),
              }}
              selectionColor={colors.blue}
              onChange={e => setData({...data, email: e.nativeEvent.text})}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              value={data.email}
              placeholder="Enter your email"
              placeholderTextColor={colors.black}
              keyboardType="email-address"
            />
          </View>
          <View style={{width: wp(80), marginTop: hp(2)}}>
            <Text
              style={{
                fontFamily: 'LibreBaskerville-Bold',
                color: colors.black,
                fontSize: hp(2),
              }}>
              Password
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: isFocus.password ? colors.blue : colors.gray,
                backgroundColor: colors.white,
                borderRadius: 12,
                fontSize: hp(2),
                fontFamily: 'LibreBaskerville-Regular',
                height: hp(6),
                marginTop: hp(1),
                paddingHorizontal: wp(3),
                paddingVertical: hp(0.5),
              }}
              selectionColor={colors.blue}
              onChange={e => setData({...data, password: e.nativeEvent.text})}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              value={data.password}
              placeholder="Enter your password"
              secureTextEntry={!isVisible}
              placeholderTextColor={colors.black}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: wp(5),
                top: hp(5.5),
              }}
              onPress={() => handleVisible()}>
              <Feather
                name={isVisible ? 'eye' : 'eye-off'}
                size={hp(2.5)}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.blue,
                width: wp(80),
                height: hp(6),
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: hp(4),
              }}
              onPress={() => validateForm()}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: hp(2),
                  fontFamily: 'LibreBaskerville-Regular',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginTop: hp(2),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'LibreBaskerville-Regular',
                  color: colors.black,
                }}>
                Don't have an account?
              </Text>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'LibreBaskerville-Regular',
                  color: colors.blue,
                  marginLeft: wp(1),
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </Body> */}
        {/* <Modal> */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalState.visible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: 30,
                width: wp(70),
                height: hp(45),
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: hp(4),
              }}>
              <View>
                <Image
                  source={modalState.logo}
                  style={{
                    width: wp(30),
                    height: hp(15),
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View
                style={{
                  width: wp(60),
                  alignItems: 'center',
                  marginVertical: hp(3),
                }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'LibreBaskerville-Bold',
                    color: colors.black,
                  }}>
                  {modalState.title}
                </Text>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'LibreBaskerville-Regular',
                    color: colors.black,
                    marginTop: hp(1),
                  }}>
                  {modalState.message}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.error,
                  width: wp(40),
                  height: hp(6),
                  paddingHorizontal: wp(5),
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalState({
                    ...modalState,
                    visible: false,
                  });
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: hp(2),
                    fontFamily: 'LibreBaskerville-Regular',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* </Modal> */}
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: colors.white,
  },
  menuWrapper: {
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('5%'),
    marginBottom: hp('2%'),
    backgroundColor: colors.blue,
    borderBottomLeftRadius: 40,
    height: hp(22.5),
    alignItems: 'center',
  },
});
