import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";


export const EditProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <Button title='CLickHere' onPress={() => alert('Button Clicked!')}/>
        </View>
    )
};
