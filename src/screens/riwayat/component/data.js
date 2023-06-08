import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//? Import constants
import colors from '../../../constants/color';
import env from '../../../../env';

//? Import Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Data = ({item, index}) => {
  const [rating, setRating] = useState(item.star);

  const handleRating = value => {
    if (item.star == 0) {
      setRating(value);
      onPressRating(value);
    }
  };

  const onPressRating = async value => {
    let token = await AsyncStorage.getItem('token');

    axios.put(
      `${env.API_URL}/riwayat/${item.id}`,
      {
        star: value + 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  const Card = (
    <View
      style={{
        flex: 1,
        width: wp(90),
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        marginTop: index == 0 ? 0 : hp(2),
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: hp(1),
          marginVertical: wp(2),
        }}>
        <ImageBackground
          source={{uri: env.IMAGE_URL + '/' + item.wisata.gambar}}
          style={styles.recommendation}
          imageStyle={{borderRadius: 20}}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: hp(1.5),
            marginVertical: wp(1),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: hp(1.7),
              fontFamily: 'LibreBaskerville-Regular',
              marginVertical: hp(1),
            }}>
            {item.wisata.nama}
          </Text>
          <Text
            style={{
              color: colors.darkGray,
              fontSize: hp(1.5),
              fontFamily: 'LibreBaskerville-Regular',
            }}>
            {item.wisata.deskripsi.substring(0, 50) + '...'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp(1),
            }}>
            <TouchableOpacity onPress={() => handleRating(1)}>
              <FontAwesome
                name={rating >= 1 ? 'star' : 'star-o'}
                size={hp(3)}
                color="#FFD700"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRating(2)}>
              <FontAwesome
                name={rating >= 2 ? 'star' : 'star-o'}
                size={hp(3)}
                color="#FFD700"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRating(3)}>
              <FontAwesome
                name={rating >= 3 ? 'star' : 'star-o'}
                size={hp(3)}
                color="#FFD700"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRating(4)}>
              <FontAwesome
                name={rating >= 4 ? 'star' : 'star-o'}
                size={hp(3)}
                color="#FFD700"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRating(5)}>
              <FontAwesome
                name={rating >= 5 ? 'star' : 'star-o'}
                size={hp(3)}
                color="#FFD700"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        onPress={() => {}}
        useForeground={true}
        background={TouchableNativeFeedback.Ripple('#fff', false)}
        style={{
          width: wp(90),
          height: hp(17),
        }}>
        {Card}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.8}
        style={{
          width: wp(90),
          height: hp(17),
        }}>
        {Card}
      </TouchableOpacity>
    );
  }
};

export default Data;

const styles = StyleSheet.create({
  recommendation: {
    width: wp('30%'),
    height: hp('15%'),
    justifyContent: 'flex-end',
  },
});
