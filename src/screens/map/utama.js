import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline as Poly,
} from 'react-native-maps';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import env from '../../../env';

import Geolocation from 'react-native-geolocation-service';
import colors from '../../constants/color';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Map = ({navigation, route}) => {
  const destination = {
    latitude: parseFloat(route.params?.item?.lat),
    longitude: parseFloat(route.params?.item?.lng),
  };
  const INF = 999999999;
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [initialLocation, setInitialLocation] = useState({
    latitude: -4.54705938,
    longitude: 120.32961992,
  });
  const [coords, setCoords] = useState([]);

  const getWayPoints = async (latitude, longitude) => {
    let token = await AsyncStorage.getItem('token');
    await axios
      .get(
        `${env.API_URL}/bellmand?latitude=${latitude}&longitude=${longitude}&latitude2=${destination.latitude}&longitude2=${destination.longitude}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(async res => {
        let data = res.data.data;
        const coordinates = data.map(point => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }));
        coordinates.push({
          latitude: destination.latitude,
          longitude: destination.longitude,
        });
        setCoords(coordinates);
      })
      .catch(err => {
        console.log('error :', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        setInitialLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getWayPoints(position.coords.latitude, position.coords.longitude);
      },
      error => {
        if (error.code === 1)
          Alert.alert(
            'Error',
            'Please turn on your location',
            [
              {
                text: 'Cancel',
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => Geolocation.requestAuthorization()},
            ],
            {cancelable: false},
          );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    );
  }, [refresh]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Poly
            coordinates={coords}
            strokeWidth={5}
            strokeColor={colors.blue}
          />
          <Marker
            coordinate={{
              latitude: initialLocation.latitude,
              longitude: initialLocation.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor={colors.blue}
          />
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title={route.params?.item?.name}
            description={route.params?.item?.address}
            pinColor={colors.blue}
          />
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            marginBottom: hp(2),
            backgroundColor: '#fff',
            borderRadius: 50,
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(5),
            elevation: 5,
            overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
          }}
          onPress={() => setRefresh(!refresh)}>
          <Text
            style={{
              color: colors.blue,
              fontSize: 18,
              fontFamily: 'LibreBaskerville-Bold',
            }}>
            Update Lokasi!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
