import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import BreweryListScreen from './screens/BreweryListScreen';
import BreweryDetailsScreen from './screens/BreweryDetailsScreen';
import { theme, palette } from './utils/theme';
import LinkingScreen from './screens/LinkingScreen';
import SensorsScreen from './screens/SensorsScreen';
import LocationScreen from './screens/LocationScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: palette.stout, card: palette.barrel },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Breweries" component={BreweryListScreen} />
            <Stack.Screen name="Details" component={BreweryDetailsScreen} />
            <Stack.Screen name="Linking" component={LinkingScreen} />
            <Stack.Screen name="Sensors" component={SensorsScreen}/>
            <Stack.Screen name="Location" component={LocationScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}