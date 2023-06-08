import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//? Import constants
import colors from '../../../constants/color';
import env from '../../../../env';

//? Import Icon
import Feather from 'react-native-vector-icons/Feather';

const Terbaru = ({navigation, item, index}) => {
  var platform = Platform.OS === 'android' ? true : false;
  const Card = (
    <View
      style={{
        flex: 1,
        width: wp(90),
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
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
          source={{uri: env.IMAGE_URL + '/' + item.gambar}}
          style={{ width: wp('40%'),
          height: platform ? hp('15%') : hp('13%'),
          justifyContent: 'flex-end',
        }}
          imageStyle={{borderRadius: 20}}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: hp(1.5),
            marginVertical: wp(1),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              {/* Icon Jarak */}
              <Feather name="map-pin" size={wp(5)} color={colors.blue} />
              <Text
                style={{
                  color: colors.black,
                  marginLeft: wp(1),
                  fontFamily: 'LibreBaskerville-Regular',
                }}>
                {item.jarak
                  ? item.jarak.toFixed(2).toString() + ' Km'
                  : item.alamat.substring(0, 10) + '...'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
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
                  : 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginTop: hp(3),
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: hp(1.7),
                fontFamily: 'LibreBaskerville-Regular',
              }}>
              {item.nama.substring(0, 15) + '...'}
            </Text>
            <Text
              style={{
                color: colors.darkGray,
                fontSize: hp(1.5),
                fontFamily: 'LibreBaskerville-Regular',
              }}>
              {item.deskripsi.substring(0, 45) + '...'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Detail', {
            item: item,
          });
        }}
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
        onPress={() => {
          navigation.navigate('Detail', {
            item: item,
          });
        }}
        style={{
          width: wp(90),
          height: hp(17),
        }}>
        {Card}
      </TouchableOpacity>
    );
  }
};

export default Terbaru;

