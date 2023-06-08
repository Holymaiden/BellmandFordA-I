import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//? Import constants
import colors from '../../../constants/color';
import env from '../../../../env';

const Recommendation = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {item: item});
      }}>
      <ImageBackground
        source={{uri: env.IMAGE_URL + '/' + item.gambar}}
        style={[styles.recommendation, {marginLeft: index == 0 ? 0 : hp(2)}]}
        imageStyle={{borderRadius: 20}}>
        <Text
          style={{
            fontSize: wp(4),
            color: colors.white,
            fontFamily: 'LibreBaskerville-Bold',
          }}>
          {item.nama}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Recommendation;

const styles = StyleSheet.create({
  recommendation: {
    width: wp('40%'),
    height: hp('20%'),
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
