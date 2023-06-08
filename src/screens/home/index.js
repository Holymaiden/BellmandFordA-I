import {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  RefreshControl,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';

//? Import constants
import colors from '../../constants/color';
import env from '../../../env';

//? Import Data
import dataSlide from '../../assets/data/slide';

//? Import Component
import Recommendation from './component/recomendation';
import Terbaru from './component/terbaru';
import Corousel from './component/corousel';
import Kategori from './component/kategori';

//? Import Icon
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

const Home = ({navigation}) => {
  var platform = Platform.OS === 'android' ? true : false;
  const [location, setLocation] = useState({});
  const [search, setSearch] = useState('');
  const [clickSearch, setClickSearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTerbaru, setDataTerbaru] = useState([]);
  const [dataRecommendation, setDataRecommendation] = useState([]);
  const [kategori, setKategori] = useState([
    {
      id: 1,
      name: 'Wisata Alam',
      icon: 'mountain',
    },
    {
      id: 2,
      name: 'Wisata Air',
      icon: 'umbrella-beach',
    },
    {
      id: 3,
      name: 'Wisata Adat & Budaya',
      icon: 'hiking',
    },
  ]);
  const [locationNow, setLocationNow] = useState({});

  const LebihBanyak = (
    <View
      style={{
        width: wp(50),
        alignSelf: 'center',
        marginTop: hp(2),
        marginBottom: hp(3),
        backgroundColor: colors.blue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(5),
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      }}>
      <Text
        style={{
          fontSize: hp(2),
          color: colors.white,
          textAlignVertical: 'center',
          fontFamily: 'LibreBaskerville-Bold',
        }}>
        Lebih Banyak
      </Text>
    </View>
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setDataTerbaru([]);
    setDataRecommendation([]);
    getDataTerbaru(locationNow.latitude, locationNow.longitude);
    getDataRecommendation();
  };

  const getDataTerbaru = async (lat, long) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${env.API_URL}/wisatas?limit=5&offset=0&lat=${lat}&long=${long}`,
        {
          headers: {
            Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
        },
      );
      setDataTerbaru(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const getDataRecommendation = async () => {
    try {
      const response = await axios.get(`${env.API_URL}/wisatas-populer`, {
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      });
      setDataRecommendation(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const permissionLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This App needs access to your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      } else {
        await Geolocation.requestAuthorization('whenInUse').then(res => {
          if (res === 'granted') {
            console.log('You can use the location');
          } else {
            console.log('Location permission denied');
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      if (res === null) {
        navigation.navigate('Login');
      }
    });

    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('token').then(res => {
        if (res === null) {
          navigation.navigate('Login');
        }
      });
    });

    Geolocation.getCurrentPosition(
      async position => {
        setLocationNow({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getDataTerbaru(position.coords.latitude, position.coords.longitude);
        getDataRecommendation();
      },
      error => {
        if (error.code === 1) permissionLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={8}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
        {/* <Header> */}
        <View style={styles.menuWrapper}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: hp(3),
                color: colors.white,
                textAlignVertical: 'center',
                fontFamily: 'LibreBaskerville-Bold',
                marginLeft: wp(2.7),
              }}>
              Selamat Datang
            </Text>
            {/* <Profile Img> */}
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: hp(1)}}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <View
                  style={{
                    backgroundColor: colors.white,

                    borderRadius: 100,
                    width: wp(13),
                    height: wp(13),
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 3.84,
                    elevation: 5,
                    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
                  }}>
                  <FontAwesome5Icon
                    name="user"
                    size={wp(8)}
                    color={colors.blue}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {/* <Profile Img /> */}
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              width: wp(85),
              marginTop: hp(3),
            }}>
            {/* Search */}
            <View
              style={
                clickSearch != ''
                  ? styles.searchBar__clicked
                  : styles.searchBar__unclicked
              }>
              <Feather
                name="search"
                size={wp(7)}
                color={colors.blue}
                style={{marginLeft: wp(1)}}
              />
              <TextInput
                placeholder="Search"
                value={search}
                onChangeText={text => setSearch(text)}
                onFocus={() => {
                  setClickSearch(true);
                }}
                onBlur={() => setClickSearch(false)}
                style={{
                  fontFamily: 'LibreBaskerville-Regular',
                  marginLeft: 10,
                  width: wp(60),
                  paddingTop: hp(0.5),
                  paddingBottom: hp(0.5),
                  color: colors.blue,
                }}
                onSubmitEditing={() =>
                  navigation.navigate('Wisata', {search: search})
                }
              />
              {clickSearch && (
                <TouchableOpacity
                  onPress={() => {
                    setSearch('');
                    setClickSearch(false);
                  }}>
                  <Feather name="x" size={wp(7)} color={colors.blue} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {/* <Header /> */}
        {/* <Iklan>*/}
        <View style={styles.header}>
          <Corousel data={dataSlide} />
        </View>
        {/* <Iklan /> */}
        {/* <Kategori> */}
        <View style={{marginTop: hp('2%'), flex: 1}}>
          <Text style={styles.recommendationsTitle}>Kategori</Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {kategori.map((item, index) => {
              return (
                <Kategori
                  key={index}
                  item={item}
                  index={index}
                  navigation={navigation}
                  lokasi={locationNow}
                />
              );
            })}
          </View>
        </View>
        {/* </Kategori> */}
        {/* <Recommendation> */}
        <View style={styles.recommendationsWrapper}>
          <Text style={styles.recommendationsTitle}>Rekomendasi</Text>
          <View style={styles.recommendationsItemWrapper}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.blue} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dataRecommendation.map((item, index) => {
                  return (
                    <Recommendation
                      key={index}
                      item={item}
                      index={index}
                      navigation={navigation}
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>
        </View>
        {/* <Recommendation /> */}
        {/* <Terbaru> */}
        <View style={styles.recommendationsWrapper}>
          <Text style={styles.recommendationsTitle}>Terbaru</Text>
          <View
            style={{
              marginHorizontal: hp(2),
              paddingVertical: wp(2),
            }}>
            {/* <Vertical> */}
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={colors.blue}
                style={{marginBottom: hp(2)}}
              />
            ) : (
              dataTerbaru.map((item, index) => {
                return (
                  <Terbaru
                    key={index}
                    item={item}
                    index={index}
                    navigation={navigation}
                  />
                );
              })
            )}
            {/* </Vertical> */}
          </View>
          <View
            style={{
              flex: 1,
            }}>
            {platform ? (
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#fff', false)}
                onPress={() => {
                  navigation.navigate('Wisata', {lokasi: locationNow});
                }}>
                {LebihBanyak}
              </TouchableNativeFeedback>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Wisata', {lokasi: locationNow});
                }}>
                {LebihBanyak}
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* <Terbaru /> */}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    width: wp('100%'),
    height: hp('100%'),
  },
  menuWrapper: {
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('5%'),
    marginBottom: hp('2%'),
    backgroundColor: colors.blue,
    borderBottomLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  recommendation: {
    width: wp('90%'),
    height: hp('20%'),
    justifyContent: 'flex-end',
    paddingHorizontal: wp(1),
    paddingVertical: hp(1.5),
  },
  recommendationsWrapper: {
    marginTop: hp('2%'),
    flex: 1,
  },
  recommendationsTitle: {
    marginHorizontal: hp('2%'),
    fontSize: wp('5%'),
    color: colors.black,
    fontFamily: 'LibreBaskerville-Bold',
  },
  recommendationsItemWrapper: {
    paddingVertical: wp(2),
    marginHorizontal: hp(2),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    width: wp(100),
  },
  searchBar__unclicked: {
    padding: hp(1),
    flexDirection: 'row',
    width: wp(85),
    height: hp(6),
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: hp(1),
    flexDirection: 'row',
    width: wp(85),
    height: hp(6),
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
});
