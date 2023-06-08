//? Import react
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//? Import screens
import Home from '../screens/home';
import Profile from '../screens/profile';
import MyProfile from '../screens/my-profile';
import Wisata from '../screens/wisata';
import Detail from '../screens/detail';
import Login from '../screens/login';
import Register from '../screens/register';
import Suka from '../screens/suka';
import Riwayat from '../screens/riwayat';
import Map from '../screens/map';
import SplashScreen from '../screens/splash-screen';

import colors from '../constants/color';

const Stack = createStackNavigator();

const NavigationRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.white},
        }}
        initialRouteName='SplashScreens'
        >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Wisata" component={Wisata} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Suka" component={Suka} />
        <Stack.Screen name="Riwayat" component={Riwayat} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoute;
