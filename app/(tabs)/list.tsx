import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import ToDoList from '../../components/ToDoList';
import React from 'react'

const List = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safe}>
                <ToDoList />
            </SafeAreaView>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safe: { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, flex: 1 },
});