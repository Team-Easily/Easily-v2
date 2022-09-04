import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ToDoListScreen } from './src/screens/ToDoListScreen';
import { TodoItemScreen } from './src/screens/TodoItemScreen';
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
import requestPermission from './src/firebase/firebaseMessaging';
import Notifications from './src/components/Notifications/Notifications';
import ReactNotificationComponent from './src/components/Notifications/ReactNotification';
import { onMessageListener } from './src/firebase/firebaseMessaging';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();
const TodoStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const TodoStackScreen = () => (
  <TodoStack.Navigator
    initialRouteName="TodoList"
    screenOptions={{ headerShown: false }}
  >
    <TodoStack.Screen name="TodoList" component={ToDoListScreen} />
    <TodoStack.Screen name="TodoItem" component={TodoItemScreen} />
  </TodoStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false }}
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
  </ProfileStack.Navigator>
);

const NavBar = () => (
  <Tab.Navigator
    activeColor="#ffffff"
    inactiveColor="#2c497f"
    barStyle={{ backgroundColor: '#07BEB8' }}
  >
    <Tab.Group initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
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
        name="TodoStackScreen"
        component={TodoStackScreen}
        options={{
          tabBarLabel: 'Tasks',
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
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
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
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <AuthProvider>
          <PaperProvider theme={DefaultTheme}>
            <View>
              {show ? (
                <ReactNotificationComponent
                  title={notification.title}
                  body={notification.body}
                />
              ) : (
                <></>
              )}
              <Notifications />
            </View>
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
