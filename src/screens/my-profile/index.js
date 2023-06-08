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
import {Avatar} from 'react-native-paper';
import {useState} from 'react';
import env from '../../../env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../constants/alert';

const MyProfile = ({navigation, route}) => {
  const [data, setData] = useState(
    route.params?.data || {
      name: '',
      email: '',
      password: '',
    },
  );
  const [isFocus, setIsFocus] = useState({
    name: false,
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

  const handleModal = (visible, title, message, logo) => {
    setModalState({
      visible: visible,
      title: title,
      message: message,
      logo: logo,
    });
  };

  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    axios
      .put(`${env.API_URL}/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        handleModal(true, 'Success', 'Data Berhasil Diubah', Alert.SUCCESS);
      })
      .catch(err => {
        handleModal(true, 'Error', 'Data Gagal Diubah', Alert.ERROR);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Header> */}
        <View style={styles.menuWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather
                  name="arrow-left"
                  size={hp(3)}
                  color={colors.white}
                  style={{marginLeft: wp(2.7)}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: hp(2.5),
                  color: colors.white,
                  textAlignVertical: 'center',
                  fontFamily: 'LibreBaskerville-Bold',
                  marginLeft: wp(-10),
                }}>
                My Profile
              </Text>
            </View>
          </View>
        </View>
        {/* </Header> */}
        {/* <Foto Profile> */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(1),
          }}>
          <Avatar.Image
            size={wp('30%')}
            source={require('../../assets/images/login.png')}
          />
          <Text
            style={{
              fontFamily: 'LibreBaskerville-Bold',
              color: colors.black,
              fontSize: hp(2.5),
              marginTop: hp(2),
            }}>
            {data.name}
          </Text>
        </View>
        {/* </Foto Profile> */}
        {/* <Input> */}
        <View
          style={{
            marginTop: hp(5),
            flex: 1,
            width: wp('80%'),
            height: hp('35%'),
            alignSelf: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: hp(1),
            }}>
            <View style={{width: wp(80), marginTop: hp(2)}}>
              <Text
                style={{
                  fontFamily: 'LibreBaskerville-Bold',
                  color: colors.black,
                  fontSize: hp(2),
                }}>
                Full Name
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: isFocus.name ? colors.blue : 'transparent',
                  backgroundColor: isFocus.name
                    ? colors.white
                    : colors.lightGray,
                  borderRadius: 12,
                  fontSize: hp(2),
                  fontFamily: 'LibreBaskerville-Regular',
                  height: hp(6),
                  marginTop: hp(1),
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(0.5),
                }}
                selectionColor={colors.blue}
                onChange={e => setData({...data, name: e.nativeEvent.text})}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                value={data.name}
              />
            </View>
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
                  borderWidth: 1,
                  borderColor: isFocus.email ? colors.blue : 'transparent',
                  backgroundColor: isFocus.email
                    ? colors.white
                    : colors.lightGray,
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
                  borderWidth: 1,
                  borderColor: isFocus.password ? colors.blue : 'transparent',
                  backgroundColor: isFocus.password
                    ? colors.white
                    : colors.lightGray,
                  borderRadius: 12,
                  fontSize: hp(2),
                  fontFamily: 'LibreBaskerville-Regular',
                  height: hp(6),
                  width: wp(80),
                  marginTop: hp(1),
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(0.5),
                }}
                selectionColor={colors.blue}
                onChange={e => setData({...data, password: e.nativeEvent.text})}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                value={data.password}
                secureTextEntry={!isVisible}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: wp(5),
                  top: hp(5),
                }}
                onPress={() => handleVisible()}>
                <Feather
                  name={isVisible ? 'eye' : 'eye-off'}
                  size={hp(2.5)}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </Input> */}
        {/* <Update> */}
        <View
          style={{
            flex: 1,
            // position: 'absolute',
            width: wp('100%'),
            height: hp('14%'),
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleSave();
            }}>
            <View
              style={{
                backgroundColor: colors.blue,
                width: wp('80%'),
                height: hp('5%'),
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'LibreBaskerville-Regular',
                  color: colors.white,
                  fontSize: hp(2.5),
                }}>
                Update Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* </Update> */}
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
                  backgroundColor: colors.success,
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
                  navigation.navigate('Home');
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

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
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
    flex: 1,
    height: hp(22.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
