import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
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
import MapViewDirections from 'react-native-maps-directions';

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
    console.log(
      `${env.API_URL}/bellmand?latitude=${latitude}&longitude=${longitude}&latitude2=${destination.latitude}&longitude2=${destination.longitude}`,
    );
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
        if(res.data.status != "error"){
        let data = res.data.data[0];
        Alert.alert(
          'Jarak Tempuh',
          `Jarak tempuh dari lokasi anda ke tujuan adalah ${res.data.data[1]} Meter`,
        );
        const coordinates = data.map(point => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }));
        coordinates.push({
          latitude: destination.latitude,
          longitude: destination.longitude,
        });
        setCoords(coordinates);}
        else
        {Alert.alert("Maps Error", "Lokasi Anda Tidak Dapat Ditemukan!");
        navigation.goBack();
        }

      })
      .catch(err => {
        console.log('error :', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    Geolocation.getCurrentPosition(
      async position => {
        setInitialLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position.coords);
        getWayPoints(position.coords.latitude, position.coords.longitude);
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
  }, [refresh]);

  if (isLoading || coords.length === 0) {
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
          position:'absolute',
          left:0,
          right:0,
          top:0,
          bottom:0,
          alignItems:'center',
          justifyContent:'flex-end'
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
            height: hp(95),
            width: '100%',
            // ...StyleSheet.absoluteFillObject,
            position:'absolute',
            top:0,
            bottom:0,
            left:0,
            right:0
          }}
          initialRegion={{
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
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
          {coords.map((v, i) => (
            <MapViewDirections
              key={i + 1}
              origin={coords[i]}
              destination={coords[i + 1]}
              apikey={env.GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor={colors.blue}
              onError={errorMessage => {
                console.log('GOT AN ERROR');
              }}
            />
          ))}
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
