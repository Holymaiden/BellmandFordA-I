import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-t.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: wp('100%'),
    height: hp('100%'),
  },
  logo: {
    width: wp('50%'),

    height: hp('20%'),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
