import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ToDoListScreen } from './src/screens/ToDoListScreen';
import { TodoItemScreen } from './src/screens/TodoItemScreen';
import LoginScreen from './src/screens/LoginScreen';
import Register from './src/screens/Register';
import { SignOutScreen } from './src/screens/SignOutScreen';
import { Weather } from './src/screens/Weather';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();

const NavBar = () => (
  <Tab.Navigator
    activeColor='#ffffff'
    inactiveColor='#2c497f'
    barStyle={{ backgroundColor: '#07BEB8' }}
  >
    <Tab.Group initialRouteName='Dashboard'>
      <Tab.Screen
        name='Dashboard'
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='view-dashboard'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name='TodoList'
        component={ToDoListScreen}
        options={{
          tabBarLabel: 'Todo List',
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
        name='SignOut'
        component={SignOutScreen}
        options={{
          tabBarLabel: 'Sign Out',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='SignOut'
        component={Weather}
        options={{
          tabBarLabel: 'Sign Out',
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
  const currentUser = auth.currentUser;
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
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
