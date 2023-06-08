import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import axios from 'axios';
import env from '../../../env';

const Profile = ({navigation}) => {
  const [data, setData] = useState({});
  const logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('id');
    navigation.navigate('Login');
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      const response = await axios.get(`${env.API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
                Profile
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
            marginTop: hp(3),
          }}>
          <Avatar.Image
            size={wp('40%')}
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
        {/* <Menu> */}
        <View
          style={{
            marginTop: hp(5),
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'LibreBaskerville-Bold',
                color: colors.black,
                fontSize: hp(2),
                marginLeft: wp(5),
              }}>
              Account Overview
            </Text>
          </View>
          {/* <My Profile> */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(2),
              marginLeft: wp(5),
            }}
            onPress={() => {
              navigation.navigate('MyProfile', {data});
            }}>
            <View
              style={{
                backgroundColor: colors.blue,
                width: wp(10),
                height: hp(5),
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.3,
              }}>
              <Feather
                name="user"
                size={hp(2.5)}
                color={colors.blue2}
                style={{opacity: 1}}
              />
            </View>
            <Text
              style={{
                fontFamily: 'LibreBaskerville-Bold',
                color: colors.black,
                fontSize: hp(2),
                marginLeft: wp(5),
              }}>
              My Profile
            </Text>
          </TouchableOpacity>
          {/* </My Profile> */}
          {/* <Suka> */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(2),
              marginLeft: wp(5),
            }}
            onPress={() => {
              navigation.navigate('Suka');
            }}>
            <View
              style={{
                backgroundColor: colors.blue,
                width: wp(10),
                height: hp(5),
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.3,
              }}>
              <Feather
                name="heart"
                size={hp(2.5)}
                color={colors.blue2}
                style={{opacity: 1}}
              />
            </View>
            <Text
              style={{
                fontFamily: 'LibreBaskerville-Bold',
                color: colors.black,
                fontSize: hp(2),
                marginLeft: wp(5),
              }}>
              Suka
            </Text>
          </TouchableOpacity>
          {/* </Suka> */}
          {/* <Riwayat> */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(2),
              marginLeft: wp(5),
            }}
            onPress={() => {
              navigation.navigate('Riwayat');
            }}>
            <View
              style={{
                backgroundColor: colors.blue,
                width: wp(10),
                height: hp(5),
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.3,
              }}>
              <Feather
                name="map-pin"
                size={hp(2.5)}
                color={colors.blue2}
                style={{opacity: 1}}
              />
            </View>
            <Text
              style={{
                fontFamily: 'LibreBaskerville-Bold',
                color: colors.black,
                fontSize: hp(2),
                marginLeft: wp(5),
              }}>
              Riwayat
            </Text>
          </TouchableOpacity>
          {/* </Riwayat> */}
        </View>
        {/* </Menu> */}
        {/* <Logout> */}
        {/* i want this in bottom */}
        <View
          style={{
            flex: 1,
            // position: 'absolute',
            width: wp('100%'),
            height: hp('18%'),
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              logout();
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
                  fontFamily: 'LibreBaskerville-Bold',
                  color: colors.white,
                  fontSize: hp(2),
                }}>
                Keluar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* </Logout> */}
      </ScrollView>
    </View>
  );
};

export default Profile;

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
