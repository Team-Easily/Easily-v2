import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getAuth, signOut } from 'firebase/auth';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { TodoListScreen } from './src/screens/TodoListScreen';
import { TodoItemScreen } from './src/screens/TodoItemScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const auth = getAuth();
const Tab = createMaterialBottomTabNavigator();

const signOutHandler = () => {
  console.log('signOutHandler');
  signOut(auth)
    .then(() => {
      console.log('sign out successful');
    })
    .catch((error) => {
      throw err;
    });
};

const SignOutButton = () => <Button onPress={signOutHandler} title='Signout' />;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#07BeB8',
    accent: '#8F3985',
  },
};

const TodoStack = createStackNavigator();

function TodoStackScreen() {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen name='TodoList' component={TodoListScreen} />
      <TodoStack.Screen name='TodoItem' component={TodoItemScreen} />
    </TodoStack.Navigator>
  );
}

const App = () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          {auth ? (
            <Tab.Group
              initialRouteName='Dashboard'
              activeColor='#07BEB8'
              barStyle={{ backgroundColor: '#98DFEA' }}
            >
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
                component={TodoStackScreen}
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
                component={SignOutButton}
                options={{
                  tabBarLabel: 'Sign Out',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name='account'
                      color={color}
                      size={24}
                    />
                  ),
                }}
              />
            </Tab.Group>
          ) : (
            <Tab.Group>
              <Tab.Screen name='Welcome' component={WelcomeScreen} />
            </Tab.Group>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </StoreProvider>
);

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
