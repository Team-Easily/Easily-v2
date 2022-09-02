import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Timer from "../components/pomodoro/Timer"

const Pomodoro = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text>Pomodoro Timer!</Text>
            </View>
                <Timer />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Pomodoro;
