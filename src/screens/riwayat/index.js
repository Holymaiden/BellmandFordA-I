import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from '../../../env';

//? Import Component
import Data from './component/data';

const Riwayat = ({navigation, route}) => {
  const [search, setSearch] = useState(route.params?.search || '');
  const [clickSearch, setClickSearch] = useState(false);
  const [data, setData] = useState([]);
  const [dataLimit, setDataLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setData([]);
    setDataLimit(6);
    getData();
  };

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;

    if (
      contentOffset.y + layoutMeasurement.height >= contentSize.height &&
      !isLoading
    ) {
      setDataLimit(dataLimit + 6);
      getData();
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('id');
      const response = await axios.get(
        `${env.API_URL}/riwayat?limit=${dataLimit}&search=${search}&user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search, dataLimit]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }>
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
                Riwayat
              </Text>
            </View>
          </View>
          {/* Search */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp(3),
            }}>
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
                }}
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
        {/* </Header> */}
        {/* <Content> */}
        <View
          style={{
            flex: 1,
            width: wp(90),
            alignSelf: 'center',
            marginBottom: hp(2),
          }}>
          {data.map((item, index) => {
            return <Data item={item} index={index} key={index} />;
          })}
        </View>
        {/* </Content> */}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={colors.blue}
            style={{marginBottom: hp(2)}}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Riwayat;

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
