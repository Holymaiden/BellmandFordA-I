import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import env from '../../../env';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detail = ({navigation, route}) => {
  const {item} = route.params;

  const [sukaId, setSukaId] = useState(0);
  const [suka, setSuka] = useState(item.suka_count);
  const [statusSuka, setStatusSuka] = useState(false);

  const onPressSuka = async () => {
    let token = await AsyncStorage.getItem('token');

    if (statusSuka) {
      setSuka(suka - 1);
      setStatusSuka(false);

      axios.delete(`${env.API_URL}/suka/${sukaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      setSuka(parseInt(suka) + 1);
      setStatusSuka(true);

      axios
        .post(
          `${env.API_URL}/suka`,
          {
            user_id: await AsyncStorage.getItem('id'),
            wisata_id: item.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          setSukaId(res.data.id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getSuka = async () => {
    let user_id = await AsyncStorage.getItem('id');
    let token = await AsyncStorage.getItem('token');
    axios
      .get(`${env.API_URL}/suka/user?id=${item.id}&user_id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.data.length > 0) {
          setStatusSuka(true);
          setSukaId(res.data[0].id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSuka();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Header> */}
        <View style={styles.menuWrapper}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(1),
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                left: 0,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather
                  name="arrow-left"
                  size={hp(3)}
                  color={colors.white}
                  style={{marginLeft: wp(2.7)}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: hp(2.5),
                  color: colors.white,
                  textAlignVertical: 'center',
                  fontFamily: 'LibreBaskerville-Bold',
                }}>
                {item.nama}
              </Text>
            </View>
          </View>
        </View>
        {/* </Header> */}
        {/* <Gambar> */}
        <View
          style={{
            width: wp(90),
            alignSelf: 'center',
            marginTop: hp(-10),
            paddingRight: wp(5),
            backgroundColor: colors.white,
            borderRadius: 20,
            elevation: 5,
            overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
            marginBottom: hp(2),
          }}>
          <ImageBackground
            source={{uri: env.IMAGE_URL + '/' + item.gambar}}
            style={{
              height: hp(25),
              justifyContent: 'flex-end',
              paddingHorizontal: wp(1),
              paddingVertical: hp(1.5),
            }}
            imageStyle={{
              borderRadius: 20,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
          {/* Content */}
          <View
            style={{
              paddingHorizontal: wp(5),
              marginTop: hp(3),
            }}>
            <View>
              <Text
                style={{
                  fontSize: hp(2.5),
                  color: colors.black,
                  fontFamily: 'LibreBaskerville-Bold',
                }}>
                {item.nama}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(2),
                }}>
                <Feather name="map-pin" size={wp(5)} color={colors.blue} />
                <Text
                  style={{
                    fontSize: hp(2),
                    color: colors.black,
                    fontFamily: 'LibreBaskerville-Regular',
                    marginLeft: wp(2),
                  }}>
                  {item.alamat}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp(2)}}>
                <Feather name="heart" size={wp(5)} color={colors.pinkHeart} />
                <Text
                  style={{
                    color: colors.black,
                    marginLeft: wp(1),
                    fontFamily: 'LibreBaskerville-Regular',
                  }}>
                  {suka} Suka
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp(2)}}>
                {/* Icon Rating */}
                <Feather name="star" size={wp(5)} color={colors.yellowStar} />
                <Text
                  style={{
                    color: colors.black,
                    marginLeft: wp(1),
                    fontFamily: 'LibreBaskerville-Regular',
                  }}>
                  {item.riwayat_avg_star != null
                    ? parseFloat(item.riwayat_avg_star).toFixed(1)
                    : 0}{' '}
                  Rating
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp(2)}}>
                {/* Icon Rating */}
                <Feather
                  name="database"
                  size={wp(5)}
                  color={colors.yellowStar}
                />
                <Text
                  style={{
                    color: colors.black,
                    marginLeft: wp(1),
                    fontFamily: 'LibreBaskerville-Regular',
                  }}>
                  Rp.{' '}
                  {item.harga != null
                    ? Intl.NumberFormat('id-ID').format(item.harga)
                    : 0}
                </Text>
              </View>
            </View>
          </View>
          {/* Content */}
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              marginVertical: wp(5),
              marginLeft: wp(5),
              marginRight: wp(2),
            }}
          />
          {/* Content 2 */}
          <View
            style={{
              marginLeft: wp(5),
              marginRight: wp(2),
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: hp(2),
                color: colors.black,
                fontFamily: 'LibreBaskerville-Bold',
                textAlign: 'justify',
              }}>
              Fasilitas :
            </Text>
            <Text
              style={{
                fontSize: hp(2),
                color: colors.black,
                fontFamily: 'LibreBaskerville-Regular',
                textAlign: 'justify',
                marginTop: hp(1),
              }}>
              {item.fasilitas != null ? item.fasilitas : 'Tidak ada fasilitas'}
            </Text>
          </View>
          {/* Content 2 */}
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#ccc',
              marginVertical: wp(5),
              marginLeft: wp(5),
              marginRight: wp(2),
            }}
          />
          {/* Content 3 */}
          <View
            style={{
              marginLeft: wp(5),
              marginRight: wp(2),
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: hp(2),
                color: colors.black,
                fontFamily: 'LibreBaskerville-Bold',
                textAlign: 'justify',
              }}>
              Deskripsi :
            </Text>
            <Text
              style={{
                fontSize: hp(2),
                color: colors.black,
                fontFamily: 'LibreBaskerville-Regular',
                textAlign: 'justify',
                marginTop: hp(1),
              }}>
              {item.deskripsi}
            </Text>
          </View>
          {/* Content 3 */}
          {/* Button Map and Like */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: hp(2),
              paddingHorizontal: wp(5),
              bottom: 0,
              flex: 1,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.blue,
                width: wp(60),
                height: hp(6),
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => navigation.navigate('Map', {item: item})}>
              <Feather name="map-pin" size={wp(5)} color={colors.white} />
              <Text
                style={{
                  color: colors.white,
                  fontSize: hp(2),
                  fontFamily: 'LibreBaskerville-Regular',
                  marginLeft: wp(2),
                }}>
                Lihat Peta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.pinkHeart,
                width: wp(15),
                marginLeft: wp(5),
                height: hp(6),
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onPressSuka()}>
              <FontAwesome
                name="heart"
                size={wp(5)}
                color={statusSuka ? colors.white : colors.dray}
              />
            </TouchableOpacity>
          </View>
          {/* Button Map and Like */}
        </View>
        {/* </Gambar> */}
      </ScrollView>
    </View>
  );
};

export default Detail;

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
    flex: 1,
    height: hp(22.5),
  },
});
