import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import Weather from './src/screens/Weather';
import { ToDoListScreen } from './src/screens/ToDoListScreen';
import { TodoItemScreen } from './src/screens/TodoItemScreen';
import { GmailScreen } from './src/screens/GmailScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import Register from './src/screens/Register';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/authProvider';
import Pomodoro from './src/screens/Pomodoro';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();
const TodoStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const DashboardStackScreen = ({ navigation, route }) => {
  // TODO: stackoverflow suggestion for hiding navbar
  // React.useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
  //   if (routeName === 'Dashboard') {
  //     navigation.setOptions({ tabBarVisible: { display: 'none' } });
  //   } else {
  //     navigation.setOptions({ tabBarVisible: { display: 'flex' } });
  //   }
  // }, [navigation, route]);
  return (
    <DashboardStack.Navigator
      initialRouteName='Dashboard'
      screenOptions={{ headerShown: false }}
    >
      <DashboardStack.Screen
        name='Dashboard'
        component={DashboardScreen}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <DashboardStack.Screen name='Weather' component={Weather} />
      <DashboardStack.Screen name='CalendarScreen' component={CalendarScreen} />
      <DashboardStack.Screen
        name='TodoStackScreen'
        component={TodoStackScreen}
      />
      <DashboardStack.Screen name='Gmail' component={GmailScreen} />
      <DashboardStack.Screen name='Events' component={EventsScreen} />
      <DashboardStack.Screen name='Pomodoro' component={Pomodoro} />
    </DashboardStack.Navigator>
  );
};

const TodoStackScreen = () => (
  <TodoStack.Navigator
    initialRouteName='TodoList'
    screenOptions={{ headerShown: false }}
  >
    <TodoStack.Screen name='TodoList' component={ToDoListScreen} />
    <TodoStack.Screen name='TodoItem' component={TodoItemScreen} />
    <TodoStack.Screen name='Pomodoro' component={Pomodoro} />
  </TodoStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    initialRouteName='Profile'
    screenOptions={{ headerShown: false }}
  >
    <ProfileStack.Screen name='Profile' component={ProfileScreen} />
    <ProfileStack.Screen name='EditProfile' component={EditProfileScreen} />
  </ProfileStack.Navigator>
);

const NavBar = () => (
  <Tab.Navigator
    activeColor='#ffffff'
    inactiveColor='#2c497f'
    barStyle={{ backgroundColor: '#07BEB8' }}
  >
    <Tab.Group initialRouteName='Dashboard'>
      <Tab.Screen
        name='DashboardStackScreen'
        component={DashboardStackScreen}
        options={({ route }) => ({
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='view-dashboard'
              color={color}
              size={24}
            />
          ),
          // TODO: stackoverflow suggestion for hiding navbar
          // tabBarStyle: ((route) => {
          //   const routeName =
          //     getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
          //   console.log(routeName);
          //   if (routeName === 'Dashboard') {
          //     return { display: 'none' };
          //   }
          //   return;
          // })(route),
        })}
      />
      <Tab.Screen
        name='TodoStackScreen'
        component={TodoStackScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='format-list-bulleted'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Email'
        component={GmailScreen}
        options={{
          tabBarLabel: 'Gmail',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='gmail' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Events'
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='calendar-clock'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileStackScreen'
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={24} />
          ),
        }}
      />
    </Tab.Group>
  </Tab.Navigator>
);

function App() {
  const auth = getAuth();

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <AuthProvider>
          <PaperProvider theme={DefaultTheme}>
            <NavigationContainer>
              {auth ? (
                <MainStack.Navigator
                  initialRouteName='Welcome'
                  screenOptions={{ headerShown: false }}
                >
                  <MainStack.Screen name='Welcome' component={WelcomeScreen} />
                  <MainStack.Screen name='Login' component={LoginScreen} />
                  <MainStack.Screen name='Register' component={Register} />
                  <MainStack.Screen name='Nav Bar' component={NavBar} />
                </MainStack.Navigator>
              ) : (
                <MainStack.Navigator
                  initialRouteName='Nav Bar'
                  screenOptions={{ headerShown: false }}
                >
                  <MainStack.Screen name='Nav Bar' component={NavBar} />
                </MainStack.Navigator>
              )}
            </NavigationContainer>
          </PaperProvider>
        </AuthProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
