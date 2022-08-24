import React, { useEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { TodoListScreen } from './src/screens/TodoListScreen';
import { TodoItemScreen } from './src/screens/TodoItemScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import Register from './src/screens/Register';
import { SignOutScreen } from './src/screens/SignOutScreen';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();
const TodoStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const TodoStackScreen = () => (
  <TodoStack.Navigator>
    <TodoStack.Screen name="TodoList" component={TodoListScreen} />
    <TodoStack.Screen name="TodoItem" component={TodoItemScreen} />
  </TodoStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    {/* <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} /> */}
  </ProfileStack.Navigator>
);

const NavBar = () => (
  <Tab.Navigator>
    <Tab.Group
      initialRouteName="Dashboard"
      activeColor="#07BEB8"
      barStyle={{ backgroundColor: "#98DFEA" }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TodoList"
        component={TodoStackScreen}
        options={{
          tabBarLabel: "Todo List",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
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
              initialRouteName="Welcome"
              screenOptions={{ headerShown: false }}
            >
              <MainStack.Screen name="Welcome" component={WelcomeScreen} />
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen name="Register" component={Register} />
              <MainStack.Screen name="Nav Bar" component={NavBar} />
            </MainStack.Navigator>
          ) : (
            <MainStack.Navigator
              initialRouteName="Nav Bar"
              screenOptions={{ headerShown: false }}
            >
              <MainStack.Screen name="Nav Bar" component={NavBar} />
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
