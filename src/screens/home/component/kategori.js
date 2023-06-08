import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../constants/color';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Kategori = ({item, index, navigation, lokasi}) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        marginHorizontal: hp(1),
        marginVertical: hp(1),
      }}
      onPress={() => {
        navigation.navigate('Wisata', {kategori: item.name, lokasi: lokasi});
      }}>
      <View>
        <View
          style={{
            width: wp('27%'),
            height: hp('10%'),
            backgroundColor: colors.white,
            borderRadius: 10,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome5 name={item.icon} size={30} color={colors.blue} />
          <Text
            style={{
              color: colors.blue,
              fontFamily: 'LibreBaskerville-Bold',
              fontSize: hp(1.5),
              textAlign: 'center',
              marginTop: hp(1),
            }}>
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Kategori;
