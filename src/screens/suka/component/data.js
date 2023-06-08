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

//? Import constants
import colors from '../../../constants/color';
import env from '../../../../env';

//? Import Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Data = ({item, index, onPressSuka}) => {
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
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: hp(1.7),
                fontFamily: 'LibreBaskerville-Regular',
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
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginRight: wp(1.5),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.pinkHeart,
              width: wp(10),
              height: hp(4),
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onPressSuka(item.id)}>
            <FontAwesome name="heart" size={wp(5)} color={colors.white} />
          </TouchableOpacity>
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
    height: hp('10%'),
    justifyContent: 'flex-end',
  },
});
