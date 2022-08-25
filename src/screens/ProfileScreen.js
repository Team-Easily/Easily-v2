import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Avatar, Title, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../components/auth/authSlice";
import { getUserByUid } from "../firebase";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);


  const updateUser = async (userId) => {
    const user = await getUserByUid(auth.currentUser.userId);
    dispatch(setUser, user);
  };
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View styles={styles.userImage}>
          <Avatar.Image src={{ uri: "tinyurl.com/24arcnk3" }} size={80} />
        </View>
        <View style={styles.userName}>
          <Title style={styles.title}>Name: {user?.displayName}</Title>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="map-marker-star-outline"
              color="#777777"
              size={20}
            />
            <Text>City, State, Country</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="email" color="#777777" size={20} />
            <Text>Email: {user?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => useNavigation("EditProfile")}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="account-cog-outline"
              color="#777777"
              size={25}
            />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => useNavigation("SignOutScreen")}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="exit-to-app"
              color="#777777"
              size={25}
            />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  userImage: {
    flexDirection: "row",
    marginTop: 15,
  },
  userName: {
    marginLeft: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
