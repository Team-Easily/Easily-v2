import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Platform } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { TodoListScreen } from "./src/screens/TodoListScreen";
import { TodoItemScreen } from "./src/screens/TodoItemScreen";
import LoginScreen from "./src/screens/LoginScreen";
import Register from "./src/screens/Register";
import { SignOutScreen } from "./src/screens/SignOutScreen";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedIn,
  setStsTokenManager,
  setUser,
} from "./src/components/auth/authSlice";
import * as WebBrowser from "expo-web-browser";

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();
const TodoStack = createStackNavigator();
const AuthStack = createStackNavigator();

const TodoStackScreen = () => (
  <TodoStack.Navigator>
    <TodoStack.Screen name="TodoList" component={TodoListScreen} />
    <TodoStack.Screen name="TodoItem" component={TodoItemScreen} />
  </TodoStack.Navigator>
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
        name="SignOut"
        component={SignOutScreen}
        options={{
          tabBarLabel: "Sign Out",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Group>
  </Tab.Navigator>
);

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("rendering user", user);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    WebBrowser.maybeCompleteAuthSession();
    const auth = getAuth();
    //test
    getRedirectResult(auth).then((result) => {
      // console.log(result);
      if (!result) return;
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      // console.log(result.user);
      const {
        stsTokenManager,
        displayName,
        isAnonymous,
        email,
        photoURL,
        uid,
      } = result.user;
      dispatch(setUser({ displayName, isAnonymous, email, photoURL, uid }));
      dispatch(setStsTokenManager({ ...stsTokenManager }));
      //JR: firestore user creation logic here
      //JR: isLoggedIn state change here
      // return user;
    });
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <NavigationContainer>
          {!user ? (
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
