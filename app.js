import {StatusBar} from 'react-native';
import React from 'react';
import NavigationRoutes from './src/navigation';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <NavigationRoutes />
    </>
  );
}
