import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import CalendarDemoScreen from '../screens/CalendarDemoScreen';
import CreateTripScreen from '../screens/CreateTripScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen 
        name="Calendar" 
        component={CalendarDemoScreen}
        options={{
          headerShown: true,
          title: 'Calendar',
          headerStyle: {
            backgroundColor: '#F2F2F7',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: '#FF6B9D',
        }}
      />
      <Stack.Screen 
        name="CreateTrip" 
        component={CreateTripScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen 
        name="TripDetails" 
        component={TripDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}